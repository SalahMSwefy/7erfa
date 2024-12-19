import { useAuth } from '../context/AuthContext'

function WorkerDashboard() {
    const { logout, user } = useAuth()
    return (
        <div>
            hi, {user?.name}
            <button onClick={logout} className="mx-5 bg-stone-600 p-4">
                logout
            </button>
        </div>
    )
}

export default WorkerDashboard
