import styles from './LoginForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { closePopup } from '../../Slices/popupSlice'
import { useState, useEffect } from 'react'
import { login } from '../../Slices/authSlice'

function LoginForm() {
    const dispatch = useDispatch()
    const { status, error } = useSelector((state) => state.auth)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [errorMessage, setErrorMessage] = useState('')
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        if (error) {
            setErrorMessage('Incorrect email or password')
        }
    }, [error])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(login(formData))
            dispatch(closePopup())
        } catch (err) {
            console.error('Login failed:', err)
        }
        console.log('Status:', status)
    }

    return (
        <div className={styles.wrapper}>
            <button
                onClick={() => dispatch(closePopup())}
                className={styles.close}
                aria-label="Close Login"
            >
                X
            </button>
            <h2>Log in</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Email
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter email..."
                        className={styles.emailInput}
                        onChange={onChange}
                        value={formData.email}
                    />
                </label>
                <label className={styles.label}>
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password..."
                        className={styles.passwordInput}
                        onChange={onChange}
                        value={formData.password}
                    />
                </label>
                <button type="submit" className={styles.button}>
                    {status === 'loading' ? 'LOGGING IN...' : 'LOG IN'}
                </button>
            </form>
        </div>
    )
}

export default LoginForm
