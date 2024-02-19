import { Col, Form, Input, InputNumber, Row, Button, Select, Table, Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';
import { apiGetDeliveryStatus } from '../../../../API/apiDeliveryStatus';
import { useSelector } from 'react-redux';
const { Option } = Select;

export const DetailSalesInvoice = (props) => {

    const { token } = useSelector(state => state.accountAdmin)
    const [deliveryStatus, setDeliveryStatus] = useState(null)

    useEffect(() => {
        apiGetDeliveryStatus(token)
            .then(res => {
                if (res.data.success) {
                    setDeliveryStatus(res.data.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const columns = [
        {
            title: 'Tên sách',
            width: 30,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'Số lượng',
            width: 20,
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giá (VND)',
            dataIndex: 'price',
            key: 'price',
            width: 25,
        },
        {
            title: 'Giảm giá (%)',
            dataIndex: 'discount',
            key: 'discount',
            width: 25,
        }
    ];

    return (
        <>
            <Form layout="vertical" onFinish={(value) => {
                console.log(value)
            }}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="delivery_status_id"
                            label="Trạng thái vận chuyển"
                            rules={[
                                {
                                    required: true,
                                    message: "Khong dc de trong"
                                }
                            ]}
                            initialValue={props.data.delivery_status_id}
                        >
                            <Select placeholder="Please select an owner">

                                {
                                    deliveryStatus !== null ? deliveryStatus.map(item => {
                                        let disable = true
                                        let id = props.data.delivery_status_id;

                                        if (id !== 5 && id !== 4) {
                                            if ((item.id === ++id && item.id !== 4) || item.id === 5) {
                                                disable = false
                                            }
                                        }

                                        return <Option disabled={disable} value={item.id}>{item.name}</Option>
                                    }) : null
                                }
                            </Select>
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
                                marginBottom: '20px'
                            }}
                        >
                            Cập nhật trạng thái
                        </Button>
                    </Col>
                </Row>

                <Row gutter={16} className='edit_size_number_admin'>
                    <Col span={24}>
                        <Table
                            columns={columns}
                            dataSource={
                                props.data.sales_invoice_details.map(item => {
                                    return {
                                        name: item.book.name,
                                        quantity: item.quantity,
                                        price: item.price,
                                        discount: item.discount,
                                    }
                                })
                            }
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




            </Form>
        </>
    )
}