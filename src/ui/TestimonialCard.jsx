import { Star } from 'lucide-react'

const TestimonialCard = ({ testimonial }) => {
    // Destructure the testimonial object
    const { id, name, role, imageUrl, testimonialText, rating } = testimonial

    // Generate the number of full stars and empty stars
    const fullStars = Array(rating).fill(
        <Star className="fill-yellow-500 text-yellow-500" />,
    )
    const emptyStars = Array(5 - rating).fill(
        <Star className="fill-gray-300 text-gray-300" />,
    )

    return (
        <div
            className="max-w-full rounded-lg border border-gray-200 p-4 font-sans hover:shadow-md"
            key={id}
        >
            {/* Header */}
            <div className="mb-4 flex items-center">
                {/* Profile Image */}
                <img
                    src={imageUrl || 'https://via.placeholder.com/50'}
                    alt="Profile"
                    className="mr-4 h-12 w-12 rounded-full"
                />
                {/* Name and Role */}
                <div className="flex-1">
                    <h3 className="text-lg font-bold">{name}</h3>
                    <p className="text-sm text-gray-500">{role}</p>
                </div>
                {/* Star Ratings */}
                <div className="flex text-lg">
                    {[...fullStars, ...emptyStars]}
                </div>
            </div>
            {/* Testimonial Text */}
            <p className="text-xs text-gray-700">{testimonialText}</p>
        </div>
    )
}

export default TestimonialCard
