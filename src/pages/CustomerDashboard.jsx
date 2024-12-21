import { useState, useEffect } from 'react'
import {
    Bell,
    Search,
    Menu,
    LayoutDashboard,
    UserCircle,
    Calendar,
    BarChart2,
    Activity,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

function CustomerDashboard() {
    const [currentPage, setCurrentPage] = useState('dashboard')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate loading data
        setTimeout(() => setLoading(false), 1000)
    }, [])

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

    const CustomerOrders = () => {
        const orders = [
            {
                id: 1,
                title: 'Plumbing Repair',
                provider: 'John Doe',
                date: '2024-01-15',
                status: 'In Progress',
                priority: 'High',
            },
            {
                id: 2,
                title: 'Electrical Work',
                provider: 'Jane Smith',
                date: '2024-01-16',
                status: 'Pending',
                priority: 'Medium',
            },
            {
                id: 3,
                title: 'Carpentry',
                provider: 'Mike Johnson',
                date: '2024-01-14',
                status: 'Completed',
                priority: 'Low',
            },
        ]

        return (
            <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-800">
                        Recent Orders
                    </h2>
                    <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                        View All
                    </button>
                </div>
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="rounded-lg border border-gray-100 p-4 transition-all duration-200 hover:shadow-md"
                        >
                            <div className="mb-2 flex items-start justify-between">
                                <div>
                                    <h3 className="font-medium text-gray-800">
                                        {order.title}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Provider: {order.provider}
                                    </p>
                                </div>
                                <span
                                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                                        order.priority === 'High'
                                            ? 'bg-red-100 text-red-800'
                                            : order.priority === 'Medium'
                                              ? 'bg-yellow-100 text-yellow-800'
                                              : 'bg-green-100 text-green-800'
                                    }`}
                                >
                                    {order.priority}
                                </span>
                            </div>
                            <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
                                <Calendar size={16} />
                                <span>Due: {order.date}</span>
                            </div>
                            <div>
                                <div className="mb-1 flex items-center justify-between">
                                    <span className="text-sm text-gray-600">
                                        Status
                                    </span>
                                    <span className="text-sm font-medium text-gray-700">
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
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

        const workers = [
            {
                id: 1,
                name: 'John Doe',
                skills: 'Plumbing, Repair',
                location: 'New York',
                rating: 4.5,
                image: 'https://www.ufcw.org/wp-content/blogs.dir/61/files/2020/09/cutout-2-650x0-c-default.png',
                bestWorker: true, // Label as best worker
            },
            {
                id: 2,
                name: 'Jane Smith',
                skills: 'Electrical, Installation',
                location: 'Los Angeles',
                rating: 4.7,
                image: 'https://png.pngtree.com/png-vector/20240603/ourmid/pngtree-seller-vacancy-in-supermarket-staff-hiring-png-image_12611298.png',
                bestWorker: true, // Label as best worker
            },
            {
                id: 3,
                name: 'Mike Johnson',
                skills: 'Carpentry, Design',
                location: 'Chicago',
                rating: 4.2,
                image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGdnJWhnUe5FUy-KMKexUcA-rs_eErhoMlo7eJC6HhbYxkGbz9F4Gs6o72RN8YJIq2W0k&usqp=CAU',
                bestWorker: false, // Not labeled as best worker
            },
        ]

        return (
            <div className="rounded-lg bg-white p-8 shadow-md">
                <motion.div
                    className="mb-8 flex items-center justify-between"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-800">
                            Welcome back, valued customer! 👋
                        </h1>
                        <p className="mt-2 text-lg text-gray-600">
                            Here&apos;s an overview of your recent activities.
                        </p>
                    </div>
                    <motion.button
                        className="rounded-lg bg-blue-600 px-6 py-3 text-white transition duration-200 hover:bg-blue-700"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        View All Activities
                    </motion.button>
                </motion.div>
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Search for Workers
                    </h2>
                    <div className="mt-4 flex gap-4">
                        <input
                            type="text"
                            placeholder="Enter skills"
                            className="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Enter city or country"
                            className="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <motion.button
                            className="rounded-lg bg-blue-600 px-6 py-3 text-white transition duration-200 hover:bg-blue-700"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Search
                        </motion.button>
                    </div>
                </motion.div>
                <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    {workers.map((worker) => (
                        <motion.div
                            key={worker.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-lg bg-white p-4 shadow-md transition-shadow duration-200 hover:shadow-lg"
                        >
                            <img
                                src={worker.image}
                                alt={worker.name}
                                className="h-32 w-full rounded-t-lg object-cover" // Fixed height for consistent view
                            />
                            <h3 className="text-lg font-semibold text-gray-800">
                                {worker.name}{' '}
                                {worker.bestWorker && (
                                    <span className="text-green-500">
                                        (Best Worker)
                                    </span>
                                )}
                            </h3>
                            <p className="text-sm text-gray-500">
                                Skills: {worker.skills}
                            </p>
                            <p className="text-sm text-gray-500">
                                Location: {worker.location}
                            </p>
                            <p className="text-sm text-yellow-500">
                                Rating: {worker.rating} ⭐
                            </p>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800">
                        Quick Stats
                    </h2>
                    <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="rounded-lg bg-green-100 p-6 shadow">
                            <h3 className="text-lg font-medium text-green-800">
                                Total Orders
                            </h3>
                            <p className="text-3xl font-bold text-gray-800">
                                {workers.length}
                            </p>
                        </div>
                        <div className="rounded-lg bg-yellow-100 p-6 shadow">
                            <h3 className="text-lg font-medium text-yellow-800">
                                Pending Orders
                            </h3>
                            <p className="text-3xl font-bold text-gray-800">
                                0
                            </p>
                        </div>
                        <div className="rounded-lg bg-red-100 p-6 shadow">
                            <h3 className="text-lg font-medium text-red-800">
                                Cancelled Orders
                            </h3>
                            <p className="text-3xl font-bold text-gray-800">
                                0
                            </p>
                        </div>
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
