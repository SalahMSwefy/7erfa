import { useState, useEffect, useRef } from 'react'
import {
    Search,
    Menu,
    LayoutDashboard,
    UserCircle,
    ImageUp,
    LogOut,
    SquareX,
    SquareCheck,
    ClipboardList,
    CheckCircle,
    Clock,
    List,
    XCircle,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { isValidEmail, isValidPhoneNumber } from '../services/helper'
import { Form, useNavigate } from 'react-router-dom'
import { updateMe } from '../services/apis'

function CustomerDashboard() {
    const [currentPage, setCurrentPage] = useState('dashboard')
    const [loading, setLoading] = useState(true)
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        // Simulate loading data
        setTimeout(() => setLoading(false), 1000)
    }, [])

    // Sidebar Component
    const Sidebar = () => {
        useEffect(() => {
            const storedToken = localStorage.getItem('token')
            const storedUser = JSON.parse(localStorage.getItem('user'))
            if (storedToken === null || storedUser === null) navigate('/login')
        }, [])
        const menuItems = [
            {
                title: 'Dashboard',
                icon: <LayoutDashboard size={20} />,
                page: 'dashboard',
            },
            {
                title: 'Search Workers',
                icon: <Search size={20} />,
                page: 'search',
            },
            {
                title: 'Orders',
                icon: <UserCircle size={20} />,
                page: 'orders',
            },
            {
                title: 'Profile',
                icon: <UserCircle size={20} />,
                page: 'profile',
            },
        ]

        return (
            <motion.div
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white"
            >
                <div className="border-b border-gray-200 p-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2"
                    >
                        <Menu className="text-blue-600" size={24} />
                        <span className="text-xl font-bold text-blue-600">
                            7erfa
                        </span>
                    </motion.div>
                </div>
                <nav className="p-4">
                    {menuItems.map((item) => (
                        <motion.div
                            key={item.page}
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            className={`mb-2 flex cursor-pointer items-center gap-3 rounded-lg p-3 text-gray-600 transition-all duration-200 hover:bg-gray-50 ${
                                currentPage === item.page
                                    ? 'bg-blue-50 text-blue-600'
                                    : ''
                            }`}
                            onClick={() => setCurrentPage(item.page)}
                        >
                            {item.icon}
                            <span className="font-medium">{item.title}</span>
                        </motion.div>
                    ))}
                </nav>
            </motion.div>
        )
    }

    // Header Component
    const Header = () => {
        function handleLogout() {
            logout()
            navigate('/login')
        }
        return (
            <motion.header
                initial={{ y: -50 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="fixed left-64 right-0 top-0 z-10 h-16 border-b border-gray-200 bg-white"
            >
                <div className="flex h-full items-center justify-between px-4">
                    <div className="relative w-96">
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            type="text"
                            placeholder="Search..."
                            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 transition-all duration-200 focus:border-blue-500 focus:outline-none"
                        />
                        <Search
                            className="absolute left-3 top-2.5 text-gray-400"
                            size={20}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            src="https://via.placeholder.com/40"
                            alt="Profile"
                            className="h-8 w-8 rounded-full border-2 border-blue-500"
                        />
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            src="https://via.placeholder.com/40"
                            alt="Profile"
                            className="bg-s flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-500"
                            onClick={handleLogout}
                        >
                            <LogOut className="text-stone-500" />
                        </motion.button>
                    </div>
                </div>
            </motion.header>
        )
    }

    const OrderStats = () => {
        const stats = [
            {
                title: 'Total Orders',
                value: '200',
                icon: <List size={20} />,
                color: 'bg-gradient-to-r from-blue-500 to-blue-600',
            },
            {
                title: 'Completed Orders',
                value: '120',
                icon: <CheckCircle size={20} />,
                color: 'bg-gradient-to-r from-green-500 to-green-600',
            },
            {
                title: 'Pending Orders',
                value: '35',
                icon: <Clock size={20} />,
                color: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
            },
            {
                title: 'Canceled Orders',
                value: '15',
                icon: <XCircle size={20} />,
                color: 'bg-gradient-to-r from-red-500 to-red-600',
            },
        ]

        return (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className={`rounded-xl p-6 ${stat.color} transform shadow-lg transition-all duration-200 hover:scale-105`}
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-sm font-medium text-white">
                                {stat.title}
                            </h3>
                            <div className="rounded-lg bg-white/20 p-2">
                                {stat.icon}
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <p className="text-3xl font-bold text-white">
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const CustomerOrders = () => {
        const [orders, setOrders] = useState([
            {
                id: 1,
                worker: 'Alice Johnson',
                issue: 'Leaking faucet in kitchen',
                status: 'In Progress',
                date: '2024-01-15',
                price: '$120',
            },
            {
                id: 2,
                worker: 'Bob Smith',
                issue: 'Power outage in living room',
                status: 'Pending',
                date: '2024-01-16',
                price: '$200',
            },
            {
                id: 3,
                worker: 'Charlie Brown',
                issue: 'Broken table repair',
                status: 'Completed',
                date: '2024-01-14',
                price: '$350',
            },
        ])

        const [filterStatus, setFilterStatus] = useState('all')
        const [searchTerm, setSearchTerm] = useState('')

        const getStatusColor = (status) => {
            switch (status) {
                case 'Completed':
                    return 'bg-green-100 text-green-800'
                case 'In Progress':
                    return 'bg-blue-100 text-blue-800'
                case 'Pending':
                    return 'bg-yellow-100 text-yellow-800'
                case 'Canceled':
                    return 'bg-red-100 text-red-800'
                default:
                    return 'bg-gray-100 text-gray-800'
            }
        }

        const filteredOrders = orders.filter((order) => {
            const matchesStatus =
                filterStatus === 'all' || order.status === filterStatus
            const matchesSearch =
                order.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.issue.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesStatus && matchesSearch
        })

        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">
                        My Orders
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="rounded-lg border border-gray-200 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>

                <div className="rounded-xl bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Order ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Worker
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Issue
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Price
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredOrders.map((order) => (
                                    <tr
                                        key={order.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                            #{order.id}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {order.worker}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {order.issue}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(
                                                    order.status,
                                                )}`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {order.date}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {order.price}
                                        </td>
                                        <td className="flex whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {order.status === 'Pending' ? (
                                                <button className="flex items-center justify-center gap-2 text-red-600">
                                                    <SquareX size={20} />
                                                    <span className="font-semibold">
                                                        Cancel Order
                                                    </span>
                                                </button>
                                            ) : (
                                                <span className="flex items-center justify-center gap-2 font-semibold text-green-500">
                                                    <SquareCheck size={20} />
                                                    Accepted Order
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }

    const DashboardPage = () => {
        const workers = [
            {
                id: 1,
                name: 'John Doe',
                skills: 'Plumbing',
                location: 'New York',
                rating: 4.5,
                image: 'https://www.ufcw.org/wp-content/blogs.dir/61/files/2020/09/cutout-2-650x0-c-default.png',
            },
            {
                id: 2,
                name: 'Jane Smith',
                skills: 'Electrical',
                location: 'Los Angeles',
                rating: 4.7,
                image: 'https://png.pngtree.com/png-vector/20240603/ourmid/pngtree-seller-vacancy-in-supermarket-staff-hiring-png-image_12611298.png',
            },
            {
                id: 3,
                name: 'Mike Johnson',
                skills: 'Carpentry',
                location: 'Chicago',
                rating: 4.2,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGdnJWhnUe5FUy-KMKexUcA-rs_eErhoMlo7eJC6HhbYxkGbz9F4Gs6o72RN8YJIq2W0k&usqp=CAU',
            },
            {
                id: 4,
                name: 'Emily Davis',
                skills: 'Painting',
                location: 'Miami',
                rating: 4.8,
                image: 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Clipart.png',
            },
            {
                id: 5,
                name: 'Chris Brown',
                skills: 'Mechanical',
                location: 'Houston',
                rating: 4.3,
                image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
            },
            {
                id: 6,
                name: 'Sarah Wilson',
                skills: 'Construction Worker',
                location: 'Seattle',
                rating: 4.6,
                image: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png',
            },
        ]

        const skills = [
            'Plumbing',
            'Electrical',
            'Carpentry',
            'Painting',
            'Mechanical',
            'Construction Worker',
        ]

        if (loading) {
            return (
                <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
                    <img
                        src="/logos/logo.gif"
                        alt="Logo"
                        className="h-28 w-28 rounded-full object-cover object-center"
                    />
                </div>
            )
        }

        return (
            <div className="space-y-8">
                <motion.div
                    className="mb-8 flex items-center justify-between"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-800">
                            Welcome back, {user.name} 👋
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Here&apos;s an overview of your recent activities.
                        </p>
                    </div>
                </motion.div>{' '}
                <OrderStats />
                <h3 className="block text-2xl font-semibold text-gray-800">
                    Top Workers
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {skills.map((skill) => (
                        <motion.div
                            key={skill}
                            className="flex items-center rounded-lg bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={
                                    workers.find(
                                        (worker) => worker.skills === skill,
                                    )?.image || ''
                                }
                                alt={skill}
                                className="mr-4 h-16 w-16 rounded-full border border-gray-300 object-cover"
                            />
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {workers.find(
                                        (worker) => worker.skills === skill,
                                    )?.name || 'No Worker'}
                                </h3>
                                <p className="text-sm text-gray-500">{skill}</p>
                                <p className="text-sm text-yellow-500">
                                    Rating:{' '}
                                    {workers.find(
                                        (worker) => worker.skills === skill,
                                    )?.rating || 'N/A'}{' '}
                                    ⭐
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="space-y-6">
                    <div className="flex items-center rounded-lg bg-blue-100 p-6 shadow-md">
                        <ClipboardList className="mr-4 text-3xl text-blue-600" />
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Recent Orders
                            </h2>
                            <ul className="mt-4 space-y-2">
                                <li className="border-b border-gray-200 pb-2">
                                    <p className="text-gray-600">
                                        Order #1: Plumbing in New York
                                    </p>
                                    <span className="text-sm text-gray-500">
                                        Completed
                                    </span>
                                </li>
                                <li className="border-b border-gray-200 pb-2">
                                    <p className="text-gray-600">
                                        Order #2: Electrical work in Los Angeles
                                    </p>
                                    <span className="text-sm text-gray-500">
                                        Pending
                                    </span>
                                </li>
                                <li>
                                    <p className="text-gray-600">
                                        Order #3: Carpentry in Chicago
                                    </p>
                                    <span className="text-sm text-gray-500">
                                        Cancelled
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const SearchWorkersPage = () => {
        const categories = [
            'Plumbing',
            'Electrical',
            'Carpentry',
            'Painting',
            'Mechanical',
            'Construction Worker',
        ]

        return (
            <div className="p-8">
                <h1 className="mb-8 text-4xl font-extrabold text-gray-800">
                    Search Workers
                </h1>
                <div className="mb-8 flex gap-4">
                    <input
                        type="text"
                        placeholder="Enter skills"
                        className="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Enter city"
                        className="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700">
                        Search
                    </button>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800">
                    Categories
                </h2>
                <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="rounded-lg bg-white p-6 shadow-md"
                        >
                            <h3 className="text-lg font-bold text-gray-800">
                                {category}
                            </h3>
                            <p className="text-sm text-gray-500">
                                Find the best workers for{' '}
                                {category.toLowerCase()}.
                            </p>
                            <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                                View Workers
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const ProfilePage = () => {
        const [isEditing, setIsEditing] = useState(false)
        const fileInputRef = useRef(null)
        const [newData, setNewData] = useState({})
        const [errors, setErrors] = useState({})
        const { allUsers: users, updateUser } = useAuth()

        useEffect(() => {
            const initialData = {
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                city: user.city,
            }
            if (!isEditing) {
                setErrors({})
                setNewData(initialData)
            }
        }, [isEditing])

        const handleInputChange = (event) => {
            const { name, value } = event.target
            setNewData((prevUser) => ({
                ...prevUser,
                [name]: value,
            }))
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            console.log('Form data:', newData)
            const validationErrors = {}
            console.log('validationErrors', validationErrors)

            if (
                !isValidEmail(newData.email, users) &&
                newData.email !== user.email
            ) {
                validationErrors.email = 'Invalid email or email already exists'
            }

            if (
                !isValidPhoneNumber(newData.phoneNumber, users) &&
                newData.phoneNumber !== user.phoneNumber
            ) {
                validationErrors.phoneNumber =
                    'Invalid phone number or phone number already exists'
            }

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors)
                return
            }

            updateMe(newData)
                .then((data) => {
                    console.log(data.data.user)
                    updateUser(data.data.user)
                    setErrors({})
                    setIsEditing(false)
                })
                .catch((e) => {
                    console.log(e)
                    validationErrors.general = e.message
                })
        }

        const handleFileChange = (event) => {
            const file = event.target.files[0]
            if (file) {
                // Perform validation or upload the file to a server
                console.log('Selected file:', file)
            }
        }
        const handleButtonClick = () => {
            if (fileInputRef.current) {
                fileInputRef.current.click() // Programmatically click the file input
            }
        }

        return (
            <div className="mx-auto max-w-4xl space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Profile
                    </h1>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                    >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>

                <div className="rounded-xl bg-white p-6 shadow-sm">
                    <div className="mb-6 flex items-center space-x-6">
                        <div className="relative">
                            <img
                                src="https://via.placeholder.com/150"
                                alt="Profile"
                                className="h-32 w-32 rounded-full"
                            />
                            {isEditing && (
                                <button
                                    className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700"
                                    onClick={handleButtonClick}
                                >
                                    <ImageUp size={20} />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        ref={fileInputRef}
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </button>
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {user.name}
                            </h2>
                            <p className="text-gray-600">{user.email}</p>
                            <div className="mt-2 flex gap-2">
                                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                    Customer
                                </span>
                            </div>
                        </div>
                    </div>

                    {isEditing ? (
                        <Form
                            onSubmit={handleSubmit}
                            method="patch"
                            className="space-y-4"
                        >
                            <div className="grid grid-cols-2 gap-4">
                                {/* Full Name */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={newData.name}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        City
                                    </label>
                                    <input
                                        id="city"
                                        type="text"
                                        name="city"
                                        value={newData.city}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* Email */}
                                <div className="flex flex-col">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={newData.email}
                                        onChange={handleInputChange}
                                        className={`w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none ${errors.email ? 'border border-red-500' : ''}`}
                                    />
                                    {errors?.email && (
                                        <span className="mt-2 text-center text-sm text-red-500">
                                            {errors.email}
                                        </span>
                                    )}
                                </div>

                                {/* Phone */}
                                <div className="flex flex-col">
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        name="phoneNumber"
                                        value={newData.phoneNumber}
                                        onChange={handleInputChange}
                                        className={`w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none ${errors.phoneNumber ? 'border border-red-500' : ''}`}
                                    />
                                    {errors?.phoneNumber && (
                                        <p className="mt-2 text-center text-sm text-red-500">
                                            {errors.phoneNumber}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Save Button */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </Form>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Contact Information
                                    </h3>
                                    <div className="mt-2 space-y-2">
                                        <p className="text-gray-800">
                                            Phone: {user.phoneNumber}
                                        </p>
                                        <p className="text-gray-800">
                                            Email: {user.email}
                                        </p>
                                        <p className="text-gray-800">
                                            City: {user.city}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const renderPage = () => {
        return (
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentPage}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {(() => {
                        switch (currentPage) {
                            case 'dashboard':
                                return <DashboardPage />
                            case 'orders':
                                return <CustomerOrders />
                            case 'profile':
                                return <ProfilePage />
                            case 'search':
                                return <SearchWorkersPage />
                            default:
                                return <DashboardPage />
                        }
                    })()}
                </motion.div>
            </AnimatePresence>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <div className="ml-64">
                <Header />
                <main className="pt-16">
                    <div className="p-6">{renderPage()}</div>
                </main>
            </div>
        </div>
    )
}

export default CustomerDashboard
