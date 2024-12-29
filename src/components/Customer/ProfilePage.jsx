import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { isValidEmail, isValidPhoneNumber } from '../../services/helper'
import { updateMe } from '../../services/apis'
import { Form } from 'react-router-dom'
import { ImageUp } from 'lucide-react'
import { motion } from 'framer-motion'

const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false)
    const fileInputRef = useRef(null)
    const [newData, setNewData] = useState({})
    const [errors, setErrors] = useState({})
    const { allUsers: users, updateUser, user } = useAuth()

    useEffect(() => {
        const initialData = {
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            city: user.city,
        }
        if (!isEditing) {
            setErrors({})
            setNewData(initialData)
        }
    }, [isEditing])

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setNewData((prevUser) => ({
            ...prevUser,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Form data:', newData)
        const validationErrors = {}
        console.log('validationErrors', validationErrors)

        if (
            !isValidEmail(newData.email, users) &&
            newData.email !== user.email
        ) {
            validationErrors.email = 'Invalid email or email already exists'
        }

        if (
            !isValidPhoneNumber(newData.phoneNumber, users) &&
            newData.phoneNumber !== user.phoneNumber
        ) {
            validationErrors.phoneNumber =
                'Invalid phone number or phone number already exists'
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        updateMe(newData)
            .then((data) => {
                console.log(data.data.user)
                updateUser(data.data.user)
                setErrors({})
                setIsEditing(false)
            })
            .catch((e) => {
                console.log(e)
                validationErrors.general = e.message
            })
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0]
        if (file) {
            // Perform validation or upload the file to a server
            console.log('Selected file:', file)
        }
    }
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click() // Programmatically click the file input
        }
    }

    return (
        <motion.div
            className="mx-auto max-w-4xl space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center space-x-6">
                    <div className="relative">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Profile"
                            className="h-32 w-32 rounded-full"
                        />
                        {isEditing && (
                            <button
                                className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700"
                                onClick={handleButtonClick}
                            >
                                <ImageUp size={20} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </button>
                        )}
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            {user.name}
                        </h2>
                        <p className="text-gray-600">{user.email}</p>
                        <div className="mt-2 flex gap-2">
                            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                Customer
                            </span>
                        </div>
                    </div>
                </div>

                {isEditing ? (
                    <Form
                        onSubmit={handleSubmit}
                        method="patch"
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            {/* Full Name */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={newData.name}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* City */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    City
                                </label>
                                <input
                                    id="city"
                                    type="text"
                                    name="city"
                                    value={newData.city}
                                    onChange={handleInputChange}
                                    className="w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={newData.email}
                                    onChange={handleInputChange}
                                    className={`w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none ${errors.email ? 'border border-red-500' : ''}`}
                                />
                                {errors?.email && (
                                    <span className="mt-2 text-center text-sm text-red-500">
                                        {errors.email}
                                    </span>
                                )}
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col">
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phoneNumber"
                                    value={newData.phoneNumber}
                                    onChange={handleInputChange}
                                    className={`w-full rounded-lg border border-gray-200 p-2 focus:border-blue-500 focus:outline-none ${errors.phoneNumber ? 'border border-red-500' : ''}`}
                                />
                                {errors?.phoneNumber && (
                                    <p className="mt-2 text-center text-sm text-red-500">
                                        {errors.phoneNumber}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end space-x-4">
                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                            >
                                Save Changes
                            </button>
                        </div>
                    </Form>
                ) : (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">
                                    Contact Information
                                </h3>
                                <div className="mt-2 space-y-2">
                                    <p className="text-gray-800">
                                        Phone: {user.phoneNumber}
                                    </p>
                                    <p className="text-gray-800">
                                        Email: {user.email}
                                    </p>
                                    <p className="text-gray-800">
                                        City: {user.city}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default ProfilePage
