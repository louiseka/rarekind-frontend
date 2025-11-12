import { configureStore } from '@reduxjs/toolkit'
import popupReducer from '../Components/PopUp/popupSlice'
import darkModeReducer from '../Components/DarkMode/darkModeSlice'
import collectionAPISlice from '../API/collectionAPISlice'
import itemAPISlice from '../API/itemAPISlice'
import toggleReducer from '../Slices/toggleContentSlice'

export const store = configureStore({
    reducer: {
        popup: popupReducer,
        darkmode: darkModeReducer,
    },
})
