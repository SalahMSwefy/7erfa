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

// worker components
import WorkerDashboardPage from './components/Worker/DashboardPage'
import TestimonialPage from './components/Worker/TestimonialPage'
import WorkerProfilePage from './components/Worker/ProfilePage'
import WorkerOrdersPage from './components/Worker/OrdersPage'
// customer components
import CustomerDashboardPage from './components/Customer/DashboardPage'
import CustomerOrders from './components/Customer/CustomerOrders'
import CustomerProfilePage from './components/Customer/ProfilePage'
import SearchWorkersPage from './components/Customer/SearchWorkersPage'
import WorkerPage from './components/Customer/WorkerPage'

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
                element: <WorkerDashboardPage />,
            },
            {
                path: 'orders',
                element: <WorkerOrdersPage />,
            },
            {
                path: 'profile',
                element: <WorkerProfilePage />,
            },
            {
                path: 'reviews',
                element: <TestimonialPage />,
            },
            {
                path: '*',
                element: <WorkerDashboardPage />,
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
                element: <CustomerDashboardPage />,
            },
            {
                path: 'orders',
                element: <CustomerOrders />,
            },
            {
                path: 'profile',
                element: <CustomerProfilePage />,
            },
            {
                path: 'search',
                element: <SearchWorkersPage />,
            },
            {
                path: 'worker/:workerId',
                element: <WorkerPage />,
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
