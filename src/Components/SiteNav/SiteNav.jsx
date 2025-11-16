import { NavLink, useLocation } from 'react-router-dom'
import styles from './SiteNav.module.css'
import { useDispatch } from 'react-redux'
import { openPopup } from '../../Slices/popupSlice'
import { useSelector } from 'react-redux'

function SiteNav() {
    const dispatch = useDispatch()
    const location = useLocation()
    const collectionName = useSelector((state) => state.navbar.collectionName)

    const navLinks = [
        // { label: 'Dashboard', url: '/' },
        { label: 'All collections', url: '/allcollections' },
        { label: 'My collections', url: '/mycollections' },
        { label: 'Users', url: '/users' },
       // { label: 'One of my collections', url: '/oneofmycollections' },
    ]

    return (
        <div className={styles.wrapper}>
            <nav className={styles.links}>
                {navLinks.map((navLink) => (
                    <NavLink
                        key={navLink.url}
                        to={navLink.url}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                        }
                    >
                        {navLink.label}
                    </NavLink>
                ))}
                {collectionName && (
                    <NavLink
                        to={location.pathname}
                        key={location.pathname}
                        className={({ isActive }) =>
                            isActive ? styles.activeLink : styles.inactiveLink
                        }
                    >
                        {collectionName}
                    </NavLink>
                )}
            </nav>
            {(location.pathname === '/allcollections' ||
                location.pathname === '/mycollections') && (
                <button
                    className={styles.newCollectionButton}
                    onClick={() => dispatch(openPopup('newcollection'))}
                >
                    + NEW COLLECTION
                </button>
            )}
        </div>
    )
}

export default SiteNav
