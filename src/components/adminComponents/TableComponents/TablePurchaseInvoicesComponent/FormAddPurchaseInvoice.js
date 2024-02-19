import { Col, Form, Input, Row, Select, Button, InputNumber, Table } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateRefesh } from '../../../../redux/slices/refeshSlice';

import { apiAdminGetBooks } from '../../../../API/apiBooks';
import { apiAdminGetSuppliers } from '../../../../API/apiSuppliers';
import { apiAddPurchaseInvoice } from '../../../../API/apiPurchaseInvoice';
const { Option } = Select;

export const FormAddPurchaseInvoice = () => {
    const [data, setData] = useState([])

    const [books, setBooks] = useState([])
    const [suppliers, setSuppliers] = useState([])

    const [nameBook, setNameBook] = useState(null)
    const [supplier_id, setSupplier_id] = useState(null)

    const { admin_id, token } = useSelector(state => state.accountAdmin);
    const dispatch = useDispatch();

    useEffect(() => {
        apiAdminGetBooks(token, 'sach_in')
            .then(response => {
                //console.log('book', response.data)
                setBooks(response.data.data)
            })
            .catch(err => {
                console.log('err books', err)
            })

        apiAdminGetSuppliers(token)
            .then(response => {
                //console.log('sler', response.data)
                setSuppliers(response.data.data)
            })
            .catch(err => {
                console.log('err sler', err)
            })
    }, [])

    return (
        <>
            <Form layout="vertical"
                onFinish={(value) => {
                    console.log('value', value)


                    let temp = -1;
                    data.forEach((item, idx) => {
                        if (item.book_id === value.book_id) {
                            console.log(item, value)
                            temp = idx
                            return
                        }
                    })

                    setData(
                        temp !== -1 ? data.map((item, idx) => {
                            if (idx === temp) {
                                item.quantity = value.quantity
                                item.price = value.price
                                item.cost = value.cost
                            }
                            return item
                        }) : data.concat({
                            ...value,
                            name: nameBook
                        })
                    )

                    // temp !== -1 ? setData(data.map((item, idx) => {
                    //     if (idx === temp) {
                    //         item.quantity = value.quantity
                    //     }
                    //     return item
                    // }))
                    //     : setData(data.concat({
                    //         ...value,
                    //         name: nameBook
                    //     }))


                }}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item

                            label="Nhà cung cấp"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn nhà cung cấp..." onChange={(id) => {
                                setSupplier_id(id)
                            }}>
                                {
                                    suppliers.map(item => {
                                        return (
                                            <Option value={item.id}>{item.name}</Option>
                                        )
                                    })
                                }

                            </Select>
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={16} className='edit_size_number_admin'>
                    <Col span={12}>
                        <Form.Item
                            name="book_id"
                            label="Sách"
                            rules={[
                                {
                                    required: true,
                                    message: "Khong dc de trong"
                                }
                            ]}
                        >
                            <Select placeholder="Chọn sách..." onChange={(id, { children }) => setNameBook(children)}>
                                {
                                    books.map(item => {
                                        return (
                                            <Option value={item.id}>{item.name}</Option>
                                        )
                                    })
                                }

                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="quantity"
                            label="Số lượng"
                            rules={[
                                {
                                    required: true,
                                    message: "Khong dc de trong"
                                }
                            ]}

                        >
                            <InputNumber min={1} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16} className='edit_size_number_admin'>
                    <Col span={12}>
                        <Form.Item
                            name="cost"
                            label="Giá mua"
                            rules={[
                                {
                                    required: true,
                                    message: "Khong dc de trong"
                                }
                            ]}
                        >
                            <InputNumber addonAfter="VND" min={0} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="price"
                            label="Giá bán"
                            rules={[
                                {
                                    required: true,
                                    message: "Khong dc de trong"
                                }
                            ]}

                        >
                            <InputNumber addonAfter="VND" min={10000} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Button
                            type='primary' htmlType='submit'
                            style={{
                                fontSize: 16,
                                width: 'auto',
                                height: 'auto',
                                margin: '15px 0'
                            }}
                        >
                            Thêm
                        </Button>
                    </Col>
                </Row>
            </Form>


            <Form layout="vertical" >

                <Row gutter={16} className='edit_size_number_admin'>
                    <Col span={24}>
                        <Table
                            columns={[
                                {
                                    title: 'Tên sách',
                                    width: 30,
                                    dataIndex: 'name',
                                    key: 'name',
                                    fixed: 'left',
                                },
                                {
                                    title: 'Số lượng',
                                    width: 30,
                                    dataIndex: 'quantity',
                                    key: 'quantity',

                                },
                                {
                                    title: 'Giá mua',
                                    width: 30,
                                    dataIndex: 'cost',
                                    key: 'cost',

                                },
                                {
                                    title: 'Giá bán',
                                    width: 30,
                                    dataIndex: 'price',
                                    key: 'price',

                                },
                            ]}
                            dataSource={data}
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
                    </Col>
                </Row>



                <Row>
                    <Col span={24}>
                        <Button
                            type='primary'
                            style={{
                                fontSize: 16,
                                width: 'auto',
                                height: 'auto',
                                marginTop: '15px'
                            }}
                            onClick={() => {
                                if (data.length === 0) {
                                    alert('chua co data')
                                }
                                else {


                                    apiAddPurchaseInvoice(token, admin_id, supplier_id, data)
                                        .then(response => {
                                            if (response.data.success) {
                                                //console.log(response.data.msg)
                                                setData([]);
                                                dispatch(updateRefesh())
                                            }
                                        })
                                        .catch(err => {
                                            console.log('err', err)
                                        })
                                }
                            }}
                        >
                            Tạo phiếu nhập
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}