import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { decrypt } from '../../services/cryptoUtils'
import { useEffect, useState } from 'react'
import { createReview, getReviews, makeOrder } from '../../services/apis'
import TestimonialCard from '../../ui/TestimonialCard'
import { CalendarArrowUp, Star } from 'lucide-react'

const VITE_API_URL = import.meta.env.VITE_API_URL

const WorkerPage = () => {
    const { workerId } = useParams()
    const { workers } = useAuth()
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
    const [orderTitle, setOrderTitle] = useState('')
    const [orderDetails, setOrderDetails] = useState('')
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState(0)
    const [reviews, setReview] = useState([])

    const decryptedWorkerId = decrypt(decodeURIComponent(workerId))
    useEffect(() => {
        getReviews(decryptedWorkerId)
            .then((data) => {
                setReview(data.data.data)
            })
            .catch((error) => console.error('Error fetching reviews:', error))
    }, [decryptedWorkerId])

    // Find the worker by ID
    const worker = workers.find((worker) => worker._id === decryptedWorkerId)

    if (!worker) {
        return <div>Worker not found</div>
    }

    const handleOrderSubmit = (e) => {
        e.preventDefault()
        const orderData = {
            service: orderTitle,
            details: orderDetails,
        }
        makeOrder(orderData, decryptedWorkerId).catch((error) =>
            console.error('Error making order:', error),
        )
        setOrderTitle('')
        setOrderDetails('')
        setIsOrderModalOpen(false)
    }

    const handleReviewSubmit = () => {
        const reviewData = { review: reviewText, rating }
        createReview(decryptedWorkerId, reviewData).catch((error) =>
            console.error('Error submitting review:', error),
        )
        setReviewText('')
        setRating(0)
        setIsReviewModalOpen(false)
    }

    return (
        <div className="lg:p-8">
            <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
                <h1 className="text-lg font-extrabold text-gray-800 dark:text-gray-50 md:text-xl lg:text-3xl">
                    Hi I&apos;m {worker.name} 👋
                </h1>
                <div className="flex gap-4">
                    <button
                        className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-blue-700 lg:gap-2 lg:px-4 lg:py-2 lg:text-base"
                        onClick={() => setIsOrderModalOpen(true)} // Open the modal
                    >
                        <CalendarArrowUp className="fill-blue-500" />
                        Make Order
                    </button>
                    <button
                        className="flex items-center gap-1 rounded-lg bg-yellow-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-yellow-600 lg:gap-2 lg:px-4 lg:py-2 lg:text-base"
                        onClick={() => setIsReviewModalOpen(true)}
                    >
                        <Star className="fill-yellow-500" />
                        Make a Review
                    </button>
                </div>
            </div>

            {/* Order Modal */}
            {isOrderModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50 dark:bg-gray-700/50">
                    <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-50">
                            Create Order
                        </h2>
                        <form onSubmit={handleOrderSubmit} className="mt-4">
                            <div className="mb-4">
                                <label
                                    htmlFor="orderTitle"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-50"
                                >
                                    Problem Title
                                </label>
                                <input
                                    type="text"
                                    id="orderTitle"
                                    name="orderTitle"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 dark:bg-gray-700 dark:text-gray-100"
                                    placeholder="Enter the title of the problem"
                                    value={orderTitle}
                                    onChange={(e) =>
                                        setOrderTitle(e.target.value)
                                    }
                                    required
                                />
                                <label
                                    htmlFor="orderDetails"
                                    className="mt-4 block text-sm font-medium text-gray-700 dark:text-gray-50"
                                >
                                    Details
                                </label>
                                <textarea
                                    id="orderDetails"
                                    name="orderDetails"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 dark:bg-gray-700 dark:text-gray-100"
                                    placeholder="More details about the problem"
                                    value={orderDetails}
                                    onChange={(e) =>
                                        setOrderDetails(e.target.value)
                                    }
                                    required
                                />
                            </div>
                            <div className="mt-6 flex justify-between">
                                <button
                                    type="submit" // Ensure this button type is submit
                                    className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 hover:text-gray-400"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setOrderTitle('')
                                        setOrderDetails('')
                                        setIsOrderModalOpen(false)
                                    }}
                                    className="rounded-md bg-gray-500 px-4 py-2 font-medium text-gray-50 hover:text-gray-400"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Review Modal */}
            {isReviewModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800/50 dark:bg-gray-600/50">
                    <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-50">
                            Leave a Review
                        </h2>
                        <form onSubmit={handleReviewSubmit} className="mt-4">
                            <div className="mb-4">
                                <label
                                    htmlFor="reviewText"
                                    className="block text-base font-medium text-gray-700 dark:text-gray-50"
                                >
                                    Review
                                </label>
                                <textarea
                                    id="reviewText"
                                    name="reviewText"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 dark:bg-gray-700 dark:text-gray-100"
                                    placeholder="Share your experience"
                                    value={reviewText}
                                    onChange={(e) =>
                                        setReviewText(e.target.value)
                                    }
                                    required
                                />
                                <label
                                    htmlFor="rating"
                                    className="mt-4 block text-base font-medium text-gray-700 dark:text-gray-50"
                                >
                                    Rating
                                </label>
                                <div className="mt-2 flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`cursor-pointer ${
                                                rating >= star
                                                    ? 'fill-yellow-500 text-yellow-500'
                                                    : 'fill-gray-300 text-gray-300'
                                            }`}
                                            onClick={() => setRating(star)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="mt-6 flex justify-between">
                                <button
                                    type="submit"
                                    className="rounded-md bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700 hover:text-gray-200"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setRating(0)
                                        setIsReviewModalOpen(false)
                                    }}
                                    className="rounded-md bg-gray-500 px-4 py-2 font-medium text-gray-50 hover:text-gray-400"
                                >
                                    Close
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <div className="mt-6 flex flex-col items-center gap-8 lg:flex-row">
                <img
                    className="h-24 w-24 rounded-full border border-gray-300 object-cover md:h-32 md:w-32 lg:h-48 lg:w-48"
                    src={`${VITE_API_URL}/uploads/${worker.image}`}
                    alt={worker.name}
                />
                <div className="flex-1">
                    <h2 className="flex items-center justify-between text-sm font-semibold text-gray-800 md:text-base lg:text-xl">
                        <span className="rounded-full bg-gray-200 px-4 py-2">
                            {worker.skill}
                        </span>
                        <p className="rounded-full bg-yellow-100 px-4 py-2 text-sm text-yellow-500 md:text-base lg:text-lg">
                            {worker.ratingsAverage} ⭐
                        </p>
                    </h2>
                    <div className="lg:grid-row-2 lg:grid">
                        <h3 className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-50 md:text-base lg:text-lg">
                            Personal Information:
                        </h3>
                        <div className="ml-2 mt-2 flex flex-col gap-2 rounded-lg border border-gray-300 p-4">
                            <p className="text-sm text-gray-700 dark:text-gray-100 md:text-base lg:text-lg">
                                City: {worker.city}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-100 md:text-base lg:text-lg">
                                Email: {worker.email}
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-100 md:text-base lg:text-lg">
                                Phone Number: {worker.phoneNumber}
                            </p>
                        </div>
                        <h3 className="mt-4 text-sm font-medium text-gray-700 dark:text-gray-50 md:text-base lg:text-lg">
                            Job information:
                        </h3>
                        <div className="ml-2 mt-2 flex flex-col gap-2 rounded-lg border border-gray-300 p-4">
                            <p className="text-sm text-gray-700 dark:text-gray-100 md:text-base lg:text-lg">
                                Experience: {worker.yearsOfExperience} Years
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-100 md:text-base lg:text-lg">
                                Price: {worker.hourlyRate} $ / hour
                            </p>
                        </div>
                    </div>
                    <p className="mt-4 flex flex-col text-sm font-medium text-gray-700 dark:text-gray-50 md:text-base lg:text-lg">
                        About :{' '}
                        <span className="ml-2 rounded-lg border border-gray-300 p-4 font-normal text-gray-700 dark:text-gray-100">
                            {worker.bio}
                        </span>
                    </p>
                </div>
            </div>
            {reviews.length > 0 ? <TestimonialList reviews={reviews} /> : null}
        </div>
    )
}

const TestimonialList = ({ reviews }) => {
    return (
        <div className="rounded-xl p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">
                    Latest reviews
                </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:grid-rows-2">
                {reviews.map((testimonial) => (
                    <TestimonialCard
                        key={testimonial.id}
                        testimonial={testimonial}
                    />
                ))}
            </div>
        </div>
    )
}

export default WorkerPage
