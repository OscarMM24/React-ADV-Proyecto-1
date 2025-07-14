import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { loginSchema } from '../../schemas/Login'
import { toast, ToastContainer } from 'react-toastify'
import './login.css'
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
      // Simular petición de login
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Datos de login:', data)

      // Mostrar mensaje de éxito
      toast.success('¡Inicio de sesión exitoso!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      })

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
