import { Form, Link, redirect } from 'react-router-dom'
import { login } from '../services/apis'

const Login = () => {
    return (
        <div className="mx-auto flex h-screen flex-col rounded-lg bg-orange-50 pt-12">
            <div className="draggable my-auto flex h-full w-full justify-center md:gap-5 lg:justify-normal xl:gap-14">
                <div className="flex w-full items-center justify-center lg:p-12">
                    <div className="flex items-center xl:p-10">
                        <Form
                            className="flex h-full w-full flex-col rounded-3xl pb-6 text-center"
                            aria-label="Login Form"
                            method="post"
                        >
                            <h3 className="text-dark-grey-900 mb-3 font-brand text-4xl font-extrabold">
                                Login
                            </h3>
                            <p className="mb-4 text-stone-500">
                                Enter your email and password
                            </p>
                            <label
                                htmlFor="email"
                                className="mb-2 text-start text-sm font-semibold text-stone-950"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="mail@loopple.com"
                                className="mb-7 mr-2 flex w-full items-center rounded-2xl bg-stone-200 px-5 py-4 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300"
                                required
                                aria-label="Email Address"
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
                                aria-label="Password"
                            />

                            <div className="mb-4 flex flex-col items-baseline justify-center gap-4 sm:flex-row sm:justify-between">
                                <label className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="h-5 w-5 rounded border-stone-500 text-orange-500 checked:bg-orange-500 focus:ring-orange-500"
                                        aria-checked="true"
                                        aria-label="Keep me logged in"
                                    />
                                    <span className="ml-3 text-sm font-normal text-stone-500">
                                        Keep me logged in
                                    </span>
                                </label>
                                <Link
                                    to="/forgetPassword"
                                    className="mr-4 text-sm font-medium text-stone-900 hover:underline focus:underline"
                                >
                                    Forget password?
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="mb-5 w-full rounded-2xl bg-orange-500 px-6 py-5 text-base font-bold leading-none text-white transition duration-300 hover:bg-orange-600 focus:ring-4 focus:ring-orange-600 md:w-96"
                                aria-label="Sign In"
                            >
                                Sign In
                            </button>
                            <p className="text-base font-normal leading-relaxed text-stone-500">
                                Not registered yet?
                                <Link
                                    to="/register"
                                    className="text-grey-700 ml-2 font-bold text-stone-900 hover:underline focus:underline"
                                >
                                    Create an Account
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
    try {
        const response = await login(data)
        console.log(response)
        if (response.data.user.role === 'worker')
            return redirect(`/worker-dashboard`)
        else return redirect(`/customer-dashboard`)
    } catch (e) {
        console.log(e)
    }
}
export default Login
