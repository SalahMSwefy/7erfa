import { Form, Link, useNavigate } from 'react-router-dom'
import { login } from '../services/apis'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext' // Import AuthContext
import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'

const Login = () => {
    const { login: loginContext } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState({})
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem('theme') === 'dark' || false,
    )

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }, [darkMode])

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('user'))
        if (token && user) {
            if (user.role === 'worker') {
                navigate('/worker-dashboard', { replace: true })
            } else {
                navigate('/customer-dashboard', { replace: true })
            }
        }
    }, [navigate])

    const mutation = useMutation({
        mutationFn: async (formData) => {
            return await login(formData)
        },
        onSuccess: (data) => {
            if (data?.error) {
                setError({ general: data.error })
            } else {
                const {
                    token,
                    data: { user },
                } = data
                loginContext(token, user)

                // Navigate based on role
                if (user.role === 'worker') navigate('/worker-dashboard')
                else navigate('/customer-dashboard')
            }
        },
        onError: (error) => {
            const backendErrors = error.response?.data?.errors || {}
            const generalError =
                error.response?.data?.message || // Backend error message
                error.message || // Network or general error message
                'Something went wrong. Please try again.' // Default fallback

            setError({
                ...backendErrors,
                general: generalError, // Ensure it's always a string
            })
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData)
        mutation.mutate(data)
        setError({})
    }

    return (
        <div className="flex min-h-screen w-full flex-col items-center gap-20 bg-white dark:bg-gray-800 lg:gap-40">
            <div className="flex h-16 w-full items-center justify-between border-b p-2 shadow-sm dark:border-gray-600">
                <button
                    className="flex items-center gap-2.5 font-brand text-3xl text-black no-underline transition-colors duration-200 hover:text-main-600 dark:text-white dark:hover:text-main-600"
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    <img
                        src="/logos/logo.gif"
                        alt="Logo"
                        className="h-12 w-12 rounded-full object-cover object-center"
                    />
                    <span>7erfa</span>
                </button>
                <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 shadow-lg hover:text-stone-700 dark:hover:text-white"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                </motion.button>
            </div>
            <Form
                className="inset-0 flex flex-col rounded-3xl bg-white p-8 text-center shadow-xl dark:bg-gray-800 md:w-[450px]"
                aria-label="Login Form"
                method="post"
                onSubmit={handleSubmit}
            >
                <h3 className="text-dark-grey-900 mb-3 font-brand text-4xl font-extrabold dark:text-stone-100">
                    Login
                </h3>
                <p className="mb-4 text-stone-500 dark:text-stone-300">
                    Enter your email and password
                </p>
                <label
                    htmlFor="email"
                    className="mb-2 text-start text-sm font-semibold text-stone-900 dark:text-stone-100"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    className="mb-6 flex w-full items-center rounded-2xl bg-stone-200 px-5 py-4 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 dark:bg-gray-700 dark:text-stone-100"
                    required
                    aria-label="Email Address"
                />
                <label
                    htmlFor="password"
                    className="mb-2 text-start text-sm font-semibold text-stone-900 dark:text-stone-100"
                >
                    Password
                </label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter a Password"
                    className="mb-6 flex w-full items-center rounded-2xl bg-stone-200 px-5 py-4 text-sm font-medium text-stone-900 outline-none placeholder:text-stone-400 focus:bg-stone-300 dark:bg-gray-700 dark:text-stone-100"
                    required
                    aria-label="Password"
                />
                {error.general && (
                    <span className="-mt-4 mb-4 text-center text-base text-red-500">
                        {typeof error.general === 'string'
                            ? error.general
                            : 'Invalid email or password, please try again.'}
                    </span>
                )}

                <div className="flex flex-row items-center justify-between gap-4">
                    <label className="flex items-center justify-between gap-2">
                        <input
                            type="checkbox"
                            className="h-5 w-5 rounded border-stone-500 text-main-500 checked:bg-main-500 focus:ring-main-500"
                            aria-checked="true"
                            aria-label="Keep me logged in"
                        />
                        <span className="text-xs font-medium text-stone-500 dark:text-stone-300">
                            Keep me logged in
                        </span>
                    </label>
                    <Link
                        to="/forgetPassword"
                        className="text-sm font-medium text-stone-900 hover:underline focus:underline dark:text-stone-100"
                    >
                        Forget password?
                    </Link>
                </div>
                <div className="my-4 flex justify-center">
                    <button
                        type="submit"
                        className="w-2/3 rounded-2xl bg-main-600 px-5 py-4 text-base font-bold leading-none text-white transition duration-300 hover:bg-main-500 focus:ring-4 focus:ring-main-500"
                        aria-label="Sign In"
                    >
                        Sign In
                    </button>
                </div>
                <p className="text-base font-normal leading-relaxed text-stone-500 dark:text-stone-300">
                    Not registered yet?
                    <Link
                        to="/register"
                        className="text-grey-700 ml-2 font-bold text-stone-900 hover:underline focus:underline dark:text-stone-100"
                    >
                        Create an Account
                    </Link>
                </p>
            </Form>
        </div>
    )
}

export default Login
