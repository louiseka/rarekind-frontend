import styles from './AllCollectionsPage.module.css'
import CollectionCard from '../../Components/CollectionCard/CollectionCard'
import CollectionSearch from '../../Components/CollectionSearch/CollectionSearch'
import CollectionFilter from '../../Components/CollectionFilter/CollectionFilter'
import Loading from '../../Components/Loading/Loading'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchCollections } from '../../Slices/collectionAPISlice'
import { useSearch } from '../../Components/CollectionSearch/SearchContext'

function AllCollectionsPage() {
    const dispatch = useDispatch()
    const collections = useSelector((state) => state.collections.items)
    const status = useSelector((state) => state.collections.status)
    const error = useSelector((state) => state.collections.error)
    const { query } = useSearch()

    const searchResult = collections.filter((collection) =>
        collection.name.toLowerCase().includes(query.toLowerCase())
    )

    const showSearchResults = query.trim().length > 0

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCollections())
        }
    }, [dispatch, status])

    return (
        <section className={styles.wrapper}>
            <div className={styles.inputContainer}>
                <CollectionSearch />
                <CollectionFilter />
            </div>
            {status === 'loading' && <Loading />}
            {searchResult.length === 0 && (
                <p className={styles.resultsMessage}>
                    Oops! No collections found for that name.
                </p>
            )}
            <div className={styles.grid}>
                {(showSearchResults ? searchResult : collections).map(
                    (collection) => (
                        <CollectionCard
                            key={collection.id}
                            collection={collection}
                        />
                    )
                )}
            </div>
        </section>
    )
}

export default AllCollectionsPage
