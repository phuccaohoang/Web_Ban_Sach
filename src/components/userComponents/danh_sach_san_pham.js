import './danh_sach_san_pham.css'
import { TheSanPham } from './the_san_pham'

export const DanhSachSanPham = (props) => {
    return <>

        <div className='noi_dung_trang_chu'>
            <h2>{props.title}</h2>

            <div className='danh_sach_san_pham'>
                {
                    props.data.map(item => {
                        return <>
                            <div className='the_san_pham'>
                                <TheSanPham data={item} />
                            </div>
                        </>
                    })
                }

            </div>
        </div>

    </>
}