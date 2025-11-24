import styles from './UserCollectionsPage.module.css'
import CollectionCard from '../../Components/CollectionCard/CollectionCard'
import CollectionSearch from '../../Components/CollectionSearch/CollectionSearch'
import CollectionFilter from '../../Components/CollectionFilter/CollectionFilter'
import Loading from '../../Components/Loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchCollections } from '../../Slices/collectionAPISlice'
import { useSearch } from '../../Components/CollectionSearch/SearchContext'
import { useSort } from '../../Components/CollectionFilter/SortContext'
import AddCollectionButton from '../../Components/AddCollectionButton/AddCollectionButton'
import AddCollections from '../../Components/AddCollections/AddCollections.jsx'
import { useParams } from 'react-router'
import {
    sortCollections,
    searchCollectionsByQuery,
} from '../../utils/collections'

export default function UserCollectionsPage() {
    const dispatch = useDispatch()
    const collections = useSelector((state) => state.collections.items)
    const status = useSelector((state) => state.collections.status)
    const error = useSelector((state) => state.collections.error)
    const { query } = useSearch()
    const { sortOrder } = useSort()
    const user = useSelector((state) => state.auth.user)?.id
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
