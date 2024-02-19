import { Button, Form, Input, Select, Row } from "antd"
import TextArea from "antd/es/input/TextArea"
import { useDispatch, useSelector } from "react-redux"
import { HeaderUser } from "../../components/userComponents/HeaderUser"
import { useEffect, useState } from "react";
import { apiGetCoupons } from "../../API/apiCoupons";
import { apiAddSalesInvoice } from "../../API/apiSalesInvoice";
import { updateCartsCustomer } from "../../redux/slices/accountCustomerSlice";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export const TrangThanhToan = () => {
    const [DSgiamGiaHD, setDsGiamGiaHD] = useState([])
    const [DSgiamGiaVC, setDsGiamGiaVC] = useState([])

    const [thanhTien, setThanhTien] = useState(0)
    const [giam_gia_hd, setGiamGiaHD] = useState(0)
    const [giam_gia_van_chuyen, setGiamGiaVC] = useState(0)

    const customer = useSelector(state => state.accountCustomer)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    let tong_hoa_don = customer.carts.reduce((tong, item) => {
        return tong + (item.book.price * (1 - (item.book.discount / 100))) * item.quantity
    }, 0)

    useEffect(() => {
        apiGetCoupons(customer.token)
            .then(res => {
                if (res.data.success) {
                    console.log(res.data)

                    let phieuGiamVanChuyen = []
                    let phieuGiamHoaDon = []

                    res.data.data.forEach(item => {
                        if (item.type_coupon_id === 1) {
                            phieuGiamVanChuyen = phieuGiamVanChuyen.concat(item)
                        } else {
                            phieuGiamHoaDon = phieuGiamHoaDon.concat(item)

                        }
                    });

                    setDsGiamGiaHD(phieuGiamHoaDon)
                    setDsGiamGiaVC(phieuGiamVanChuyen)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return <>
        <HeaderUser />
        <div style={{

            width: '1400px',
            minHeight: '100vh',
            paddingTop: '70px',
            margin: '0 auto',
        }}>


            <div className="thanh_toan_gio_hang" style={{
                marginTop: '20px',
                display: 'flex'
            }}>
                <div className="tt_khach_hang" style={{
                    flexShrink: 0,
                    width: '800px'
                }}>
                    <h2>Thông Tin Giao Hàng</h2>
                    <Form onFinish={value => {
                        let data = {
                            ...value,
                            carts: customer.carts,
                            customer_id: customer.customer_id
                        }
                        console.log(data)

                        apiAddSalesInvoice(customer.token, data)
                            .then(res => {
                                if (res.data.success) {
                                    console.log(res.data)
                                    dispatch(updateCartsCustomer([]))
                                    navigate('/')

                                } else {
                                    console.log(res.data.msg)
                                }
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }}
                        style={{ marginTop: '10px' }}
                        labelCol={{
                            flex: '150px',
                        }}
                        labelAlign="left"
                        labelWrap
                        wrapperCol={{
                            flex: 1
                        }}
                    >
                        <Form.Item
                            label='Tên khách hàng'

                        >
                            <Input readOnly value={customer.name} />
                        </Form.Item>
                        <Form.Item
                            style={{ marginTop: '30px' }}
                            label='Số điện thoại'
                            name='phone'
                            initialValue={customer.phone}
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống'
                                },
                                {
                                    min: 10,
                                    message: 'Nhập dúng cú pháp'
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            style={{ marginTop: '30px' }}
                            label='Địa chỉ'
                            name="address"
                            initialValue={customer.address}
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống'
                                }

                            ]}
                        >
                            <TextArea rows={4} />
                        </Form.Item>

                        <Form.Item
                            style={{ marginTop: '30px' }}
                            initialValue={50000}
                            label='Phương thức vận chuyển'
                            name='shippingCost'
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống'
                                }
                            ]}
                        >
                            <Select>
                                <Option value={50000}>Trả tiền khi nhận hàng</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            style={{ marginTop: '30px' }}
                            initialValue={0}
                            label='Phiếu giảm giá hóa đơn'
                            name='discount_invoice'
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống'
                                }
                            ]}
                        >


                            <Select onChange={(value) => {
                                console.log(value)

                                if (value === 0) {
                                    setGiamGiaHD(0)
                                    return
                                }

                                DSgiamGiaHD.forEach(item => {
                                    if (item.id === value) {
                                        setGiamGiaHD(item.discount)
                                        return
                                    }
                                })
                            }}>
                                <Option value={0}>Không sử dụng</Option>
                                {
                                    DSgiamGiaHD.map(item => {

                                        if (tong_hoa_don >= item.min) {

                                            return <Option value={item.id}>{item.note}</Option>
                                        }
                                    })
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item
                            style={{ marginTop: '30px' }}
                            initialValue={0}
                            label='Phiếu giảm giá vận chuyển'
                            name='discount_shipping'
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống'
                                }
                            ]}
                        >
                            <Select onChange={(value) => {
                                console.log(value)
                                if (value === 0) {
                                    setGiamGiaVC(0)
                                    return
                                }

                                DSgiamGiaVC.forEach(item => {
                                    if (item.id === value) {
                                        setGiamGiaVC(item.discount)
                                        return
                                    }
                                })
                            }}>
                                <Option value={0}>Không sử dụng</Option>

                                {
                                    DSgiamGiaVC.map(item => {
                                        if (tong_hoa_don >= item.min) {

                                            return <Option value={item.id}>{item.note}</Option>
                                        }

                                    })
                                }
                            </Select>
                        </Form.Item>


                        <Row>
                            <Button style={{
                                width: '100%',
                                height: 'auto',
                                padding: '10px',
                                fontSize: '20px',

                            }} htmlType="submit">Xác nhận mua hàng</Button>
                        </Row>
                    </Form>
                </div>

                <div className="danh_sach_sach" style={{ marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                    <h2>Danh Sách Sản Phẩm {`(${customer.carts.length} sách)`}</h2>
                    <div style={{ maxHeight: '500px', overflow: 'auto' }}>
                        {
                            customer.carts.map(item => {
                                return <>
                                    <div style={{
                                        display: 'flex',
                                        marginTop: '10px',
                                        height: '120px',
                                    }}>

                                        <img src={`http://localhost:8000/${item.book.image_theme}`} style={{ height: '100%', aspectRatio: '3 / 4', objectFit: 'cover' }} />
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: '10px',
                                            justifyContent: 'space-between'
                                        }}>
                                            <strong>Sách: {item.book.name}</strong>
                                            <span>Giá: {item.book.price} vnd</span>
                                            <mark style={{ width: '120px' }}>Giảm giá: {item.book.discount}%</mark>
                                            <span>Số lượng: {item.quantity} sách</span>
                                        </div>

                                    </div>
                                </>
                            })
                        }
                    </div>
                    <Row style={{ margin: '20px', fontSize: '18px' }}>
                        <div>
                            <p>Tổng hóa đơn: {tong_hoa_don} vnd</p>
                            <p>Giảm hóa đơn: {tong_hoa_don * (giam_gia_hd / 100)} vnd</p>
                            <p>Phí vận chuyển: {50000} vnd</p>
                            <p>Giảm vận chuyển: {50000 * (giam_gia_van_chuyen / 100)} vnd</p>
                            <p style={{ borderTop: 'solid 1px black', margin: '10px 0' }}
                            >
                                Thành tiền: {tong_hoa_don * (1 - (giam_gia_hd / 100)) + 50000 * (1 - (giam_gia_van_chuyen / 100))} vnd
                            </p>
                        </div>

                    </Row>
                </div>
            </div>


        </div >
    </>
}