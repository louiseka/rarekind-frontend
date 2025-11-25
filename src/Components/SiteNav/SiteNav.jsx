import { NavLink, useLocation } from 'react-router-dom'
import styles from './SiteNav.module.css'
import { useDispatch } from 'react-redux'
import { openPopup } from '../../Slices/popupSlice'
import { useSelector } from 'react-redux'
import { FaPlus } from 'react-icons/fa6'

function SiteNav() {
    const dispatch = useDispatch()
    const location = useLocation()
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    const isAllCollections =
        location.pathname === '/' || location.pathname.startsWith('/collection')

    const navLinks = [
        { label: 'All collections', url: '/' },
        ...(isLoggedIn
            ? [{ label: 'My collections', url: '/mycollections' }]
            : []),
        ...(isLoggedIn ? [{ label: 'Users', url: '/users' }] : []),
    ]

    return (
        <div className={styles.wrapper}>
            <nav className={styles.links}>
                {navLinks.map((navLink) => (
                    <NavLink
                        key={navLink.url}
                        to={navLink.url}
                        className={
                            navLink.url === '/'
                                ? isAllCollections
                                    ? styles.activeLink
                                    : styles.inactiveLink
                                : location.pathname.startsWith(navLink.url)
                                ? styles.activeLink
                                : styles.inactiveLink
                        }
                    >
                        {navLink.label}
                    </NavLink>
                ))}
            </nav>
            {(location.pathname === '/allcollections' ||
                location.pathname === '/mycollections') && (
                <button
                    className={styles.newCollectionButton}
                    onClick={() => dispatch(openPopup('newcollection'))}
                >
                    <FaPlus /> NEW COLLECTION
                </button>
            )}
        </div>
    )
}

export default SiteNav
