import styles from './OneOfMyCollectionsPage.module.css'
import CollectionDetails from '../../Components/CollectionDetails/CollectionDetails'
import ItemCard from '../../Components/ItemCard/ItemCard'
import AddItems from '../../Components/AddItems/AddItems'
import ToggleButton from '../../Components/ToggleButton/ToggleButton'
import AddItemButton from '../../Components/AddItemButton/AddItemButton'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchItemsByCollectionId } from '../../Slices/itemAPISlice'
import { fetchCollections } from '../../Slices/collectionAPISlice'
import {
    setCollectionName,
    clearCollectionName,
} from '../../Slices/navbarSlice'
import Loading from '../../Components/Loading/Loading'

function OneOfMyCollectionsPage() {
    const [showContent, setShowContent] = useState(true)
    const dispatch = useDispatch()
    const items = useSelector((state) => state.items.items)
    const itemsStatus = useSelector((state) => state.items.status)
    const error = useSelector((state) => state.items.error)
    const { id } = useParams()
    const status = useSelector((state) => state.collections.status)
    const collections = useSelector((state) => state.collections.items)
    const collectionToShow = collections.find(
        (c) => String(c.id) === String(id)
    )

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

    useEffect(() => {
        if (collectionToShow) {
            dispatch(setCollectionName(collectionToShow.name))
        } else {
            dispatch(clearCollectionName())
        }
        return () => dispatch(clearCollectionName())
    }, [dispatch, collectionToShow])

    return (
        <>
            <section className={styles.wrapper}>
                {collectionToShow ? (
                    <>
                        <h2 className={styles.pageTitle}>
                            {collectionToShow.name}
                        </h2>
                        {showContent && (
                            <>
                                {status === 'loading' && <Loading />}
                                {status === 'succeeded' && (
                                    <CollectionDetails
                                        collectionToShow={collectionToShow}
                                    />
                                )}
                            </>
                        )}
                    </>
                ) : (
                    <Loading />
                )}
            </section>

            <ToggleButton
                showContent={showContent}
                handleToggle={() => setShowContent((prev) => !prev)}
            />
            <h3 className={styles.itemHeader}>Items</h3>

            {itemsStatus === 'loading' && <Loading />}

            {collectionToShow && (
                <section className={styles.itemContainer}>
                    {items.length <= 0 && <AddItems />}
                    {items.length > 0 && <AddItemButton />}

                    <div className={styles.grid}>
                        {items.map((item) => (
                            <ItemCard
                                key={item.id}
                                item={item}
                                collectionId={collectionToShow.id}
                                collectionUserId={collectionToShow.user_id}
                            />
                        ))}
                    </div>
                </section>
            )}
        </>
    )
}

export default OneOfMyCollectionsPage
