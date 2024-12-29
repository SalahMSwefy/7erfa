import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
///////////////////////
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Error from './ui/Error'
import ForgotPassword from './pages/ForgetPassword'
// import ResetPassword from './pages/ResetPassword'
///////////////////////////////
import WorkerDashboard from './pages/WorkerDashboard'
import CustomerDashboard from './pages/CustomerDashboard'
import PrivateRoute from './context/PrivateRoute'
// worker pages
import WorkerDashboardPage from './components/Worker/DashboardPage'
import TestimonialPage from './components/Worker/TestimonialPage'
import WorkerProfilePage from './components/Worker/ProfilePage'
import WorkerOrdersPage from './components/Worker/OrdersPage'
// customer pages
import CustomerDashboardPage from './components/Customer/DashboardPage'
import CustomerOrders from './components/Customer/CustomerOrders'
import CustomerProfilePage from './components/Customer/ProfilePage'
import SearchWorkersPage from './components/Customer/SearchWorkersPage'
import WorkerPage from './components/Worker/WorkerPage'

const isAuthenticated = () => {
    return Boolean(localStorage.getItem('token'))
}

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/login',
        element: <Login />,
        errorElement: <Error />,
    },
    {
        path: '/register',
        element: <Register />,
        errorElement: <Error />,
    },
    {
        path: '/forgetPassword',
        element: <ForgotPassword />,
        errorElement: <Error />,
    },
    // {
    //     path: '/resetPassword',
    //     element: <ResetPassword />,
    //     errorElement: <Error />,
    // },
    {
        path: '/worker-dashboard',
        element: (
            <PrivateRoute isAuthenticated={isAuthenticated()}>
                <WorkerDashboard />
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
                <CustomerDashboard />
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
