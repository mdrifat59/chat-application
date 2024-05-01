import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    activeChat: null,
  },
  reducers: {
    activeChat: (state,action) => {  
      state.activeChat = action.payload
    }, 
  },
})

// Action creators are generated for each case reducer function
export const { activeChat } = chatSlice.actions

export default chatSlice.reducer