import styles from './Header.module.css'
import { useDispatch } from 'react-redux'
import { openPopup } from '../../Slices/popupSlice'
import DarkMode from '../DarkMode/DarkMode'
import { logout } from '../../Slices/authSlice'
import { useSelector } from 'react-redux'

function Header() {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    const user = useSelector((state) => state.auth.user)

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className={styles.wrapper}>
            <img
                src="/images/rarekindlogo.png"
                alt="RareKind Logo"
                className={styles.logo}
            />
            <div className={styles.uiSection}>
                <DarkMode />
                <div className={styles.userButtons}>
                    {isLoggedIn ? (
                        <>
                            <span className={styles.userName}>
                                 {user.name}
                            </span>
                            <button
                                className={styles.userButton}
                                onClick={handleLogout}
                            >
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                className={styles.userButton}
                                onClick={() => dispatch(openPopup('signup'))}
                            >
                                Sign up
                            </button>
                            <button
                                className={styles.userButton}
                                onClick={() => dispatch(openPopup('login'))}
                            >
                                Log in
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
