import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import makeApiRequest from '../services/apiService'
import mockItems from '../data/mockItems'
import { showToast } from './toastSlice'

export const fetchItemsByCollectionId = createAsyncThunk(
    'items/fetchItemsByCollectionId',
    async (collectionId, { dispatch }) => {
        try {
            const data = await makeApiRequest(
                `collections/${collectionId}/animals`
            )

            let items = []
            if (Array.isArray(data.animals)) {
                items = data.animals
            }
            return { items, isDemo: false }
        } catch (error) {
            console.error(
                'Live API is unavailable, showing demo data:',
                error.message
            )
            dispatch(
                showToast(
                    'Showing demo data — live backend is currently unavailable.'
                )
            )

            const items = mockItems[collectionId] || []
            return { items, isDemo: true }
        }
    }
)

const itemsAPISlice = createSlice({
    name: 'items',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItemsByCollectionId.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchItemsByCollectionId.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload.items
                state.isDemo = action.payload.isDemo
            })
            .addCase(fetchItemsByCollectionId.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export default itemsAPISlice.reducer
