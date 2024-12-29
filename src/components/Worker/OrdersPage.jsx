import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getOrders } from '../../services/apis'

const OrdersPage = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        async function fetchData() {
            try {
                getOrders().then((data) => setOrders(data.data.orders))
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

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
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.service.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesStatus && matchesSearch
    })

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
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
                            {filteredOrders.map((order, i) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                        #{i + 1}
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
                                        {order.createdAt}
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
        </motion.div>
    )
}

export default OrdersPage
