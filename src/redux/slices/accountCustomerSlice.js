import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    customer_id: null,
    account_id: null,
    username: null,
    avatar: null,
    name: null,
    address: null,
    phone: null,
    email: null,
    carts: [],
    payments: [],
    token: null,
    isLogin: false,
}

const accountCustomerSlice = createSlice({
    name: 'accountCustomer',
    initialState,
    reducers: {
        updateAccountCustomer: (state, action) => {
            console.log('dang nhap')

            state.customer_id = action.payload.user.id
            state.account_id = action.payload.user.account_id
            state.username = action.payload.user.account.username
            state.avatar = action.payload.user.account.avatar
            state.name = action.payload.user.name
            state.address = action.payload.user.address
            state.phone = action.payload.user.phone
            state.email = action.payload.user.email
            state.carts = action.payload.user.carts
            state.token = action.payload.access_token
            state.isLogin = true
        },

        resetAccountCustomer: (state) => {
            console.log('dang xuat')

            state.customer_id = null
            state.account_id = null
            state.username = null
            state.avatar = null
            state.address = null
            state.phone = null
            state.email = null
            state.name = null
            state.carts = []
            state.token = null
            state.isLogin = false
        },

        updateCartsCustomer: (state, action) => {
            console.log('cap nhat gio hang')
            state.carts = action.payload;
        }
    }
})

export const { updateAccountCustomer, resetAccountCustomer, updateCartsCustomer } = accountCustomerSlice.actions;

export default accountCustomerSlice.reducer;