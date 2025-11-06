import styles from "./AllCollectionsPage.module.css";
import CollectionCard from "../../Components/CollectionCard/CollectionCard";

function AllCollectionsPage() {
  return (
    <section className={styles.wrapper}>
      <p>All Collections</p>
      <div className={styles.grid}>
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
        <CollectionCard />
      </div>
    </section>
  );
}

export default AllCollectionsPage;
