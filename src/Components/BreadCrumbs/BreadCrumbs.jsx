import { NavLink, useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { FaAngleRight } from 'react-icons/fa6'
import styles from './BreadCrumbs.module.css'

export default function BreadCrumbs() {
    const { id } = useParams()
    const collectionName = useSelector((state) => state.navbar.collectionName)
    const location = useLocation()

    if (!id) return null
    const isFromMyCollections = location.pathname.startsWith('/mycollections')
    return (
        <nav>
            <ul className={styles.breadcrumbs}>
                <NavLink
                    to={isFromMyCollections ? '/mycollections' : '/'}
                    className={`${styles.breadcrumbLink} ${styles.inactiveLink}`}
                >
                    {isFromMyCollections ? 'My Collections' : 'All Collections'}
                </NavLink>

                {id && (
                    <li>
                        <NavLink
                            className={`${styles.breadcrumbLink} ${styles.activeLink}`}
                            to={`/collection/${id}`}
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
