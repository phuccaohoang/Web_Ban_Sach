import { Layout, Menu, Breadcrumb } from 'antd';
const { Sider } = Layout;
import "./SiderAdmin.css";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


export const SiderAdmin = () => {

    const navigate = useNavigate();
    const addressPage = useSelector(state => state.addressPage)

    const siderStyle = {
        lineHeight: '120px',
        borderRight: 'solid 1px #4096ff',

    };


    return (
        <>
            <Sider width="300px" style={siderStyle} className='sider_admin'>
                <Menu
                    className='noi_dung_sider'
                    mode="inline"
                    theme='light'

                    defaultSelectedKeys={addressPage.url.length > 1 ? [addressPage.url[1]] : [addressPage.url[0]]}
                    defaultOpenKeys={[addressPage.url[0]]}
                    onSelect={(value) => {
                        let url = "/admin";

                        value.keyPath.reverse().forEach((item) => {
                            url = url + "/" + item;
                        })
                        navigate(url)
                    }}

                    style={{
                        height: '100%',
                        borderRight: 0,
                        fontSize: "19px",
                        fontWeight: '400',

                    }}
                    items={[
                        {
                            key: "sach",
                            icon: null,
                            label: <div>Quan ly sach</div>,
                            children: [
                                {
                                    key: "danh-sach-sach",
                                    label: <div style={{ fontSize: "17px" }}>Danh sach</div>,

                                },
                                {
                                    key: "khoi-phuc-sach",
                                    label: <div style={{ fontSize: "17px" }}>Khoi phuc</div>,

                                },
                            ],

                        },
                        {
                            key: "the-loai",
                            icon: null,

                            label: <div>Quan ly the loai</div>,


                        },
                        {
                            key: "tac-gia",
                            icon: null,
                            label: <div>Quan ly tac gia</div>,

                        },
                        {
                            key: "nha-cung-cap",
                            icon: null,
                            label: <div>Quan ly nha cung cap</div>,

                        },
                        {
                            key: "hoa-don-xuat",
                            icon: null,
                            label: <div>Quan ly hoa don xuat</div>,
                            children: [
                                {
                                    key: "danh-sach-sach-in",
                                    label: <div style={{ fontSize: "17px" }}>Sach in</div>,

                                },
                                {
                                    key: "danh-sach-e-book",
                                    label: <div style={{ fontSize: "17px" }}>E-Book</div>,

                                },
                            ],
                        },
                        {
                            key: "hoa-don-nhap",
                            icon: null,
                            label: <div>Quan ly hoa don nhap</div>,


                        },
                        {
                            key: "quan-tri-vien",
                            icon: null,
                            label: <div>Quan ly quan tri vien</div>,
                            children: [
                                {
                                    key: "danh-sach-quan-tri-vien",
                                    label: <div style={{ fontSize: "17px" }}>Danh sach</div>,

                                },
                                {
                                    key: "khoi-phuc-quan-tri-vien",
                                    label: <div style={{ fontSize: "17px" }}>Khoi phuc</div>,

                                },
                            ],
                        },
                        {
                            key: "phieu-giam-gia",
                            icon: null,
                            label: <div>Quan ly phieu giam gia</div>,

                        },
                        {
                            key: "slideshow",
                            icon: null,
                            label: <div>Quan ly slideshow</div>,

                        },
                    ]}
                />

            </Sider>

            <div className='breadcrumd_admin'>
                <Breadcrumb
                    items={addressPage.breadcrumb}
                />
            </div>
        </>
    )
}