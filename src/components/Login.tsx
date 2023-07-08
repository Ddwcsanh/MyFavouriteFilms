import { useEffect } from 'react'
import GoogleButton from 'react-google-button'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '~/contexts/AuthContext'

const Login = () => {
  const { login, user } = UserAuth()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    try {
      await login()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user != null) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <div>
      <GoogleButton onClick={handleGoogleSignIn} />
    </div>
  )
}

export default Login
