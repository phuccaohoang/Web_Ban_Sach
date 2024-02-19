import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    account_id: null,
    username: null,
    avatar: null,
    admin_id: null,
    name: null,
    address: null,
    phone: null,
    email: null,
    token: null,
    isLogin: false,
}

const accountAdminSlice = createSlice({
    name: 'accountAdmi',
    initialState,
    reducers: {

        updateAccountAdmin: (state, action) => {
            console.log('dang nhap thanh cong', action.payload)

            state.account_id = action.payload.user.account.id;
            state.username = action.payload.user.account.username;
            state.avatar = action.payload.user.account.avatar;
            state.admin_id = action.payload.user.id;
            state.name = action.payload.user.name;
            state.address = action.payload.user.address;
            state.email = action.payload.user.email;
            state.phone = action.payload.user.phone;
            state.token = action.payload.access_token;
            state.isLogin = true;
        },

        resetAccountAdmin: (state, action) => {
            console.log('dang xuat thanh cong', action.payload)

            state.account_id = null;
            state.admin_id = null;
            state.username = null;
            state.avatar = null;
            state.name = null;
            state.address = null;
            state.email = null;
            state.phone = null;
            state.token = null;
            state.isLogin = false;
        },

        updateAvatarAdmin: (state, action) => {
            console.log('cap nhat avatar', action.payload)
            state.avatar = action.payload
        },

        updateInfoAdmin: (state, action) => {
            console.log('cap nhat thong tin', action.payload)
            state.name = action.payload.name;
            state.address = action.payload.address;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
        },



    },
})

export const { updateAccountAdmin, resetAccountAdmin, updateAvatarAdmin, updateInfoAdmin } = accountAdminSlice.actions;
export default accountAdminSlice.reducer;