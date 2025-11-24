import styles from './Root.module.css'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import SiteNav from '../SiteNav/SiteNav'
import MainContent from '../MainContent/MainContent'
import Toast from '../Toast/Toast'
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs'
import { Outlet } from 'react-router'

function Root() {
    return (
        <div className={styles.wrapper}>
            <Header />
            <SiteNav />
            <BreadCrumbs />
            <MainContent />
            <Footer />
            <Toast />
        </div>
    )
}

export default Root
