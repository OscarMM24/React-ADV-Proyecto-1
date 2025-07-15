import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../schemas/Login'
import { toast, ToastContainer } from 'react-toastify'
import { useAuthContext } from '../../hooks/useAuth'
import './login.css'
import { Navigate } from 'react-router-dom'
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    try {
      console.log('Datos de login:', data)

      const users = await fetch('https://jsonplaceholder.typicode.com/users')
      const usersData = await users.json()
      const user = usersData.find(user => user.email === data.email)
      if (!user) {
        throw new Error('Usuario no encontrado')
      }

      login(user) // Llama a la función de login del contexto

      // Mostrar mensaje de éxito
      toast.success('¡Inicio de sesión exitoso!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
setTimeout(() => {
  Navigate('Newpost/'
    user.id); // Redirige al usuario a la página de NewPost después de iniciar sesión
  Navigate('/'); // Redirige al usuario a la página principal después de iniciar sesión
  Navigate('/NewPost', 
  ); // Redirige al usuario a la página principal después de iniciar sesión
}, timeout);
      // Aquí iría la lógica de autenticación
      // Ejemplo: await authService.login(data.email, data.password)
    } catch (error) {
      console.error('Error en el login:', error)
      toast.error(error.message || 'Error al iniciar sesión', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })
    }
  }

  return (
    <div className='login-container'>
      <div className='login-header'>
        <h1>Iniciar Sesión</h1>
        <p>Ingresa tus credenciales para acceder a tu cuenta</p>
      </div>

      <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
        <div className='form-group'>
          <label htmlFor='email' className='form-label'>
            Correo Electrónico *
          </label>
          <input
            type='email'
            id='email'
            className={`form-input ${errors.email ? 'error' : ''}`}
            placeholder='tu@email.com'
            {...register('email')}
          />
          {errors.email && (
            <span className='error-message'>{errors.email.message}</span>
          )}
        </div>

        <div className='form-group'>
          <label htmlFor='password' className='form-label'>
            Contraseña *
          </label>
          <input
            type='password'
            id='password'
            className={`form-input ${errors.password ? 'error' : ''}`}
            placeholder='••••••••'
            {...register('password')}
          />
          {errors.password && (
            <span className='error-message'>{errors.password.message}</span>
          )}
        </div>

        <div className='form-options'>
          <label className='remember-me'>
            <input type='checkbox' {...register('remember')} />
            <span>Recordar mi cuenta</span>
          </label>
          <a href='/forgot-password' className='forgot-password'>
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <div className='form-actions'>
          <button
            type='submit'
            className='btn btn-primary'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </div>

        <div className='register-link'>
          ¿No tienes una cuenta? <a href='/register'>Regístrate aquí</a>
        </div>
      </form>

      <ToastContainer />
    </div>
  )
}

export default Login
