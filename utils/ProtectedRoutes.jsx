import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoutes = ({ element }) => {
    const location = useLocation()
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to="/" state={{ from: location }} />
    }

    return element
}

export default ProtectedRoutes