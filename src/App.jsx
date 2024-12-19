import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Error from './ui/Error'
import ForgotPassword from './pages/ForgetPassword'
// import ResetPassword from './pages/ResetPassword'
import WorkerDashboard from './pages/WorkerDashboard'
import CustomerDashboard from './pages/CustomerDashboard'
import ProtectedRoute from './context/ProtectedRoute'

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
            <ProtectedRoute>
                <WorkerDashboard />,
            </ProtectedRoute>
        ),
    },
    {
        path: '/customer-dashboard',
        element: (
            <ProtectedRoute>
                <CustomerDashboard />,
            </ProtectedRoute>
        ),
    },
])

function App() {
    return <RouterProvider router={router} />
}

export default App

// {
//     element: <AppLayout />,
//     errorElement: <Error />,
//     children: [
//         {
//             path: "/",
//             element: <Home />,
//         },
//         {
//             path: "/menu",
//             element: <Menu />,
//             loader: menuLoader,
//             errorElement: <Error />,
//         },
//         {
//             path: "/cart",
//             element: <Cart />,
//         },
//         {
//             path: "/order/new",
//             element: <CreateOrder />,
//             action: createOrderAction,
//         },
//         {
//             path: "/order/:orderId",
//             element: <Order />,
//             loader: orderLoader,
//             errorElement: <Error />,
//         },
//     ],
// },
