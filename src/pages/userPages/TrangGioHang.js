import { useDispatch, useSelector } from "react-redux";
import { HeaderUser } from "../../components/userComponents/HeaderUser"
import { Button, Table, Modal, Input, InputNumber } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { apiDelCart, apiEditQuantityCart, apiGetCartsById } from "../../API/apiCustomer";
import { updateCartsCustomer } from "../../redux/slices/accountCustomerSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const TrangGioHang = () => {

    const customer = useSelector(state => state.accountCustomer)
    const dispatch = useDispatch()

    const navigate = useNavigate()


    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [IdCartItem, setIdCartItem] = useState(null);
    const [tonKho, setTonKho] = useState(0);
    const [tieude, setTieuDe] = useState(null);
    const [soLuong, setSoLuong] = useState(1);



    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'img',
            key: 'img',
            width: 100,
        },
        {
            title: 'Name',
            width: 200,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            //sorter: (a, b) => a.name - b.name,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            width: 150,
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            key: 'discount',
            width: 150,
        },
        {
            title: 'Chức năng',
            key: 'actions',
            dataIndex: 'actions',
            fixed: 'right',
            width: 100,

        },
    ];
    return <>
        <HeaderUser />
        <div style={{

            width: '1400px',
            minHeight: '100vh',
            paddingTop: '70px',
            margin: '0 auto',
        }}>
            <h2 style={{
                margin: '20px 0'
            }}>Giỏ Hàng</h2>
            <Table
                columns={columns}
                dataSource={customer.carts.map(item => {
                    return {
                        img: <img style={{ width: '100%', aspectRatio: '3 / 4', objectFit: 'cover' }} src={`http://localhost:8000/${item.book.image_theme}`} />,
                        name: item.book.name,
                        quantity: item.quantity > item.book.quantity ? item.book.quantity : item.quantity,
                        price: item.book.price,
                        discount: item.book.discount,
                        actions: <div>
                            <Button danger style={{ color: 'red' }} onClick={() => {
                                console.log('id', item.id)
                                apiDelCart(customer.token, { id: item.id })
                                    .then(res => {
                                        if (res.data.success) {

                                            apiGetCartsById(customer.token, customer.customer_id)
                                                .then(res => {
                                                    if (res.data.success) {
                                                        console.log(res.data.data)
                                                        dispatch(updateCartsCustomer(res.data.data))
                                                    } else {
                                                        console.log(res.data.msg)
                                                    }
                                                })
                                                .catch(err => {
                                                    console.log(err)
                                                })

                                        } else {
                                            console.log(res.data.msg)
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })
                            }}>

                                <DeleteOutlined />
                            </Button>
                            &nbsp;&nbsp;
                            <Button type="dashed" onClick={() => {
                                if (item.book.quantity < 1) {
                                    console.log('het hàng')
                                    return
                                }
                                setIdCartItem(item.id)
                                setTieuDe("Chỉnh sửa số lượng " + item.book.name)
                                setTonKho(item.book.quantity)
                                setSoLuong(item.quantity)
                                showModal();
                            }}>
                                Chỉnh sửa
                            </Button>
                        </div>
                    }
                })}
                bordered
                scroll={{
                    x: 1500,
                    y: 700,
                }}
                pagination={
                    {
                        defaultCurrent: 1,
                        defaultPageSize: 10,
                        // showSizeChanger: false,
                    }
                }
            />
            <div>
                <Button disabled={customer.carts.length > 0 ? false : true} style={{ width: '100%', marginTop: '20px' }} type="primary" onClick={() => {

                    navigate('/thanh-toan')
                }}>Thanh toán</Button>
            </div>
        </div >

        <Modal title={tieude} open={isModalOpen} onCancel={handleCancel} footer={false}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>Tồn kho: {tonKho}</strong>
                <InputNumber value={soLuong} min={1} max={tonKho} onChange={value => {
                    setSoLuong(value)
                }} />
                <Button onClick={() => {
                    console.log(
                        {
                            id: IdCartItem,
                            quantity: soLuong
                        }
                    )
                    apiEditQuantityCart(customer.token, {
                        id: IdCartItem,
                        quantity: soLuong
                    })
                        .then(res => {
                            if (res.data.success) {

                                apiGetCartsById(customer.token, customer.customer_id)
                                    .then(res => {
                                        if (res.data.success) {
                                            console.log(res.data.data)
                                            dispatch(updateCartsCustomer(res.data.data))
                                            handleCancel()
                                        } else {
                                            console.log(res.data.msg)
                                        }
                                    })
                                    .catch(err => {
                                        console.log(err)
                                    })

                            } else {
                                console.log(res.data.msg)
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }}>Cập nhật</Button>
            </div>
        </Modal>
    </>
}