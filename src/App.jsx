import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import Login, { action as LoginAction } from './pages/Login'
import Register, { action as registerAction } from './pages/Register'
import Error from './ui/Error'
import ForgotPassword from './pages/ForgetPassword'
import ResetPassword from './pages/ResetPassword'

const router = createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />,
    },
    {
        path: '/login',
        element: <Login />,
        action: LoginAction,
        errorElement: <Error />,
    },
    {
        path: '/register',
        element: <Register />,
        action: registerAction,
        errorElement: <Error />,
    },
    {
        path: '/forgetPassword',
        element: <ForgotPassword />,
        errorElement: <Error />,
    },
    {
        path: '/resetPassword',
        element: <ResetPassword />,
        errorElement: <Error />,
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
