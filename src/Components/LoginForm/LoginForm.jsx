import styles from './LoginForm.module.css'
import { useDispatch, useSelector  } from 'react-redux'
import { closePopup } from '../../Slices/popupSlice'
import { useState } from 'react'

function LoginForm() {
    const dispatch = useDispatch()
    const { status, error } = useSelector((state) => state.auth)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addItem({ collectionId: id, updatedData: formData }))
            .then(() => {
                dispatch(fetchItemsByCollectionId(id))
                dispatch(closePopup())
            })
            .catch((error) => console.error('Error logging in', error))
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
            <form className={styles.form}>
                <label className={styles.label}>
                    Email
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter email..."
                        className={styles.emailInput}
                        onChange={handleChange}
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
                        onChange={handleChange}
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
