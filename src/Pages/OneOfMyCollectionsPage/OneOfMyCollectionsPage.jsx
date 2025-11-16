import styles from './OneOfMyCollectionsPage.module.css'
import CollectionDetails from '../../Components/CollectionDetails/CollectionDetails'
import ItemCard from '../../Components/ItemCard/ItemCard'
import AddItems from '../../Components/AddItems/AddItems'
import ToggleButton from '../../Components/ToggleButton/ToggleButton'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchItemsByCollectionId } from '../../Slices/itemAPISlice'
import { fetchCollections } from '../../Slices/collectionAPISlice'
import Loading from '../../Components/Loading/Loading'

function OneOfMyCollectionsPage() {
    const selectedToggle = useSelector((state) => state.toggle.selectedToggle)
    const dispatch = useDispatch()
    const items = useSelector((state) => state.items.items)
    const itemsStatus = useSelector((state) => state.items.status)
    const error = useSelector((state) => state.items.error)
    const { id } = useParams()
    const status = useSelector((state) => state.collections.status)
    const collections = useSelector((state) => state.collections.items)

    console.log(id)
    console.log(collections)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCollections())
        }
    }, [dispatch, status])

    useEffect(() => {
        if (id) {
            dispatch(fetchItemsByCollectionId(id))
        }
    }, [dispatch, id])

    const collectionToShow = collections.find(
        (c) => String(c.id) === String(id)
    )
    console.log(collectionToShow)

    return (
        <>
            {!selectedToggle && (
                <section className={styles.wrapper}>
                    {status === 'loading' && <Loading />}
                    {status === 'succeeded' && (
                        <CollectionDetails
                            collectionToShow={collectionToShow}
                        />
                    )}
                </section>
            )}

            <ToggleButton />
            {itemsStatus === 'loading' && <Loading />}
            <section className={styles.itemContainer}>
                {/* <AddItems /> */}
                <div className={styles.grid}>
                    {items.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </div>
            </section>
        </>
    )
}

export default OneOfMyCollectionsPage
