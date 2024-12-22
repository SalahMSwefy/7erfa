import { useState, useEffect, useRef } from 'react'
import {
    Search,
    LayoutDashboard,
    ShoppingCart,
    UserCircle,
    TrendingUp,
    Clock,
    DollarSign,
    Star,
    Calendar,
    LogOut,
    ImageUp,
    BookHeart,
} from 'lucide-react'
// First need to install framer-motion:
// npm install framer-motion
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import TestimonialCard from '../ui/TestimonialCard'
import { Form, useNavigate } from 'react-router-dom'
import { isValidEmail, isValidPhoneNumber } from '../services/helper'
import { updateMe } from '../services/apis'

function WorkerDashboard() {
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
                title: 'Orders',
                icon: <ShoppingCart size={20} />,
                page: 'orders',
            },
            {
                title: 'Reviews',
                icon: <BookHeart size={20} />,
                page: 'reviews',
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
                <div className="border-b border-gray-200 px-4 py-2">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2"
                    >
                        {/* <Menu className="text-blue-600" size={24} />
                        <span className="text-xl font-bold text-blue-600">
                            7erfa
                        </span> */}
                        <div className="text-brand-light flex items-center gap-2.5">
                            <img
                                src="/logos/logo.gif"
                                alt="Logo"
                                className="h-12 w-12 rounded-full object-cover object-center"
                            />
                            <button
                                className="text-brand-light font-brand text-3xl no-underline transition-colors duration-200 hover:text-orange-500"
                                onClick={() => setCurrentPage('dashboard')}
                            >
                                7erfa
                            </button>
                        </div>
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

    const WorkerStats = () => {
        const stats = [
            {
                title: 'Completed Tasks',
                value: '45',
                icon: <TrendingUp size={20} />,
                color: 'bg-gradient-to-r from-blue-500 to-blue-600',
            },
            {
                title: 'Active Tasks',
                value: '12',
                icon: <Clock size={20} />,
                color: 'bg-gradient-to-r from-purple-500 to-purple-600',
            },
            {
                title: 'Total Earnings',
                value: '$1,240',
                icon: <DollarSign size={20} />,
                color: 'bg-gradient-to-r from-green-500 to-green-600',
            },
            {
                title: 'Rating',
                value: '4.8',
                icon: <Star size={20} />,
                color: 'bg-gradient-to-r from-orange-500 to-orange-600',
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

    const WorkerTasks = () => {
        const tasks = [
            {
                id: 1,
                title: 'Kitchen Renovation',
                client: 'Sarah Johnson',
                deadline: '2024-01-20',
                state: 'In Progress',
            },
            {
                id: 2,
                title: 'Bathroom Plumbing',
                client: 'Mike Smith',
                deadline: '2024-01-22',
                state: 'Completed',
            },
            {
                id: 3,
                title: 'Electrical Wiring',
                client: 'Emma Davis',
                deadline: '2024-01-25',
                state: 'Pending',
            },
        ]

        return (
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">
                        Active Tasks
                    </h2>
                    <button
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        onClick={() => setCurrentPage('orders')}
                    >
                        View All
                    </button>
                </div>
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="rounded-lg border border-gray-300 p-4 transition-all duration-200 hover:shadow-md"
                        >
                            <div className="mb-2 flex items-start justify-between">
                                <div>
                                    <h3 className="font-medium text-gray-800">
                                        {task.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Client: {task.client}
                                    </p>
                                </div>
                                <span
                                    className={`rounded-full px-2 py-1 text-sm font-medium ${
                                        task.state === 'In Progress'
                                            ? 'bg-blue-100 text-blue-800'
                                            : task.state === 'Pending'
                                              ? 'bg-yellow-100 text-yellow-800'
                                              : 'bg-green-100 text-green-800'
                                    }`}
                                >
                                    {task.state}
                                </span>
                            </div>
                            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                                <Calendar size={16} />
                                <span>Due: {task.deadline}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const TestimonialList = () => {
        // Dummy data for testimonials as objects
        const testimonials = [
            {
                id: 1,
                name: 'Tania Andrew',
                role: 'Frontend Lead @ Google',
                imageUrl: 'https://via.placeholder.com/50',
                testimonialText:
                    'I found solutions to all my design needs from Creative Tim. I use them as a freelancer in my hobby projects for fun! And it’s really affordable, very humble guys!!',
                rating: 5,
            },
            {
                id: 2,
                name: 'John Doe',
                role: 'Backend Developer @ Facebook',
                imageUrl: 'https://via.placeholder.com/50',
                testimonialText:
                    'Amazing service and great support. They helped me scale my project in no time!',
                rating: 4,
            },
            {
                id: 3,
                name: 'Sarah Smith',
                role: 'UX Designer @ Apple',
                imageUrl: 'https://via.placeholder.com/50',
                testimonialText:
                    'The best tools and resources for designers. Highly recommend to anyone working on projects!',
                rating: 4,
            },
        ]

        return (
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">
                        Latest reviews
                    </h2>
                    <button
                        className="text-sm font-medium text-blue-600 hover:text-blue-700"
                        onClick={() => setCurrentPage('orders')}
                    >
                        View All
                    </button>
                </div>
                <div className="space-y-4">
                    {testimonials.map((testimonial) => (
                        <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial} // Passing the entire testimonial object as a prop
                        />
                    ))}
                </div>
            </div>
        )
    }

    const DashboardPage = () => {
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
            <div>
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Welcome back, {user.name}! 👋
                        </h1>
                        <p className="mt-1 text-gray-600">
                            Here&apos;s what&apos;s happening with your tasks
                            today.
                        </p>
                    </div>
                    <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-all duration-200 hover:bg-blue-700">
                        <Calendar size={18} />
                        View Schedule
                    </button>
                </div>
                <WorkerStats />
                <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <WorkerTasks />
                    <TestimonialList />
                </div>
            </div>
        )
    }

    const OrdersPage = () => {
        const [orders, setOrders] = useState([
            {
                id: 1,
                customer: 'John Doe',
                service: 'Plumbing Repair',
                status: 'In Progress',
                date: '2024-01-15',
                price: '$120',
                priority: 'High',
            },
            {
                id: 2,
                customer: 'Jane Smith',
                service: 'Electrical Work',
                status: 'Pending',
                date: '2024-01-16',
                price: '$200',
                priority: 'Medium',
            },
            {
                id: 3,
                customer: 'Mike Johnson',
                service: 'Carpentry',
                status: 'Completed',
                date: '2024-01-14',
                price: '$350',
                priority: 'Low',
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

        const handleStatusChange = (id, newStatus) => {
            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order.id === id ? { ...order, status: newStatus } : order,
                ),
            )
        }

        const filteredOrders = orders.filter((order) => {
            const matchesStatus =
                filterStatus === 'all' || order.status === filterStatus
            const matchesSearch =
                order.customer
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                order.service.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesStatus && matchesSearch
        })

        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                        + New Order
                    </button>
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
                                        Customer
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Service
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
                                            {order.customer}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {order.service}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <select
                                                className={`rounded-lg border px-2 py-1 text-sm font-semibold ${getStatusColor(
                                                    order.status,
                                                )}`}
                                                value={order.status}
                                                onChange={(e) =>
                                                    handleStatusChange(
                                                        order.id,
                                                        e.target.value,
                                                    )
                                                }
                                            >
                                                <option value="Pending">
                                                    Pending
                                                </option>
                                                <option value="In Progress">
                                                    In Progress
                                                </option>
                                                <option value="Completed">
                                                    Completed
                                                </option>
                                                <option value="Canceled">
                                                    Canceled
                                                </option>
                                            </select>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {order.date}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {order.price}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                            <button className="mr-3 text-blue-600 hover:text-blue-900">
                                                Edit
                                            </button>
                                            <button className="text-red-600 hover:text-red-900">
                                                Delete
                                            </button>
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
                hourlyRate: user.hourlyRate,
                yearsOfExperience: user.yearsOfExperience,
                bio: user.bio,
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
                                    {user.skill}
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

                                {/* Hourly Rate */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Hourly Rate
                                    </label>
                                    <input
                                        id="hourlyRate"
                                        type="number"
                                        name="hourlyRate"
                                        value={newData.hourlyRate}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>

                                {/* Years of Experience */}
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Years of Experience
                                    </label>
                                    <input
                                        id="yearsOfExperience"
                                        type="number"
                                        name="yearsOfExperience"
                                        value={newData.yearsOfExperience}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>

                            {/* Bio */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Bio
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={newData.bio}
                                    onChange={handleInputChange}
                                    rows="2"
                                    className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none"
                                />
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
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Work Information
                                    </h3>
                                    <div className="mt-2 space-y-2">
                                        <p className="text-gray-800">
                                            Experience: {user.yearsOfExperience}{' '}
                                            Years
                                        </p>
                                        <p className="text-gray-800">
                                            Hourly Rate: {user.hourlyRate} $
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    About
                                </h3>
                                <p className="mt-2 text-gray-800">{user.bio}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    const TestimonialPage = () => {
        const [testimonials, setTestimonials] = useState([
            {
                id: 1,
                name: 'John Doe',
                role: 'Customer',
                testimonialText: 'Excellent service and very professional!',
                rating: 5,
                date: '2024-01-15',
            },
            {
                id: 2,
                name: 'Jane Smith',
                role: 'Worker',
                testimonialText: 'Great experience working with this platform.',
                rating: 4,
                date: '2024-01-14',
            },
            {
                id: 3,
                name: 'Mike Johnson',
                role: 'Customer',
                testimonialText: 'The service was okay, but could improve.',
                rating: 3,
                date: '2024-01-13',
            },
        ])

        const [searchTerm, setSearchTerm] = useState('')
        const [filterRating, setFilterRating] = useState('all')

        const filteredTestimonials = testimonials.filter((testimonial) => {
            const matchesSearch =
                testimonial.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                testimonial.testimonialText
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())

            const matchesRating =
                filterRating === 'all' ||
                testimonial.rating === Number(filterRating)

            return matchesSearch && matchesRating
        })

        const renderStars = (rating) => {
            const fullStars = Array(rating).fill(
                <Star className="fill-yellow-500 text-yellow-500" size={16} />,
            )
            const emptyStars = Array(5 - rating).fill(
                <Star className="fill-gray-300 text-gray-300" size={16} />,
            )
            return [...fullStars, ...emptyStars]
        }

        return (
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Testimonials
                    </h1>
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                        + New Testimonial
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            placeholder="Search testimonials..."
                            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <select
                        className="rounded-lg border border-gray-200 px-4 py-2 focus:border-blue-500 focus:outline-none"
                        value={filterRating}
                        onChange={(e) => setFilterRating(e.target.value)}
                    >
                        <option value="all">All Ratings</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                </div>

                <div className="rounded-xl bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Testimonial ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Name
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Role
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Rating
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Testimonial
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredTestimonials.map((testimonial) => (
                                    <tr
                                        key={testimonial.id}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                            #{testimonial.id}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {testimonial.name}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {testimonial.role}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                {renderStars(
                                                    testimonial.rating,
                                                )}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {testimonial.testimonialText}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                            {testimonial.date}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                                            <button className="mr-3 text-blue-600 hover:text-blue-900">
                                                Edit
                                            </button>
                                            <button className="text-red-600 hover:text-red-900">
                                                Delete
                                            </button>
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
                                return <OrdersPage />
                            case 'profile':
                                return <ProfilePage />
                            case 'reviews':
                                return <TestimonialPage />
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

export default WorkerDashboard
