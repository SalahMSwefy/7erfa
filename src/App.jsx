import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Error from './ui/Error'
import ForgotPassword from './pages/ForgetPassword'
// import ResetPassword from './pages/ResetPassword'
import WorkerDashboard from './pages/WorkerDashboard'
import CustomerDashboard from './pages/CustomerDashboard'
import PrivateRoute from './context/PrivateRoute'

const isAuthenticated = () => {
    // Replace this with your actual authentication logic
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
    },
    {
        path: '/customer-dashboard',
        element: <CustomerDashboard />,
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
