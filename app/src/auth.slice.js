import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { avatar_url,name } = action.payload
            state.user = {avatar_url,name}
        }
    },
})

export const { setUser } = authSlice.actions
export default authSlice.reducer