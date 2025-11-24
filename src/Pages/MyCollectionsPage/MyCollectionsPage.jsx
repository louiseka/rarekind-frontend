import styles from './MyCollectionsPage.module.css'
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
import {
    sortCollections,
    searchCollectionsByQuery,
} from '../../utils/collections'

export default function MyCollectionsPage() {
    const dispatch = useDispatch()
    const collections = useSelector((state) => state.collections.items)
    const status = useSelector((state) => state.collections.status)
    const error = useSelector((state) => state.collections.error)
    const { query } = useSearch()
    const { sortOrder } = useSort()
    const user = useSelector((state) => state.auth.user)?.id

    // Filter to only logged in users collections

    const userCollections = collections.filter((c) => c.user_id === user)

    // Search Input functionality

    const searchedCollections = searchCollectionsByQuery(userCollections, query)
    const showSearchResults = query.trim().length > 0

    const baseList = searchedCollections

    // Sort-Filter functionality
    const displayedCollections = sortCollections(baseList, sortOrder)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCollections())
        }
    }, [dispatch, status])

    return (
        <section className={styles.wrapper}>
            {user && userCollections.length === 0?  (
                <>
                <AddCollections/> 
                <AddCollectionButton />
                </>
            ) :
            (<div className={styles.inputContainer}>
                <CollectionSearch />
                <CollectionFilter />
            </div>)}
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
                    />
                ))}
            </div>
        </section>
    )
}
