import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
export const AuthenticationContainer = ({children}) => {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token_user')) {
            localStorage.clear()
            navigate('/login')
        }
    }, [])

    return children
}