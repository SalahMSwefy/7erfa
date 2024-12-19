import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { useEffect, useState } from 'react'

// Make sure you're using this format when rendering children
const ProtectedRoute = ({ children }) => {
    const { token, isTokenExpired } = useAuth()
    const [isAuthenticated, setIsAuthenticated] = useState(null) // State initialized as null

    useEffect(() => {
        if (token && !isTokenExpired()) {
            setIsAuthenticated(true)
        } else {
            setIsAuthenticated(false)
        }
    }, [token, isTokenExpired])

    if (isAuthenticated === null) {
        return <div>Loading...</div> // Show a loading message while determining authentication
    }

    if (!isAuthenticated) {
        alert('You must be logged in to access this page')
        return <Navigate to="/login" replace />
    }

    return children // Return the protected component if authenticated
}

export default ProtectedRoute
