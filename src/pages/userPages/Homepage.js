import { useEffect, useState } from "react"
import { HeaderUser } from "../../components/userComponents/HeaderUser"
import { Banner } from "../../components/userComponents/banner"
import { DanhSachSanPham } from "../../components/userComponents/danh_sach_san_pham"
import { apiGetBooks } from "../../API/apiBooks"


export const Homepage = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        apiGetBooks()
            .then(res => {
                console.log(res.data)
                setData(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <>
            <HeaderUser />
            <div style={{

                width: '1400px',
                minHeight: '100vh',

                paddingTop: '70px',
                margin: '0 auto'
            }}>
                <Banner />
                <DanhSachSanPham title="Tất cả sách" data={data} />
            </div>
        </>
    )
}