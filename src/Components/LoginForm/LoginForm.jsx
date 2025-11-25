import styles from './LoginForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { closePopup } from '../../Slices/popupSlice'
import { useState, useEffect } from 'react'
import { login } from '../../Slices/authSlice'
import { FaX } from 'react-icons/fa6'

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
    }

    return (
        <div className={styles.wrapper}>
            <button
                onClick={() => dispatch(closePopup())}
                className={styles.close}
                aria-label="Close Login"
            >
                <FaX />
            </button>
            <h2>Log in</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Email
                    <span className={styles.requiredLabel}>(Required)</span>
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter email..."
                        className={styles.emailInput}
                        onChange={onChange}
                        value={formData.email}
                        required
                    />
                </label>
                <label className={styles.label}>
                    Password
                    <span className={styles.requiredLabel}>(Required)</span>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password..."
                        className={styles.passwordInput}
                        onChange={onChange}
                        value={formData.password}
                        required
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
