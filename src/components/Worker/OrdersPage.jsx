import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getOrders, updateOrderStatus } from '../../services/apis'

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
            case 'completed':
                return 'bg-green-100 text-green-800'
            case 'in Progress':
                return 'bg-blue-200 text-blue-700'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800'
            case 'canceled':
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
        updateOrderStatus(id, newStatus)
    }

    const filteredOrders = orders?.filter((order) => {
        const matchesStatus =
            filterStatus === 'all' ||
            order.status === filterStatus.toLowerCase()
        const matchesSearch =
            order.customer.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
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
                                    Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {filteredOrders.map((order, i) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                        #{i + 1}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm capitalize text-gray-500">
                                        {order.customer.name}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm capitalize text-gray-500">
                                        {order.service}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {order.details}
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
                                            {order.status === 'pending' ? (
                                                <>
                                                    <option value="pending">
                                                        Pending
                                                    </option>
                                                    <option value="in progress">
                                                        In Progress
                                                    </option>
                                                    <option value="completed">
                                                        Completed
                                                    </option>
                                                    <option value="canceled">
                                                        Canceled
                                                    </option>
                                                </>
                                            ) : order.status ===
                                              'in progress' ? (
                                                <>
                                                    <option value="in progress">
                                                        In Progress
                                                    </option>
                                                    <option value="completed">
                                                        Completed
                                                    </option>
                                                </>
                                            ) : order.status === 'completed' ? (
                                                <>
                                                    <option value="completed">
                                                        Completed
                                                    </option>
                                                </>
                                            ) : (
                                                <>
                                                    <option value="canceled">
                                                        Canceled
                                                    </option>
                                                </>
                                            )}
                                        </select>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                        {new Date(
                                            order.createdAt,
                                        ).toLocaleString('en-EG')}
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
