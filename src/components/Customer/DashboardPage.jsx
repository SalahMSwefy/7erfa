import { motion } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import { CheckCircle, Clock, List, XCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getOrders } from '../../services/apis'
import { Link } from 'react-router-dom'
import { encrypt } from '../../services/cryptoUtils'

const VITE_API_URL = import.meta.env.VITE_API_URL

const DashboardPage = () => {
    const { user, workers } = useAuth()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        getOrders().then((data) => {
            setOrders(data.data.orders)
        })
    }, [])

    const skills = [
        'Mechanical',
        'Electrical',
        'Carpentry',
        'Painting',
        'Plumber',
        'Worker',
    ]

    // Group workers by skill
    const groupedWorkers = skills.reduce((acc, skill) => {
        const workersForSkill = workers.filter(
            (worker) => worker.skill === skill,
        )
        // Find the worker with the maximum years of experience for each skill
        const topWorker = workersForSkill.reduce((maxWorker, worker) => {
            return worker.yearsOfExperience > maxWorker.yearsOfExperience
                ? worker
                : maxWorker
        }, workersForSkill[0])

        acc[skill] = topWorker
        return acc
    }, {}) // Starting with an empty object

    return (
        <div className="space-y-8">
            <motion.div
                className="mb-8 flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
            >
                <div>
                    <h1 className="text-3xl font-extrabold capitalize text-gray-800 dark:text-gray-100">
                        Welcome back, {user.name} 👋
                    </h1>
                    <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
                        Here&apos;s an overview of your recent activities.
                    </p>
                </div>
            </motion.div>
            <OrderStats orders={orders} />
            <h3 className="block text-2xl font-semibold text-gray-800">
                Most Experience Workers
            </h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {skills.map((skill) => (
                    <motion.div
                        key={skill}
                        className="flex items-center rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg dark:bg-gray-800 dark:text-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ scale: 1.05 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Link
                            key={skill}
                            to={`/customer-dashboard/worker/${encodeURIComponent(encrypt(groupedWorkers[skill].id))}`}
                            className="flex w-full items-center justify-between gap-4 rounded-lg p-6 shadow-md hover:shadow-lg"
                        >
                            <motion.img
                                whileHover={{ scale: 1.2 }}
                                src={`${VITE_API_URL}/uploads/${groupedWorkers[skill]?.image}`}
                                alt={skill}
                                className="mr-4 h-16 w-16 rounded-full border border-gray-300 object-cover dark:border-white"
                            />
                            <div className="flex-1">
                                <h3 className="flex items-center justify-between text-sm font-semibold capitalize text-gray-800 dark:text-gray-100 md:text-lg">
                                    {groupedWorkers[skill]?.name || 'No Worker'}
                                    <p className="rounded-2xl bg-gray-100 px-2 py-1 text-xs text-yellow-500 dark:bg-gray-600 md:text-sm">
                                        {groupedWorkers[skill]
                                            ?.ratingsAverage || 'N/A'}
                                        ⭐
                                    </p>
                                </h3>
                                <p className="text-xs text-gray-500 dark:text-gray-300 md:text-sm">
                                    {skill}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-300 md:text-sm">
                                    City: {groupedWorkers[skill]?.city || 'N/A'}{' '}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-300 md:text-sm">
                                    Phone Num:{' '}
                                    {groupedWorkers[skill]?.phoneNumber ||
                                        'N/A'}{' '}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-300 md:text-sm">
                                    Experience:{' '}
                                    {groupedWorkers[skill]?.yearsOfExperience ||
                                        'N/A'}
                                    {' Years'}
                                </p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

const OrderStats = ({ orders }) => {
    const completedOrders = orders?.filter(
        (order) => order.status === 'completed',
    ).length

    const activeOrders = orders?.filter(
        (order) => order.status === 'in progress' || order.status === 'pending',
    ).length

    const canceledOrders = orders?.filter(
        (order) => order.status === 'canceled',
    ).length
    const stats = [
        {
            title: 'Total Orders',
            value: orders?.length || '0',
            icon: <List size={20} />,
            color: 'bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500',
        },
        {
            title: 'Completed Orders',
            value: completedOrders,
            icon: <CheckCircle size={20} />,
            color: 'bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500',
        },
        {
            title: 'Active Orders',
            value: activeOrders,
            icon: <Clock size={20} />,
            color: 'bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-500',
        },
        {
            title: 'Canceled Orders',
            value: canceledOrders,
            icon: <XCircle size={20} />,
            color: 'bg-gradient-to-r from-red-500 to-red-600 dark:from-red-400 dark:to-red-500',
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`rounded-xl p-6 ${stat.color} transform shadow-lg transition-all duration-200 hover:scale-105`}
                >
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-sm font-medium text-white dark:text-gray-100">
                            {stat.title}
                        </h3>
                        <div className="rounded-lg bg-white/20 p-2">
                            {stat.icon}
                        </div>
                    </div>
                    <div className="flex items-end justify-between">
                        <p className="text-3xl font-bold text-white dark:text-gray-100">
                            {stat.value}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default DashboardPage
