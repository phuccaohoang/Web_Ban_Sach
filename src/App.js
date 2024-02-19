import { useSelector } from "react-redux"
import { RoutesAdmin } from "./routes/adminRoutes"
import { RoutesUser } from "./routes/userRoutes"

export const App = () => {

    const admin = useSelector(state => state.accountAdmin)
    const customer = useSelector(state => state.accountCustomer)


    return (
        <>
            {customer.isLogin ? null : <RoutesAdmin />}
            {admin.isLogin ? null : <RoutesUser />}
        </>
    )

}