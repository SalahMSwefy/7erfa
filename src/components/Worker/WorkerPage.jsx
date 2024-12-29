import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { decrypt } from '../../services/cryptoUtils'
import TestimonialCard from '../../ui/TestimonialCard'
import { useState } from 'react'
import { makeOrder } from '../../services/apis'

const WorkerPage = () => {
    const { workerId } = useParams()
    const { workers } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [orderTitle, setOrderTitle] = useState('')
    const [orderDetails, setOrderDetails] = useState('')

    const decryptedWorkerId = decrypt(decodeURIComponent(workerId))

    // Find the worker by ID
    const worker = workers.find((worker) => worker._id === decryptedWorkerId)
    console.log(worker)

    if (!worker) {
        return <div>Worker not found</div>
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const orderData = {
            service: orderTitle,
            details: orderDetails,
        }
        // Send the order data to the backend
        makeOrder(orderData, decryptedWorkerId).catch((error) =>
            console.error('Error making order:', error),
        )
        // Close the modal
        setOrderTitle('')
        setOrderDetails('')
        setIsModalOpen(false)
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-extrabold text-gray-800 lg:text-4xl">
                    Hi I&apos;m {worker.name} 👋
                </h1>
                <button
                    className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                    onClick={() => setIsModalOpen(true)} // Open the modal
                >
                    Make Order
                </button>
            </div>

            {/* Modal Popup */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
                        <h2 className="text-xl font-semibold text-gray-800">
                            Create Order
                        </h2>
                        <form onSubmit={handleSubmit} className="mt-4">
                            <div className="mb-4">
                                <label
                                    htmlFor="orderTitle"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Problem Title
                                </label>
                                <input
                                    type="text"
                                    id="orderTitle"
                                    name="orderTitle"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
                                    placeholder="Enter the title of the problem"
                                    value={orderTitle}
                                    onChange={(e) =>
                                        setOrderTitle(e.target.value)
                                    }
                                    required
                                />
                                <label
                                    htmlFor="orderTitle"
                                    className="mt-4 block text-sm font-medium text-gray-700"
                                >
                                    Details
                                </label>
                                <textarea
                                    type="textarea"
                                    id="orderTitle"
                                    name="orderTitle"
                                    className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
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
                                    type="submit"
                                    className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="rounded-md bg-gray-500 px-4 py-2 font-medium text-gray-50 hover:text-gray-700"
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
                    className="h-32 w-32 rounded-full border-2 border-gray-300 object-cover lg:h-48 lg:w-48"
                    src={`/${worker.image}`}
                    alt={worker.name}
                />
                <div className="flex-1">
                    <h2 className="flex items-center justify-between text-base font-semibold text-gray-800 lg:text-xl">
                        <span className="rounded-full bg-gray-200 px-4 py-2">
                            {worker.skill}
                        </span>
                        <p className="rounded-full bg-yellow-100 px-4 py-2 text-base text-yellow-500 lg:text-lg">
                            {worker.ratingsAverage} ⭐
                        </p>
                    </h2>
                    <div className="lg:grid-row-2 lg:grid">
                        <h3 className="mt-4 text-base text-gray-700 lg:text-lg">
                            Personal Information:
                        </h3>
                        <div className="ml-2 mt-2 flex flex-col gap-2 border-2 border-gray-300 p-4">
                            <p className="text-base text-gray-500 lg:text-lg">
                                City: {worker.city}
                            </p>
                            <p className="text-base text-gray-500 lg:text-lg">
                                Email: {worker.email}
                            </p>
                            <p className="text-base text-gray-500 lg:text-lg">
                                Phone Number: {worker.phoneNumber}
                            </p>
                        </div>
                        <h3 className="mt-4 text-base text-gray-700 lg:text-lg">
                            Job information:
                        </h3>
                        <div className="ml-2 mt-2 flex flex-col gap-2 border-2 border-gray-300 p-4">
                            <p className="text-base text-gray-500 lg:text-lg">
                                Experience: {worker.yearsOfExperience} Years
                            </p>
                            <p className="text-base text-gray-500 lg:text-lg">
                                Price: {worker.hourlyRate} $ / hour
                            </p>
                        </div>
                    </div>
                    <p className="mt-4 flex flex-col text-base text-gray-700 lg:text-lg">
                        About :{' '}
                        <span className="ml-2 border-2 border-gray-300 p-4 text-gray-700">
                            {worker.bio}
                        </span>
                    </p>
                </div>
            </div>
            <TestimonialList />
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
        <div className="rounded-xl p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-800">
                    Latest reviews
                </h2>
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

export default WorkerPage
