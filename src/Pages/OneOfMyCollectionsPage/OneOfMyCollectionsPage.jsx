import styles from './OneOfMyCollectionsPage.module.css'
import CollectionDetails from '../../Components/CollectionDetails/CollectionDetails'
import ItemCard from '../../Components/ItemCard/ItemCard'
import AddItems from '../../Components/AddItems/AddItems'
import ToggleButton from '../../Components/ToggleButton/ToggleButton'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchItemsByCollectionId } from '../../Slices/itemAPISlice'
import { fetchCollections } from '../../Slices/collectionAPISlice'
import {
    setCollectionName,
    clearCollectionName,
} from '../../Slices/navbarSlice'
import {
    fetchClassifications,
    selectClassificationNameMap,
} from '../../Slices/classificationAPISlice'
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
    const classificationNameMap = useSelector(selectClassificationNameMap)
    const classificationStatus = useSelector(
        (state) => state.classifications.status
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

    useEffect(() => {
        if (classificationStatus === 'idle') {
            dispatch(fetchClassifications())
        }
    }, [dispatch, classificationStatus])

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
                                        classificationNameMap={
                                            classificationNameMap
                                        }
                                        items={items}
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
            {itemsStatus === 'loading' && <Loading />}
            <section className={styles.itemContainer}>
                {items.length <= 0 && <AddItems />}
                <div className={styles.grid}>
                    {items.map((item) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            classificationName={classificationNameMap.get(
                                String(item.classification_id)
                            )}
                        />
                    ))}
                </div>
            </section>
        </>
    )
}

export default OneOfMyCollectionsPage
