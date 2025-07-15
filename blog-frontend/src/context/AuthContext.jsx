import { createContext, useState,useEffect, use } from 'react'
const AuthContext = createContext()

function AuthProvider ({ children }) {

const [isAuthenticated, setIsAuthenticated] = useState(false) 
const [userpayload, setUserPayload] = useState(null)
const login = (data) => {
    localStorage.setItem('UserData', JSON.stringify(data))
    setIsAuthenticated(true)
    setUserPayload(data)

    const logout = () => {
      localStorage.removeItem('UserData')
      setIsAuthenticated(false)
      setUserPayload(null)

      useEffect(() => {
        const storedData = localStorage.getItem('UserData')
        if (userData) {
          const userData = JSON.parse(storedData)
          setIsAuthenticated(true)
          setUserPayload(userData)
        }
      }, [])
    }
  }
  const data = {
    isAuthenticated,
    userpayload,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
