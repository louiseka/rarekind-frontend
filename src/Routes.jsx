import Root from './Components/Root/Root'
import Users from './Pages/UsersPage/UsersPage'
import AllCollections from './Pages/AllCollectionsPage/AllCollectionsPage'
import MyCollections from './Pages/MyCollectionsPage/MyCollectionsPage'
import OneOfMyCollections from './Pages/OneOfMyCollectionsPage/OneOfMyCollectionsPage'
import ProtectedRoutes from '../utils/ProtectedRoutes'
import UserCollectionsPage from './Pages/UserCollectionsPage/UserCollectionsPage'

const routes = [
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '',
                element: <AllCollections />,
            },
            {
                path: 'users',
                element: <ProtectedRoutes element={<Users />} />,
            },
            {
                path: 'allcollections',
                element: <AllCollections />,
            },
            {
                path: 'mycollections',
                element: <ProtectedRoutes element={<MyCollections />} />,
            },
            {
                path: 'mycollections/:collectionId',
                element: <ProtectedRoutes element={<OneOfMyCollections />} />,
            },
            {
                path: 'collection/:collectionId',
                element: <OneOfMyCollections />,
            },
            {
                path: '/user/:id',
                element: <UserCollectionsPage />,
            },
            {
                path: 'user/:id/collection/:collectionId',
                element: <OneOfMyCollections />,
            },
        ],
    },
]

export default routes
