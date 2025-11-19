import styles from './SignupForm.module.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closePopup } from '../../Slices/popupSlice'
import { useState } from 'react'
import login from '../../Slices/authSlice'
import authService from '../../services/authService'

function SignupForm() {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.auth.status)

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
        console.log('Submitting signup with:', formData)

        try {
            await authService.register(
                formData.name,
                formData.email,
                formData.password
            )
            console.log('Registration successful, logging in...').then(
                await dispatch(
                    authService.login({
                        email: formData.email,
                        password: formData.password,
                    })
                ).unwrap()
            )

            console.log('Login successful')
            dispatch(closePopup())
        } catch (error) {
            console.error('Signup/login error:', error)
        }
    }
    console.log(formData)
    console.log(status)

    return (
        <div className={styles.wrapper}>
            <button
                onClick={() => dispatch(closePopup())}
                className={styles.close}
                aria-label="Close Login"
            >
                X
            </button>
            <h2>Sign up</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.label}>
                    Username
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter username..."
                        className={styles.nameInput}
                        value={formData.name}
                        onChange={onChange}
                    />
                </label>
                <label className={styles.label}>
                    Email
                    <input
                        type="text"
                        name="email"
                        placeholder="Enter email..."
                        className={styles.emailInput}
                        value={formData.email}
                        onChange={onChange}
                    />
                </label>
                <label className={styles.label}>
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password..."
                        className={styles.passwordInput}
                        value={formData.password}
                        onChange={onChange}
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
