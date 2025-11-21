import { configureStore } from '@reduxjs/toolkit'
import popupReducer from '../Slices/popupSlice'
import darkModeReducer from '../Slices/darkModeSlice'
import collectionReducer from '../Slices/collectionAPISlice'
import authReducer from '../Slices/authSlice'
import toastReducer from '../Slices/toastSlice'
import itemsReducer from '../Slices/itemAPISlice'
import navbarReducer from '../Slices/navbarSlice'
import classificationReducer from '../Slices/classificationAPISlice'
import addItemReducer from '../Slices/addItemAPISlice'
import deleteItemReducer from '../Slices/deleteItemAPISlice'

export const store = configureStore({
    reducer: {
        popup: popupReducer,
        darkmode: darkModeReducer,
        collections: collectionReducer,
        items: itemsReducer,
        auth: authReducer,
        toast: toastReducer,
        navbar: navbarReducer,
        classifications: classificationReducer,
        addItem: addItemReducer,
        deleteItem: deleteItemReducer,
    },
})
