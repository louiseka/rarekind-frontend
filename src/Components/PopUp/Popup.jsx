import React from 'react'
import styles from './Popup.module.css'
import { useSelector, useDispatch } from 'react-redux'
import LoginForm from '../LoginForm/LoginForm.jsx'
import SignupForm from '../SignupForm/SignupForm.jsx'

function PopupRoot() {
    const selectedPopup = useSelector((state) => state.popup.selectedPopup)

    if (!selectedPopup) return null

    let content = null
    if (selectedPopup === 'login') {
        return (
            <div className={styles.backdrop}>
                <LoginForm />
            </div>
        )
    }

    if (selectedPopup === 'signup') {
        return (
            <div className={styles.backdrop}>
                <SignupForm />
            </div>
        )
    }

    if (!content) return null
}

export default PopupRoot
