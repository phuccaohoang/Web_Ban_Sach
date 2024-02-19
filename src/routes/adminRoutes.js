import { Route, Routes, useNavigate } from "react-router-dom"
import { BooksPageAdmin } from "../pages/adminPages/BooksPageAdmin"
import { GenresPageAdmin } from "../pages/adminPages/GenresPageAdmin"
import { AuthorsPageAdmin } from "../pages/adminPages/AuthorsPageAdmin"
import { SuppliersPageAdmin } from "../pages/adminPages/SuppliersPageAdmin"
import { PurchaseInvoicesPageAdmin } from "../pages/adminPages/PurchaseInvoicesPageAdmin"
import { SalesInvoicesPageAdmin } from "../pages/adminPages/SalesInvoicesAdmin"
import { AdminsPageAdmin } from "../pages/adminPages/AdminsPageAdmin"
import { SlideshowPageAdmin } from "../pages/adminPages/SlideshowPageAdmin"
import { CouponsPageAdmin } from "../pages/adminPages/CouponsPageAdmin"
import { LoginPageAdmin } from "../pages/adminPages/LoginPageAdmin"
import { useSelector } from "react-redux"
import { useEffect } from "react"

import { Result, Button } from "antd"
import { RecoveryAdminPage } from "../pages/adminPages/RecoveryAdminPage"
import { RecoveryBookPage } from "../pages/adminPages/RecoveryBookPage"
import { EbookSalesInvoice } from "../pages/adminPages/EbookSalesInvoice"


export const RoutesAdmin = () => {

    const { isLogin } = useSelector(state => state.accountAdmin)
    const navigate = useNavigate()

    useEffect(() => {
        console.log('admin login', isLogin)
        if (isLogin) {
            navigate('/admin/sach/danh-sach-sach');
        }
    }, [isLogin])

    return (
        <>
            {
                isLogin ? <Routes>

                    <Route path="/admin/sach/danh-sach-sach" element={<BooksPageAdmin url={["sach", "danh-sach-sach"]} />} />
                    <Route path="/admin/sach/khoi-phuc-sach" element={<RecoveryBookPage url={["sach", "khoi-phuc-sach"]} />} />

                    <Route path="/admin/the-loai" element={<GenresPageAdmin url={["the-loai"]} />} />

                    <Route path="/admin/tac-gia" element={<AuthorsPageAdmin url={["tac-gia"]} />} />

                    <Route path="/admin/nha-cung-cap" element={<SuppliersPageAdmin url={["nha-cung-cap"]} />} />

                    <Route path="/admin/hoa-don-xuat/danh-sach-sach-in" element={<SalesInvoicesPageAdmin url={["hoa-don-xuat", "danh-sach-sach-in"]} />} />
                    <Route path="/admin/hoa-don-xuat/danh-sach-e-book" element={<EbookSalesInvoice url={["hoa-don-xuat", "danh-sach-e-book"]} />} />

                    <Route path="/admin/hoa-don-nhap" element={<PurchaseInvoicesPageAdmin url={["hoa-don-nhap"]} />} />

                    <Route path="/admin/quan-tri-vien/danh-sach-quan-tri-vien" element={<AdminsPageAdmin url={["quan-tri-vien", "danh-sach-quan-tri-vien"]} />} />
                    <Route path="/admin/quan-tri-vien/khoi-phuc-quan-tri-vien" element={<RecoveryAdminPage url={["quan-tri-vien", "khoi-phuc-quan-tri-vien"]} />} />

                    <Route path="/admin/phieu-giam-gia" element={<CouponsPageAdmin url={["phieu-giam-gia"]} />} />

                    <Route path="/admin/slideshow" element={<SlideshowPageAdmin url={["slideshow"]} />} />


                </Routes> : null
            }

            {
                !isLogin ? <Routes>
                    <Route path="/admin/dang-nhap" element={<LoginPageAdmin />} />

                </Routes> : null
            }

        </>
    )
}