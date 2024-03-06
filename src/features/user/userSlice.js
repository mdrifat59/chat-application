import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loginuser: null,
  },
  reducers: {
    userdata: (state,action) => {  
      state.loginuser = action.payload
    }, 
  },
})

// Action creators are generated for each case reducer function
export const { userdata } = userSlice.actions

export default userSlice.reducer