import React, { useState, useEffect } from 'react'
import {
    Bell,
    Search,
    Menu,
    LayoutDashboard,
    ShoppingCart,
    UserCircle,
    TrendingUp,
    Clock,
    DollarSign,
    Star,
    Calendar,
    BarChart2,
    Activity,
} from 'lucide-react'
// First need to install framer-motion:
// npm install framer-motion
import { motion, AnimatePresence } from 'framer-motion'

function WorkerDashboard() {
    const [currentPage, setCurrentPage] = useState('dashboard')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate loading data
        setTimeout(() => setLoading(false), 1000)
    }, [])

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                when: 'beforeChildren',
                staggerChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
        },
    }

    // Sidebar Component
    const Sidebar = () => {
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
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="relative rounded-full p-2 transition-all duration-200 hover:bg-gray-100"
                        >
                            <Bell size={20} className="text-gray-600" />
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white"
                            >
                                3
                            </motion.span>
                        </motion.button>
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            src="https://via.placeholder.com/40"
                            alt="Profile"
                            className="h-8 w-8 rounded-full border-2 border-blue-500"
                        />
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
                change: '+8% this week',
                icon: <TrendingUp size={20} />,
                color: 'bg-gradient-to-r from-blue-500 to-blue-600',
            },
            {
                title: 'Active Tasks',
                value: '12',
                change: '+2 from yesterday',
                icon: <Clock size={20} />,
                color: 'bg-gradient-to-r from-purple-500 to-purple-600',
            },
            {
                title: 'Total Earnings',
                value: '$1,240',
                change: '+15% this month',
                icon: <DollarSign size={20} />,
                color: 'bg-gradient-to-r from-green-500 to-green-600',
            },
            {
                title: 'Rating',
                value: '4.8',
                change: '+0.2 this week',
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
                            <span className="rounded-full bg-white/20 px-2 py-1 text-sm text-white/80">
                                {stat.change}
                            </span>
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
                progress: 75,
                priority: 'High',
            },
            {
                id: 2,
                title: 'Bathroom Plumbing',
                client: 'Mike Smith',
                deadline: '2024-01-22',
                progress: 30,
                priority: 'Medium',
            },
            {
                id: 3,
                title: 'Electrical Wiring',
                client: 'Emma Davis',
                deadline: '2024-01-25',
                progress: 50,
                priority: 'Low',
            },
        ]

        return (
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">
                        Active Tasks
                    </h2>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                        View All
                    </button>
                </div>
                <div className="space-y-4">
                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="rounded-lg border border-gray-100 p-4 transition-all duration-200 hover:shadow-md"
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
                                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                                        task.priority === 'High'
                                            ? 'bg-red-100 text-red-800'
                                            : task.priority === 'Medium'
                                              ? 'bg-yellow-100 text-yellow-800'
                                              : 'bg-green-100 text-green-800'
                                    }`}
                                >
                                    {task.priority}
                                </span>
                            </div>
                            <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                                <Calendar size={16} />
                                <span>Due: {task.deadline}</span>
                            </div>
                            <div>
                                <div className="mb-1 flex items-center justify-between">
                                    <span className="text-sm text-gray-600">
                                        Progress
                                    </span>
                                    <span className="text-sm font-medium text-gray-700">
                                        {task.progress}%
                                    </span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-gray-200">
                                    <div
                                        className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                                        style={{ width: `${task.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const WorkerAnalytics = () => {
        return (
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">
                        Performance Analytics
                    </h2>
                    <select className="rounded-lg border border-gray-200 px-3 py-1 text-sm">
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 3 months</option>
                    </select>
                </div>
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-blue-100 p-3">
                            <BarChart2 className="text-blue-600" size={24} />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-800">
                                Task Completion Rate
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-gray-900">
                                    92%
                                </span>
                                <span className="text-sm text-green-600">
                                    +5.2%
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="rounded-lg bg-green-100 p-3">
                            <Activity className="text-green-600" size={24} />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-800">
                                Customer Satisfaction
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-gray-900">
                                    4.8/5
                                </span>
                                <span className="text-sm text-green-600">
                                    +0.3
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const DashboardPage = () => {
        if (loading) {
            return (
                <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
                    <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
                </div>
            )
        }

        return (
            <div>
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Welcome back, John! 👋
                        </h1>
                        <p className="mt-1 text-gray-600">
                            Here's what's happening with your tasks today.
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
                    <WorkerAnalytics />
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
                default:
                    return 'bg-gray-100 text-gray-800'
            }
        }

        const getPriorityColor = (priority) => {
            switch (priority) {
                case 'High':
                    return 'bg-red-100 text-red-800'
                case 'Medium':
                    return 'bg-orange-100 text-orange-800'
                case 'Low':
                    return 'bg-green-100 text-green-800'
                default:
                    return 'bg-gray-100 text-gray-800'
            }
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
                        <Search
                            className="absolute left-3 top-2.5 text-gray-400"
                            size={20}
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
                                        Priority
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
                                            <span
                                                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(
                                                    order.status,
                                                )}`}
                                            >
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getPriorityColor(
                                                    order.priority,
                                                )}`}
                                            >
                                                {order.priority}
                                            </span>
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
        const [profileData, setProfileData] = useState({
            name: 'John Smith',
            email: 'john.smith@example.com',
            phone: '+1 234 567 890',
            address: '123 Worker Street, City, Country',
            skills: ['Plumbing', 'Electrical', 'Carpentry'],
            experience: '5 years',
            hourlyRate: '$45',
            bio: 'Professional handyman with extensive experience in residential and commercial repairs.',
            availability: 'Weekdays 9AM-5PM',
        })

        const [isEditing, setIsEditing] = useState(false)
        const [formData, setFormData] = useState(profileData)

        const handleInputChange = (e) => {
            const { name, value } = e.target
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }))
        }

        const handleSubmit = (e) => {
            e.preventDefault()
            setProfileData(formData)
            setIsEditing(false)
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
                                <button className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700">
                                    <UserCircle size={20} />
                                </button>
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                {profileData.name}
                            </h2>
                            <p className="text-gray-600">{profileData.email}</p>
                            <div className="mt-2 flex gap-2">
                                {profileData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Hourly Rate
                                    </label>
                                    <input
                                        type="text"
                                        name="hourlyRate"
                                        value={formData.hourlyRate}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Bio
                                </label>
                                <textarea
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="submit"
                                    className="rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Contact Information
                                    </h3>
                                    <div className="mt-2 space-y-2">
                                        <p className="text-gray-800">
                                            Phone: {profileData.phone}
                                        </p>
                                        <p className="text-gray-800">
                                            Email: {profileData.email}
                                        </p>
                                        <p className="text-gray-800">
                                            Address: {profileData.address}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">
                                        Work Information
                                    </h3>
                                    <div className="mt-2 space-y-2">
                                        <p className="text-gray-800">
                                            Experience: {profileData.experience}
                                        </p>
                                        <p className="text-gray-800">
                                            Hourly Rate:{' '}
                                            {profileData.hourlyRate}
                                        </p>
                                        <p className="text-gray-800">
                                            Availability:{' '}
                                            {profileData.availability}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    About
                                </h3>
                                <p className="mt-2 text-gray-800">
                                    {profileData.bio}
                                </p>
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
                                return <OrdersPage />
                            case 'profile':
                                return <ProfilePage />
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
