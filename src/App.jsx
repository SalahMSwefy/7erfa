import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import PrivateRoute from './context/PrivateRoute'
import { Suspense, lazy } from 'react'
import FullScreenLoader from './ui/FullScreenLoader'

// Lazy-loaded pages
const LandingPage = lazy(() => import('./pages/LandingPage'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Error = lazy(() => import('./ui/Error'))
const ForgotPassword = lazy(() => import('./pages/ForgetPassword'))

// Lazy-loaded main dashboard pages
const WorkerDashboard = lazy(() => import('./pages/WorkerDashboard'))
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard'))

// Lazy-loaded worker components
const WorkerDashboardPage = lazy(
    () => import('./components/Worker/DashboardPage'),
)
const TestimonialPage = lazy(
    () => import('./components/Worker/TestimonialPage'),
)
const WorkerProfilePage = lazy(() => import('./components/Worker/ProfilePage'))
const WorkerOrdersPage = lazy(() => import('./components/Worker/OrdersPage'))

// Lazy-loaded customer components
const CustomerDashboardPage = lazy(
    () => import('./components/Customer/DashboardPage'),
)
const CustomerOrders = lazy(
    () => import('./components/Customer/CustomerOrders'),
)
const CustomerProfilePage = lazy(
    () => import('./components/Customer/ProfilePage'),
)
const SearchWorkersPage = lazy(
    () => import('./components/Customer/SearchWorkersPage'),
)
const WorkerPage = lazy(() => import('./components/Customer/WorkerPage'))

const isAuthenticated = () => {
    return Boolean(localStorage.getItem('token'))
}

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Suspense fallback={<FullScreenLoader />}>
                <LandingPage />
            </Suspense>
        ),
    },
    {
        path: '/login',
        element: (
            <Suspense fallback={<FullScreenLoader />}>
                <Login />
            </Suspense>
        ),
        errorElement: (
            <Suspense fallback={<FullScreenLoader />}>
                <Error />
            </Suspense>
        ),
    },
    {
        path: '/register',
        element: (
            <Suspense fallback={<FullScreenLoader />}>
                <Register />
            </Suspense>
        ),
        errorElement: (
            <Suspense fallback={<FullScreenLoader />}>
                <Error />
            </Suspense>
        ),
    },
    {
        path: '/forgetPassword',
        element: (
            <Suspense fallback={<FullScreenLoader />}>
                <ForgotPassword />
            </Suspense>
        ),
        errorElement: (
            <Suspense fallback={<FullScreenLoader />}>
                <Error />
            </Suspense>
        ),
    },
    {
        path: '/worker-dashboard',
        element: (
            <PrivateRoute isAuthenticated={isAuthenticated()}>
                <Suspense fallback={<FullScreenLoader />}>
                    <WorkerDashboard />
                </Suspense>
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<FullScreenLoader />}>
                        <WorkerDashboardPage />
                    </Suspense>
                ),
            },
            {
                path: 'orders',
                element: (
                    <Suspense fallback={<FullScreenLoader />}>
                        <WorkerOrdersPage />
                    </Suspense>
                ),
            },
            {
                path: 'profile',
                element: (
                    <Suspense fallback={<FullScreenLoader />}>
                        <WorkerProfilePage />
                    </Suspense>
                ),
            },
            {
                path: 'reviews',
                element: (
                    <Suspense fallback={<FullScreenLoader />}>
                        <TestimonialPage />
                    </Suspense>
                ),
            },
            {
                path: '*',
                element: (
                    <Suspense fallback={<FullScreenLoader />}>
                        <WorkerDashboardPage />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: '/customer-dashboard',
        element: (
            <PrivateRoute isAuthenticated={isAuthenticated()}>
                <Suspense fallback={<FullScreenLoader />}>
                    <CustomerDashboard />
                </Suspense>
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<FullScreenLoader />}>
                        <CustomerDashboardPage />
                    </Suspense>
                ),
            },
            {
                path: 'orders',
                element: (
                    <Suspense fallback={<FullScreenLoader />}>
                        <CustomerOrders />
                    </Suspense>
                ),
            },
            {
                path: 'profile',
                element: (
                    <Suspense fallback={<FullScreenLoader />}>
                        <CustomerProfilePage />
                    </Suspense>
                ),
            },
            {
                path: 'search',
                element: (
                    <Suspense fallback={<FullScreenLoader />}>
                        <SearchWorkersPage />
                    </Suspense>
                ),
            },
            {
                path: 'worker/:workerId',
                element: (
                    <Suspense fallback={<FullScreenLoader />}>
                        <WorkerPage />
                    </Suspense>
                ),
            },
        ],
    },
])

function App() {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    )
}

export default App
