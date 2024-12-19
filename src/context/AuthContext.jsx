import { createContext, useContext, useState, useEffect } from 'react'

// Create AuthContext
const AuthContext = createContext()

// Provide context to children
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token')
        if (storedToken) {
            setToken(storedToken)
            // Optionally, fetch user data here using the token if needed
            // For example, you can make an API call to get the user's data based on the token
            // setUser(fetchedUserData)
        }
    }, [])

    // Save token and user data on login
    const login = (token, userData) => {
        setToken(token)
        setUser(userData)
        sessionStorage.setItem('token', token) // Persist token in sessionStorage
    }

    // Clear data on logout
    const logout = () => {
        setToken(null)
        setUser(null)
        sessionStorage.removeItem('token') // Remove token from sessionStorage
    }

    // Check token expiration
    const isTokenExpired = () => {
        if (!token) return true

        const decodedToken = JSON.parse(atob(token.split('.')[1])) // Decode the token to check expiry
        const currentTime = Math.floor(Date.now() / 1000) // Current time in seconds
        return decodedToken.exp < currentTime // Check if the token is expired
    }

    return (
        <AuthContext.Provider
            value={{ user, token, login, logout, isTokenExpired }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext)
