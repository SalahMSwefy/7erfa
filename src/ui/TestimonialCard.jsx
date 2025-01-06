import { Star } from 'lucide-react'
const VITE_API_URL = import.meta.env.VITE_API_URL

const TestimonialCard = ({ testimonial }) => {
    // Destructure the testimonial object
    const { customer = {}, review, rating } = testimonial

    // Generate the number of full stars and empty stars with unique keys
    const fullStars = Array(rating)
        .fill(null)
        .map((_, index) => (
            <Star
                key={`full-${index}`}
                className="fill-yellow-500 text-yellow-500"
            />
        ))
    const emptyStars = Array(5 - rating)
        .fill(null)
        .map((_, index) => (
            <Star
                key={`empty-${index}`}
                className="fill-gray-300 text-gray-300"
            />
        ))

    return (
        <div className="max-w-full rounded-lg border border-gray-200 p-4 font-sans hover:shadow-md">
            {/* Header */}
            <div className="mb-4 flex items-center">
                {/* Profile Image */}
                <img
                    src={`${VITE_API_URL}/uploads/${customer.image}`}
                    alt="Profile"
                    className="mr-4 h-12 w-12 rounded-full"
                />
                {/* Name and Role */}
                <div className="flex-1">
                    <h3 className="text-lg font-bold capitalize">
                        {customer?.name}
                    </h3>
                    <p className="text-sm text-gray-500">{customer?.city}</p>
                </div>
                {/* Star Ratings */}
                <div className="flex text-lg">
                    {[...fullStars, ...emptyStars]}
                </div>
            </div>
            {/* Testimonial Text */}
            <p className="text-sm font-medium text-gray-700">{review}</p>
        </div>
    )
}

export default TestimonialCard
