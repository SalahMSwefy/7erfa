import { useState } from 'react'
import { Form, Link, redirect } from 'react-router-dom'

const Register = () => {
    const [role, setRole] = useState('worker') // Default to 'worker'

    const handleRoleChange = (event) => {
        setRole(event.target.value) // Update role based on selected radio button
    }

    return (
        <div className="mx-auto flex flex-col rounded-lg bg-orange-50 pt-12">
            <div className="draggable my-auto flex h-full w-full justify-center md:gap-5 lg:justify-normal xl:gap-14">
                <div className="flex w-full items-center justify-center lg:p-12">
                    <div className="flex items-center px-4 xl:p-10">
                        <Form
                            method="POST"
                            className="flex h-full w-full flex-col rounded-3xl pb-6 text-center"
                        >
                            <h3 className="mb-3 w-auto font-brand text-4xl font-extrabold text-stone-900">
                                {role === 'worker' ? 'Worker' : 'Customer'}{' '}
                                Registration
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
                                className="mb-7 mr-2 flex w-full items-center rounded-2xl bg-stone-200 px-5 py-4 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300"
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
                                className="mb-7 mr-2 flex w-full items-center rounded-2xl bg-stone-200 px-5 py-4 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300"
                                required
                            />

                            <label
                                htmlFor="password"
                                className="mb-2 text-start text-sm font-semibold text-stone-950"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter a password"
                                className="mb-7 mr-2 flex w-full items-center rounded-2xl bg-stone-200 px-5 py-4 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300"
                                required
                            />

                            <label
                                htmlFor="passwordConfirm"
                                className="mb-2 text-start text-sm font-semibold text-stone-950"
                            >
                                Confirm Password
                            </label>
                            <input
                                id="passwordConfirm"
                                name="passwordConfirm"
                                type="password"
                                placeholder="Confirm password"
                                className="mb-7 mr-2 flex w-full items-center rounded-2xl bg-stone-200 px-5 py-4 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300"
                                required
                            />

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
                                className="mb-7 mr-2 flex w-full items-center rounded-2xl bg-stone-200 px-5 py-4 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300"
                                required
                            />

                            <label
                                htmlFor="city"
                                className="mb-2 text-start text-sm font-semibold text-stone-950"
                            >
                                City
                            </label>
                            <input
                                id="city"
                                type="text"
                                name="city"
                                placeholder="City"
                                className="mb-7 mr-2 flex w-full items-center rounded-2xl bg-stone-200 px-5 py-4 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300"
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
                                                className="mb-7 mr-2 flex w-full items-center rounded-2xl bg-stone-200 px-5 py-4 text-sm font-medium text-stone-900 outline-none transition duration-300 ease-in-out hover:bg-stone-300"
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
                                        className="mb-7 mr-2 flex w-full items-center rounded-2xl bg-stone-200 px-5 py-4 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300"
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
                                        className="mb-7 mr-2 flex w-full items-center rounded-2xl bg-stone-200 px-5 py-4 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300"
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
                                        className="mb-7 mr-2 flex w-full items-center rounded-2xl bg-stone-200 px-5 py-4 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300"
                                        required
                                    />
                                </>
                            )}

                            <div className="mb-4 flex justify-center">
                                <button
                                    type="submit"
                                    className="mb-5 w-full rounded-2xl bg-orange-500 px-6 py-5 text-sm font-bold leading-none text-white transition duration-300 hover:bg-orange-600 focus:ring-4 focus:ring-orange-600 md:w-96"
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
            </div>
        </div>
    )
}

export async function action({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)
    console.log(data)

    // const order = {
    //     ...data,
    //     cart: JSON.parse(data.cart),
    //     priority: data.priority === 'on',
    // }

    // const errors = {}
    // if (!isValidPhone(data.phone))
    //     errors.phone = 'please type a correct phone number to contact you'
    // if (Object.keys(errors).length > 0) return errors

    // if all ok
    // const newOrder = await createOrder(order)
    return redirect(`/dashboard`)
}

export default Register
