import { useAuth } from '../../context/AuthContext'
import TestimonialCard from '../../ui/TestimonialCard'
import { motion } from 'framer-motion'

import { TrendingUp, Clock, DollarSign, Star, Calendar } from 'lucide-react'
const DashboardPage = () => {
    const { user } = useAuth()

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">
                        Welcome back, {user.name}! 👋
                    </h1>
                    <p className="mt-1 text-gray-600">
                        Here&apos;s what&apos;s happening with your tasks today.
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
        </motion.div>
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
                {/* <button
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    onClick={() => setCurrentPage('orders')}
                >
                    View All
                </button> */}
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
                {/* <button
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    onClick={() => setCurrentPage('orders')}
                >
                    View All
                </button> */}
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
export default DashboardPage
