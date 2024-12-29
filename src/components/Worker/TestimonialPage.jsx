import { useState } from 'react'
import { motion } from 'framer-motion'

import { Star } from 'lucide-react'
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
            testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
        >
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
                                            {renderStars(testimonial.rating)}
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
        </motion.div>
    )
}

export default TestimonialPage
