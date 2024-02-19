import './HeaderUser.css'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { Input, Dropdown, Button, Badge, Modal } from 'antd';
const { Search } = Input;
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { DangNhap } from './dang_nhap';
import { DangKy } from './dang_ky';
import { resetAccountCustomer } from '../../redux/slices/accountCustomerSlice';
import { apiLogout } from '../../API/apiAccounts';
import { useNavigate } from 'react-router-dom';


export const HeaderUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [showLogin, setShowLogin] = useState(true)
    const customer = useSelector(state => state.accountCustomer)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    return (
        <>
            <div className='header_user'>
                <div className="logo_header" onClick={() => {
                    navigate('/')
                }}>
                    <img src="/logo_admin/logo.png" />
                </div>

                <div className="thanh_tim_kiem">
                    <Search
                        size='large'
                        placeholder="input search text"
                        allowClear
                        onSearch={value => {
                            console.log('tim kiem', value)
                        }}
                        style={{
                            width: "100%",

                        }}
                    />
                </div>

                <div className="thong_tin_khach_hang">
                    <Badge
                        count={customer.isLogin ? customer.carts.length : 0}
                        overflowCount={10}
                        style={{ marginRight: '50px' }}>
                        <ShoppingCartOutlined className='gio_hang' style={{ marginRight: '50px' }} onClick={() => {
                            if (customer.isLogin) {
                                navigate('/gio-hang')
                            }
                        }} />
                    </Badge>
                    {
                        customer.isLogin ? <>
                            <Dropdown

                                menu={{
                                    items: [
                                        {
                                            key: 1,
                                            label: <>
                                                <div style={{ fontSize: '18px' }}>
                                                    Thông tin tài khoản
                                                </div>
                                            </>
                                        },
                                        {
                                            key: 2,
                                            label: <>
                                                <div style={{ fontSize: '18px' }}>
                                                    Danh sách yêu thích
                                                </div>
                                            </>
                                        },
                                        {
                                            key: 3,
                                            label: <>
                                                <div style={{ fontSize: '18px' }} onClick={() => {
                                                    apiLogout(customer.token)
                                                        .then(response => {
                                                            console.log('Đăng xuất thành công!');
                                                            return;
                                                        })
                                                        .catch(error => {
                                                            console.log(error)
                                                            if (error.response.status != undefined && error.response.status === 401) {
                                                                console.log("Phiên đã hết vui lòng đăng nhập lại!")
                                                                return;
                                                            }
                                                            console.log('error', error)
                                                        })

                                                    dispatch(resetAccountCustomer());
                                                    navigate('/')

                                                }}>
                                                    Đăng xuất
                                                </div>
                                            </>
                                        }
                                    ]
                                }}
                                placement="bottom"
                            >
                                <img src={`http://localhost:8000/images/avatar/${customer.avatar !== null ? customer.avatar : 'chua_co_avatar.jpg'}`} />
                            </Dropdown>
                        </> : <>
                            <img src='/chua_dang_nhap.jpg' onClick={showModal} />

                        </>
                    }


                </div>
            </div>
            <Modal open={isModalOpen} footer={false} onCancel={handleCancel}>
                {showLogin ? <DangNhap setShowLogin={setShowLogin} handleCancel={handleCancel} /> : <DangKy setShowLogin={setShowLogin} />}
            </Modal >
        </>
    )
}