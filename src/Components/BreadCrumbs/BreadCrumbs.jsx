import { NavLink, useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaAngleRight } from 'react-icons/fa6'
import styles from './BreadCrumbs.module.css'

export default function BreadCrumbs() {
    const { id, collectionId } = useParams()
    const collectionName = useSelector((state) => state.navbar.collectionName)
    const users = useSelector((state) => state.users.items)
    const user = users.find((user) => user.id === parseInt(id))
    const location = useLocation()

    if (!id && !collectionId) return null
    const isFromMyCollections = location.pathname.startsWith('/mycollections')
    const isFromUsers = location.pathname.startsWith('/user')
    return (
        <nav>
            <ul className={styles.breadcrumbs}>
                <NavLink
                    to={
                        isFromMyCollections
                            ? '/mycollections'
                            : isFromUsers
                            ? '/users'
                            : '/'
                    }
                    className={`${styles.breadcrumbLink} ${styles.inactiveLink}`}
                >
                    {isFromMyCollections
                        ? 'My Collections'
                        : isFromUsers
                        ? 'Users'
                        : 'All Collections'}
                </NavLink>

                {id && user && (
                    <li>
                        <NavLink
                            className={`${styles.breadcrumbLink} ${styles.activeLink}`}
                            to={`/user/${id}`}
                        >
                            <FaAngleRight className={styles.icon} /> {user.name}
                        </NavLink>
                    </li>
                )}

                {collectionId && (
                    <li>
                        <NavLink
                            className={`${styles.breadcrumbLink} ${styles.activeLink}`}
                            to={`/collection/${collectionId}`}
                        >
                            <FaAngleRight className={styles.icon} />{' '}
                            {collectionName}
                        </NavLink>
                    </li>
                )}
            </ul>
        </nav>
    )
}
