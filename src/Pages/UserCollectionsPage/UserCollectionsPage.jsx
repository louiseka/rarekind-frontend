import styles from './UserCollectionsPage.module.css'
import CollectionCard from '../../Components/CollectionCard/CollectionCard'
import Loading from '../../Components/Loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchCollections } from '../../Slices/collectionAPISlice'
import { useParams } from 'react-router'


export default function UserCollectionsPage() {
    const dispatch = useDispatch()
    const collections = useSelector((state) => state.collections.items)
    const status = useSelector((state) => state.collections.status)
    const error = useSelector((state) => state.collections.error)
    const { id } = useParams()
    const userCollections = collections.filter(
        (c) => String(c.user_id) === String(id)
    )

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCollections())
        }
    }, [dispatch, status])

    return (
        <section className={styles.wrapper}>
            {status === 'loading' && <Loading />}
            {userCollections.length === 0 && <p>No collections found.</p>}
            <div className={styles.grid}>
                {userCollections.map((collection) => (
                    <CollectionCard
                        key={collection.id}
                        collection={collection}
                    />
                ))}
            </div>
        </section>
    )
}
