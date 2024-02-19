import { Col, Form, Input, InputNumber, Row, Button, Select, Table } from 'antd';
const { Option } = Select;

export const DetailPurchaseInvoice = (props) => {

    let data = []

    if (props.data !== null) {
        data = props.data.map(item => {
            return {
                name: item.book.name,
                quantity: item.quantity,
                price: item.price,
                cost: item.cost,
            }
        })
    }

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
            title: 'Giá bán (VND)',
            dataIndex: 'price',
            key: 'price',
            width: 25,
        },
        {
            title: 'Giá mua (VND)',
            dataIndex: 'cost',
            key: 'cost',
            width: 25,
        }
    ];

    return (
        <>
            <Form layout="vertical" >


                <Row gutter={16} className='edit_size_number_admin'>
                    <Col span={24}>
                        <Table
                            columns={columns}
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
            </Form>
        </>
    )
}