import { Route, Routes, useNavigate } from "react-router-dom"
import { Homepage } from "../pages/userPages/Homepage"
import { useSelector } from "react-redux"
import { TrangGioHang } from "../pages/userPages/TrangGioHang"
import { TrangThanhToan } from "../pages/userPages/TrangThanhToan"

export const RoutesUser = () => {
    const { isLogin } = useSelector(state => state.accountCustomer)
    return <Routes>
        <Route path="/" element={<Homepage />} />
        {
            isLogin ? <>
                <Route path="/gio-hang" element={<TrangGioHang />} />
                <Route path="/thanh-toan" element={<TrangThanhToan />} />
            </> : null
        }
    </Routes>
}