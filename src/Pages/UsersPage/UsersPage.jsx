import styles from './UsersPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUsers } from '../../Slices/usersAPISlice'
import { fetchCollections } from '../../Slices/collectionAPISlice'
import Loading from '../../Components/Loading/Loading'
import UserCard from '../../Components/UserCard/UserCard'

function UsersPage() {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users.items)
    const error = useSelector((state) => state.users.error)
    const status = useSelector((state) => state.users.status)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsers())
        }
        if (status === 'idle') {
            dispatch(fetchCollections())
        }
    }, [dispatch, status])

    return (
        <>
            <section className={styles.wrapper}>
                {status === 'loading' && <Loading />}
                <div className={styles.grid}>
                    {users.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default UsersPage
