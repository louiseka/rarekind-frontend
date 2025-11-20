import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import makeApiRequest from '../services/apiService'

export const fetchClassifications = createAsyncThunk(
    'classifications/fetchClassifications',
    async () => {
        const data = await makeApiRequest('classifications')
        return data
    }
)

export const selectClassificationNameMap = createSelector(
    (state) => state.classifications.items,
    (items) => {
        const map = new Map()
        items.forEach((c) => map.set(String(c.id), c.name))
        return map
    }
)

const classificationAPISlice = createSlice({
    name: 'classifications',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchClassifications.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchClassifications.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchClassifications.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },
})

export default classificationAPISlice.reducer
