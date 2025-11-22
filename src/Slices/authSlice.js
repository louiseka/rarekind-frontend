import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../services/authService'

export const login = createAsyncThunk(
    'auth/login',
    async ({ email, password }) => {
        const user = await authService.login(email, password)
        sessionStorage.setItem('user', JSON.stringify(user))
        return user 
    }
)

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
    sessionStorage.removeItem('accessToken') 
    sessionStorage.removeItem('user')
})

const initialState = {
    isLoggedIn: authService.isLoggedIn(),
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    status: 'idle',
    error: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.user = action.payload
                state.isLoggedIn = true
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                sessionStorage.removeItem('user')
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false
                state.status = 'idle'
                state.user = null 
                sessionStorage.removeItem('user')
            })
    },
})

export default authSlice.reducer
