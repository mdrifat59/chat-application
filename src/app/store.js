import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice' 
import activeChatReducer from '../features/user/activechat/activeChatSlice'

export default configureStore({
  reducer: {
    loggedUser: userReducer,
    activeChat: activeChatReducer,
  },
})