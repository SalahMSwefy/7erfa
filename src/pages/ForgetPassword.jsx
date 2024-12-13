import { Form, Link } from 'react-router-dom'

const ForgotPassword = () => {
    return (
        <div className="mx-auto flex flex-col rounded-lg bg-white pt-12">
            <div className="my-auto flex h-full w-full justify-center md:gap-5 lg:justify-normal xl:gap-14">
                <div className="flex w-full items-center justify-center lg:p-12">
                    <div className="flex items-center px-4 xl:p-10">
                        <Form
                            method="POST"
                            className="flex h-full w-full flex-col rounded-3xl bg-orange-50 pb-6 text-center"
                        >
                            <h3 className="mb-3 w-auto font-brand text-4xl font-extrabold text-stone-900">
                                Forgot Password
                            </h3>
                            <p className="mb-4 text-stone-500">
                                Enter your email address to reset your password
                            </p>

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

                            <div className="mb-4 flex justify-center">
                                <button
                                    type="submit"
                                    className="mb-5 w-full rounded-2xl bg-orange-500 px-6 py-5 text-sm font-bold leading-none text-white transition duration-300 hover:bg-orange-600 focus:ring-4 focus:ring-orange-600 md:w-96"
                                >
                                    Submit
                                </button>
                            </div>

                            <p className="text-base font-normal leading-relaxed text-stone-500">
                                Remembered your password?
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

export default ForgotPassword
