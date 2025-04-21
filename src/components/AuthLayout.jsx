import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function Protected({ children, authentication = true }) {
  let authStatus = useSelector((state) => state.auth.status)
  let navigate = useNavigate()
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login")
    } else if (!authentication && authStatus !== authentication) {
      navigate("/")
    }
    setLoading(false)
  }, [authStatus, authentication, navigate])

  return loading ? null : <>{children}</>
}

export default Protected