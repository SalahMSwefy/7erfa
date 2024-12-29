import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom' // Import Link
import { encrypt } from '../../services/cryptoUtils'

const SearchWorkersPage = () => {
    const { workers } = useAuth()

    const workersPerPage = 9
    const [currentPage, setCurrentPage] = useState(1)

    // Filter state
    const [workerName, setWorkerName] = useState('')
    const [city, setCity] = useState('')
    const [category, setCategory] = useState('all')
    const [sortOption, setSortOption] = useState('none') // 'none', 'rating', 'experience', 'both'

    // Filter workers based on user inputs
    const filteredWorkers = workers.filter((worker) => {
        const matchesName = worker.name
            .toLowerCase()
            .includes(workerName.toLowerCase())
        const matchesCity = worker.city
            .toLowerCase()
            .includes(city.toLowerCase())
        const matchesCategory =
            category === 'all' ||
            worker.skill.toLowerCase() === category.toLowerCase()

        return matchesName && matchesCity && matchesCategory
    })

    // Sort workers based on the selected sort option
    const sortWorkers = (workers) => {
        switch (sortOption) {
            case 'rating':
                return workers.sort(
                    (a, b) => b.ratingsAverage - a.ratingsAverage,
                )
            case 'experience':
                return workers.sort(
                    (a, b) => b.yearsOfExperience - a.yearsOfExperience,
                )
            case 'both':
                return workers.sort((a, b) => {
                    if (b.ratingsAverage === a.ratingsAverage) {
                        return b.yearsOfExperience - a.yearsOfExperience
                    }
                    return b.ratingsAverage - a.ratingsAverage
                })
            default:
                return workers
        }
    }

    const sortedWorkers = sortWorkers(filteredWorkers)

    // Pagination
    const indexOfLastWorker = currentPage * workersPerPage
    const indexOfFirstWorker = indexOfLastWorker - workersPerPage
    const currentWorkers = sortedWorkers.slice(
        indexOfFirstWorker,
        indexOfLastWorker,
    )

    const totalPages = Math.ceil(sortedWorkers.length / workersPerPage)

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (
        <motion.div
            className="p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <h1 className="mb-8 text-4xl font-extrabold text-gray-800">
                Search Workers
            </h1>
            <div className="mb-8 flex gap-4">
                <input
                    type="text"
                    placeholder="Enter Worker Name"
                    value={workerName}
                    onChange={(e) => setWorkerName(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex-3 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">All</option>
                    <option value="mechanical">Mechanical</option>
                    <option value="electrical">Electrical</option>
                    <option value="carpentry">Carpentry</option>
                    <option value="painting">Painting</option>
                    <option value="plumber">Plumber</option>
                    <option value="worker">Worker</option>
                </select>
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="flex-3 rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="none">Sort by</option>
                    <option value="rating">Rating</option>
                    <option value="experience">Years of Experience</option>
                    <option value="both">Rating & Experience</option>
                </select>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800">Workers</h2>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
                {currentWorkers.map((worker) => (
                    <Link
                        key={worker._id}
                        to={`/customer-dashboard/worker/${encodeURIComponent(encrypt(worker._id))}`}
                        className="flex items-center justify-between gap-4 rounded-lg bg-white p-6 shadow-md hover:shadow-lg"
                    >
                        <img
                            className="h-24 w-24 rounded-full border-2 border-gray-300 object-cover"
                            src={`/${worker.image}`}
                            alt={worker.name}
                        />
                        <div className="flex-1">
                            <h3 className="mt-4 text-xl font-semibold text-gray-800">
                                {worker.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {worker.skill}
                            </p>
                            <p className="text-sm text-gray-500">
                                City: {worker.city || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-500">
                                Phone Num: {worker.phoneNumber || 'N/A'}
                            </p>
                            <p className="text-sm text-gray-500">
                                Experience: {worker.yearsOfExperience || 'N/A'}{' '}
                                Years
                            </p>
                            <p className="text-sm text-yellow-500">
                                Rating: {worker.ratingsAverage || 'N/A'} ⭐
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-6 flex items-center justify-between">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="rounded-lg bg-gray-300 px-4 py-2 text-xl font-semibold text-gray-700 hover:bg-gray-400 hover:text-white disabled:bg-gray-200"
                >
                    Previous
                </button>
                <div className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </div>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="rounded-lg bg-gray-300 px-4 py-2 text-xl font-semibold text-gray-700 hover:bg-gray-400 hover:text-white disabled:bg-gray-200"
                >
                    Next
                </button>
            </div>
        </motion.div>
    )
}

export default SearchWorkersPage
