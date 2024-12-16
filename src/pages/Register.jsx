import { useEffect, useState } from 'react'
import { Form, Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
    createCustomer,
    createWorker,
    getCustomers,
    getWorkers,
    // getUsers,
} from '../services/apis'
import {
    isValidEmail,
    isValidPassword,
    isValidPhoneNumber,
} from '../services/helper'

const Register = () => {
    const navigate = useNavigate()
    const [role, setRole] = useState('worker')
    const [errors, setErrors] = useState({})
    const [users, setUsers] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const workers = await getWorkers()
                const customers = await getCustomers()
                const response = [...workers.data.data, ...customers.data.data]
                setUsers(response)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
        fetchData()
    }, [])

    const mutation = useMutation({
        mutationFn: async (formData) => {
            if (role === 'worker') {
                return await createWorker(formData)
            } else {
                return await createCustomer(formData)
            }
        },
        onSuccess: (data) => {
            console.log('Mutation success:', data)
            console.log(errors)
            if (data?.error) {
                setErrors({ general: data.error })
            } else {
                navigate('/login')
            }
        },
        onError: (error) => {
            const backendErrors = error.response?.data?.errors || {}
            setErrors({
                ...backendErrors,
                general:
                    error.message || 'Something went wrong. Please try again.',
            })
        },
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const data = Object.fromEntries(formData)
        const validationErrors = {}
        console.log(validationErrors)

        if (!isValidEmail(data.email, users)) {
            validationErrors.email = 'Invalid email or email already exists'
        }
        if (!isValidPassword(data.password)) {
            validationErrors.password = 'Password must be at least 8 characters'
        }
        if (data.password !== data.passwordConfirm) {
            validationErrors.passwordConfirm = 'Passwords do not match'
        }
        if (!isValidPhoneNumber(data.phoneNumber, users)) {
            validationErrors.phoneNumber =
                'Invalid phone number or phone number already exists'
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        console.log('Form submission data:', data)
        setErrors({})
        mutation.mutate(data)
    }

    const handleRoleChange = (event) => {
        setRole(event.target.value)
    }

    return (
        <div className="flex w-full items-center justify-center bg-orange-50 p-4 lg:pt-12">
            <div className="flex items-center px-4">
                <Form
                    onSubmit={handleSubmit}
                    className="flex h-full w-full flex-col rounded-3xl pb-6 text-center"
                >
                    <h3 className="mb-3 w-auto font-brand text-4xl font-extrabold text-stone-900">
                        {role === 'worker' ? 'Worker' : 'Customer'} Registration
                    </h3>
                    <p className="mb-4 text-stone-500">
                        Enter your details to create an account
                    </p>
                    {/* Radio Buttons for Role Selection */}
                    <div className="mb-6 flex justify-center gap-4">
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="role"
                                value="worker"
                                checked={role === 'worker'}
                                onChange={handleRoleChange}
                                className="mr-2 hidden"
                            />
                            <span
                                className={`${role === 'worker' ? 'bg-orange-500' : ''} rounded-lg px-3 py-2 text-lg font-medium tracking-wide text-stone-900`}
                            >
                                Worker
                            </span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="role"
                                value="customer"
                                checked={role === 'customer'}
                                onChange={handleRoleChange}
                                className="mr-2 hidden"
                            />
                            <span
                                className={`${role !== 'worker' ? 'bg-orange-500' : ''} rounded-lg px-3 py-2 text-lg font-medium tracking-wide text-stone-900`}
                            >
                                Customer
                            </span>
                        </label>
                    </div>
                    <label
                        htmlFor="name"
                        className="mb-2 text-start text-sm font-semibold text-stone-950"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        className="mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300"
                        required
                    />

                    <label
                        htmlFor="email"
                        className="mb-2 text-start text-sm font-semibold text-stone-950"
                    >
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="email@example.com"
                        className={`mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 ${errors.email ? 'border border-red-500' : ''}`}
                        required
                    />
                    {errors?.email && (
                        <span className="-mt-4 text-center text-sm text-red-500">
                            {errors.email}
                        </span>
                    )}
                    <div className="flex flex-col items-center justify-between sm:flex-row">
                        <div className="flex w-full flex-col sm:w-auto">
                            <label
                                htmlFor="password"
                                className="text-start text-sm font-semibold text-stone-950"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter a password"
                                className={`mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 ${errors.password ? 'border border-red-500' : ''}`}
                                required
                            />
                            {errors?.password && (
                                <p className="-mt-4 text-center text-sm text-red-500">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                        <div className="flex w-full flex-col sm:w-auto">
                            <label
                                htmlFor="passwordConfirm"
                                className="text-start text-sm font-semibold text-stone-950"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="passwordConfirm"
                                name="passwordConfirm"
                                type="password"
                                placeholder="Confirm password"
                                className={`mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 ${errors.passwordConfirm ? 'border border-red-500' : ''}`}
                                required
                            />
                            {errors?.passwordConfirm && (
                                <p className="-mt-4 text-center text-sm text-red-500">
                                    {errors.passwordConfirm}
                                </p>
                            )}
                        </div>
                    </div>
                    <label
                        htmlFor="phoneNumber"
                        className="mb-2 text-start text-sm font-semibold text-stone-950"
                    >
                        Phone Number
                    </label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        placeholder="Phone Number"
                        className={`mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 ${errors.phoneNumber ? 'border border-red-500' : ''}`}
                        required
                    />
                    {errors?.phoneNumber && (
                        <p className="-mt-4 text-center text-sm text-red-500">
                            {errors.phoneNumber}
                        </p>
                    )}

                    <label
                        htmlFor="city"
                        className="mb-2 pl-1 text-start text-sm font-semibold text-stone-950"
                    >
                        City
                    </label>
                    <input
                        id="city"
                        type="text"
                        name="city"
                        placeholder="City"
                        className="mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300"
                        required
                    />

                    {/* Conditional Form Fields for Worker */}
                    {role === 'worker' && (
                        <>
                            {role === 'worker' && (
                                <>
                                    <label
                                        htmlFor="skill"
                                        className="mb-2 text-start text-sm font-semibold text-stone-950"
                                    >
                                        Skill
                                    </label>
                                    <select
                                        id="skill"
                                        name="skill"
                                        className="mb-5 flex w-full items-center rounded-2xl bg-stone-200 py-2 pl-4 text-sm font-medium text-stone-900 outline-none transition duration-300 ease-in-out hover:bg-stone-300"
                                        required
                                        defaultValue={''}
                                    >
                                        <option
                                            value=""
                                            disabled
                                            className="text-stone-400"
                                        >
                                            Select your skill
                                        </option>
                                        <option
                                            value="Electrical"
                                            className="text-stone-900 hover:bg-orange-50"
                                        >
                                            Electrical
                                        </option>
                                        <option
                                            value="Mechanical"
                                            className="text-stone-900 hover:bg-orange-50"
                                        >
                                            Mechanical
                                        </option>
                                        <option
                                            value="Carpentry"
                                            className="text-stone-900 hover:bg-orange-50"
                                        >
                                            Carpentry
                                        </option>
                                        <option
                                            value="Painting"
                                            className="text-stone-900 hover:bg-orange-50"
                                        >
                                            Painting
                                        </option>
                                        <option
                                            value="Plumber"
                                            className="text-stone-900 hover:bg-orange-50"
                                        >
                                            Plumber
                                        </option>
                                        <option
                                            value="Worker"
                                            className="text-stone-900 hover:bg-orange-50"
                                        >
                                            Worker
                                        </option>
                                    </select>
                                </>
                            )}
                            <label
                                htmlFor="yearsOfExperience"
                                className="mb-2 text-start text-sm font-semibold text-stone-950"
                            >
                                Years of Experience
                            </label>
                            <input
                                id="yearsOfExperience"
                                name="yearsOfExperience"
                                type="number"
                                placeholder="Years of Experience"
                                className="mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300"
                                required
                            />

                            <label
                                htmlFor="hourlyRate"
                                className="mb-2 text-start text-sm font-semibold text-stone-950"
                            >
                                Hourly Rate
                            </label>
                            <input
                                id="hourlyRate"
                                name="hourlyRate"
                                type="number"
                                placeholder="Hourly Rate"
                                className="mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300"
                                required
                            />

                            <label
                                htmlFor="bio"
                                className="mb-2 text-start text-sm font-semibold text-stone-950"
                            >
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                placeholder="Write a brief bio"
                                className="mb-5 flex w-full items-center rounded-2xl bg-stone-200 px-4 py-2 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300"
                                required
                            />
                        </>
                    )}

                    <div className="mb-4 flex items-center justify-center">
                        <button
                            type="submit"
                            className="w-1/2 rounded-2xl bg-orange-500 px-5 py-3 text-lg font-bold leading-none tracking-wider text-white transition duration-300 hover:bg-orange-600 focus:ring-4 focus:ring-orange-600"
                        >
                            Register
                        </button>
                    </div>

                    <p className="text-base font-normal leading-relaxed text-stone-500">
                        Already have an account?
                        <Link
                            to="/login"
                            className="text-grey-700 ml-2 font-bold text-stone-900 hover:underline focus:underline"
                        >
                            Log In
                        </Link>
                    </p>
                </Form>
            </div>
        </div>
    )
}

export default Register
