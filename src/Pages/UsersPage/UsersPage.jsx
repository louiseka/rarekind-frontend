import styles from './UsersPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUsers } from '../../Slices/usersAPISlice'
import { fetchCollections } from '../../Slices/collectionAPISlice'
import Loading from '../../Components/Loading/Loading'
import UserCard from '../../Components/UserCard/UserCard'
import { useSearch } from '../../Components/CollectionSearch/SearchContext'
import { searchUsersByQuery } from '../../utils/collections'
import UserSearch from '../../Components/UserSearch/UserSearch'

function UsersPage() {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users.items)
    const error = useSelector((state) => state.users.error)
    const status = useSelector((state) => state.users.status)
    const { query } = useSearch()
    const showSearchResults = query.trim().length > 0
    const searchedUsers = searchUsersByQuery(users, query)
    const displayedUsers = searchedUsers

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
                <div className={styles.inputContainer}>
                    <UserSearch />
                </div>
                {status === 'loading' && <Loading />}
                {showSearchResults && searchedUsers.length === 0 && (
                    <p className={styles.resultsMessage}>
                        Oops! No users found for that name.
                    </p>
                )}
                {status === 'loading' && <Loading />}
                <div className={styles.grid}>
                    {displayedUsers.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default UsersPage
