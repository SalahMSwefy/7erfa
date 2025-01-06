import { useState, useEffect } from 'react'
import {
    Search,
    LayoutDashboard,
    UserCircle,
    LogOut,
    ListOrdered,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

const VITE_API_URL = import.meta.env.VITE_API_URL

function CustomerDashboard() {
    const location = useLocation()
    const [currentPage, setCurrentPage] = useState(location.pathname)
    const [loading, setLoading] = useState(true)
    const { logout, user } = useAuth()
    const navigate = useNavigate()
    const isAuth = Boolean(
        localStorage.getItem('token') && localStorage.getItem('user'),
    )

    useEffect(() => {
        setCurrentPage(location.pathname)
    }, [location.pathname])

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
            if (storedUser.role === 'worker') navigate('/worker-dashboard')
        }, [])
        const menuItems = [
            {
                title: 'Dashboard',
                icon: <LayoutDashboard size={20} />,
                page: '/customer-dashboard',
            },
            {
                title: 'Search Workers',
                icon: <Search size={20} />,
                page: '/customer-dashboard/search',
            },
            {
                title: 'Orders',
                icon: <ListOrdered size={20} />,
                page: '/customer-dashboard/orders',
            },
            {
                title: 'Profile',
                icon: <UserCircle size={20} />,
                page: '/customer-dashboard/profile',
            },
        ]

        return (
            <motion.div
                initial={{ x: -50 }}
                animate={{ x: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white"
            >
                <div className="border-b border-gray-200 p-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2"
                    >
                        <div className="text-brand-light flex items-center gap-2.5">
                            <button
                                className="text-brand-light text-brand-light flex items-center gap-2.5 font-brand text-3xl no-underline transition-colors duration-200 hover:text-orange-500"
                                onClick={() => {
                                    if (currentPage !== '/customer-dashboard')
                                        navigate('/customer-dashboard')
                                }}
                            >
                                <img
                                    src="/logos/logo.gif"
                                    alt="Logo"
                                    className="h-12 w-12 rounded-full object-cover object-center"
                                />
                                <span>7erfa</span>
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
                            onClick={() => {
                                if (currentPage !== item.page)
                                    navigate(item.page)
                            }}
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
                <div className="flex h-full items-center justify-end px-4">
                    <div className="flex items-center gap-4">
                        <motion.img
                            whileHover={{ scale: 1.1 }}
                            src={`${VITE_API_URL}/uploads/${user.image}`}
                            alt="Profile"
                            className="h-8 w-8 rounded-full border-2 border-blue-500"
                            onClick={() =>
                                navigate('/customer-dashboard/profile')
                            }
                        />
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            src="https://via.placeholder.com/40"
                            alt="Profile"
                            className="bg-s flex h-8 w-8 items-center justify-center rounded-full border-2 border-blue-500"
                            onClick={handleLogout}
                        >
                            <LogOut size={18} className="text-stone-500" />
                        </motion.button>
                    </div>
                </div>
            </motion.header>
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
                    {loading ? (
                        <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
                            <img
                                src="/logos/logo.gif"
                                alt="Loading..."
                                className="h-28 w-28 rounded-full object-cover object-center"
                            />
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </motion.div>
            </AnimatePresence>
        )
    }

    return isAuth ? (
        <div className="min-h-screen bg-gray-50">
            <Sidebar />
            <div className="ml-64">
                <Header />
                <main className="pt-16">
                    <div className="p-6">{renderPage()}</div>
                </main>
            </div>
        </div>
    ) : (
        <Navigate to="/login" replace />
    )
}

export default CustomerDashboard
