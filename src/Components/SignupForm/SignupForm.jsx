import styles from './SignupForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { closePopup } from '../../Slices/popupSlice'
import { useState } from 'react'
import authService from '../../services/authService'
import { login } from '../../Slices/authSlice'
import { FaX } from 'react-icons/fa6'

function SignupForm() {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.auth.status)
    const [errorMessage, setErrorMessage] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')
        try {
            await authService.register(
                formData.name,
                formData.email,
                formData.password
            )
            await dispatch(
                login({
                    email: formData.email,
                    password: formData.password,
                })
            ).unwrap()
            dispatch(closePopup())
        } catch (error) {
            console.error('Signup/login error:', error)
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
            <h2>Sign up</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Username
                    <span className={styles.requiredLabel}>(Required)</span>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter username..."
                        className={styles.nameInput}
                        value={formData.name}
                        onChange={onChange}
                        required
                    />
                </label>
                <label className={styles.label}>
                    Email
                    <span className={styles.requiredLabel}>(Required)</span>
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter email..."
                        className={styles.emailInput}
                        value={formData.email}
                        onChange={onChange}
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
                        value={formData.password}
                        onChange={onChange}
                        required
                    />
                </label>
                <button type="submit" className={styles.button}>
                    {status === 'loading' ? 'SIGNING UP...' : 'SIGN UP'}
                </button>
            </form>
        </div>
    )
}

export default SignupForm
