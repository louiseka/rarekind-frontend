import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import makeApiRequest from '../services/apiService'
import mockCollections from '../data/mockCollections'
import { showToast } from './toastSlice'

export const fetchCollections = createAsyncThunk(
    'collections/fetchCollections',
    async (_, { dispatch }) => {
        try {
            const data = await makeApiRequest('collections')
            return { data, isDemo: false }
        } catch (error) {
            console.error(
                'Live API unavailable, showing demo data:',
                error.message
            )
            dispatch(
                showToast(
                    'Showing demo data - live backend is currently unavailable.'
                )
            )
            return { data: mockCollections, isDemo: true }
        }
    }
)

const collectionAPISlice = createSlice({
    name: 'collections',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCollections.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchCollections.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload.data
                state.isDemo = action.payload.isDemo
            })
            .addCase(fetchCollections.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export default collectionAPISlice.reducer
