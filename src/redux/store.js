import { configureStore } from '@reduxjs/toolkit'
import addressPageSlice from './slices/addressPageSlice';
import accountAdminSlice from './slices/accountAdminSlice';
import refeshSlice from './slices/refeshSlice';
import accountCustomerSlice from './slices/accountCustomerSlice';

export const store = configureStore({
    reducer: {
        addressPage: addressPageSlice,
        accountAdmin: accountAdminSlice,
        refesh: refeshSlice,
        accountCustomer: accountCustomerSlice,
    },
})