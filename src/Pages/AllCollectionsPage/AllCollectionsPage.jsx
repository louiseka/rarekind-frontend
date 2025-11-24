import styles from './AllCollectionsPage.module.css'
import CollectionCard from '../../Components/CollectionCard/CollectionCard'
import CollectionSearch from '../../Components/CollectionSearch/CollectionSearch'
import CollectionFilter from '../../Components/CollectionFilter/CollectionFilter'
import Loading from '../../Components/Loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchCollections } from '../../Slices/collectionAPISlice'
import { fetchUsers } from '../../Slices/usersAPISlice'
import { useSearch } from '../../Components/CollectionSearch/SearchContext'
import { useSort } from '../../Components/CollectionFilter/SortContext'
import {
    sortCollections,
    searchCollectionsByQuery,
} from '../../utils/collections'

export default function AllCollectionsPage() {
    const dispatch = useDispatch()
    const collections = useSelector((state) => state.collections.items)
    const status = useSelector((state) => state.collections.status)
    const error = useSelector((state) => state.collections.error)
    const usersStatus = useSelector((state) => state.users.status)
    const items = useSelector((state) => state.items.items)
    const { query } = useSearch()
    const { sortOrder } = useSort()

    const searchedCollections = searchCollectionsByQuery(collections, query)
    const showSearchResults = query.trim().length > 0

    const baseList = searchedCollections

    // Sort-Filter functionality
    const displayedCollections = sortCollections(baseList, sortOrder)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCollections())
        }
    }, [dispatch, status])

     useEffect(() => {
        if (usersStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, [dispatch, usersStatus])

    return (
        <section className={styles.wrapper}>
            <div className={styles.inputContainer}>
                <CollectionSearch />
                <CollectionFilter />
            </div>
            {status === 'loading' && <Loading />}
            {showSearchResults && searchedCollections.length === 0 && (
                <p className={styles.resultsMessage}>
                    Oops! No collections found for that name.
                </p>
            )}
            <div className={styles.grid}>
                {displayedCollections.map((collection) => (
                    <CollectionCard
                        key={collection.id}
                        collection={collection}
                        items={items}
                    />
                ))}
            </div>
        </section>
    )
}
