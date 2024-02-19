import './TableSalesInvoices.css';
import '../Tables.css';
import { Row, Table, Button, Checkbox } from 'antd';
//Drawer
import { useState } from 'react';
import { Col, Drawer, Form, Input, Select, Space } from 'antd';
import { DetailSalesInvoice } from './DetailSalesInvoice';
const { Option } = Select;
//Drawer

export const TableSalesInvoices = (props) => {

    let data = [];
    if (props.data !== null) {
        console.log('data', props.data)
        data = props.data.map(item => {
            return {
                id: item.id,
                customer: item.customer.name,
                address: item.address,
                phone: item.phone,
                shoppingCost: item.shopping_cost,
                status: item.delivery_status.name,
                actions: <div>
                    <Button
                        style={{
                            borderColor: 'green',
                            color: 'green',
                        }}
                        onClick={() => {
                            showDrawerShowDetail(item.id, item)
                        }}
                    >
                        Chi tiết
                    </Button>
                </div>,
            }
        })
    }

    const columns = [
        {
            title: 'ID',
            width: 70,
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Khách hàng',
            width: 200,
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: 300,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: 150,
        },
        {
            title: 'Tống sách mua',
            dataIndex: 'totalBook',
            key: 'totalBook',
            width: 150,
        },
        {
            title: 'Tổng hóa đơn',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            width: 150,
        },
        {
            title: 'Phí vận chuyển',
            dataIndex: 'shoppingCost',
            key: 'shoppingCost',
            width: 150,
        },
        {
            title: 'Tổng giảm giá sách',
            dataIndex: 'totalDiscountBook',
            key: 'totalDiscountBook',
            width: 150,
        },
        {
            title: 'Giảm giá hóa đơn',
            dataIndex: 'discountInvoice',
            key: 'discountInvoice',
            width: 150,
        },
        {
            title: 'Giảm giá vận chuyển',
            dataIndex: 'discountDelivery',
            key: 'discountDelivery',
            width: 150,
        },
        {
            title: 'Thành tiền',
            dataIndex: 'intoCash',
            key: 'intoCash',
            width: 150,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 150,
        },
        {
            title: 'Chức năng',
            key: 'actions',
            dataIndex: 'actions',
            fixed: 'right',
            width: 150,

        },
    ];


    const [open, setOpen] = useState(false);
    const [element, setElement] = useState(<></>)
    const [title, setTitle] = useState(null)

    const showDrawerShowDetail = (id, data) => {
        setElement(<DetailSalesInvoice data={data} />)
        setTitle(`Xem Chi Tiết Hóa Đơn ${id}`)
        setOpen(true)
    }

    const onClose = () => {
        setElement(<></>)
        setOpen(false);
    };
    let DrawerComponent = <>
        <Drawer
            title={title}
            width={1200}
            onClose={onClose}
            open={open}
            styles={{
                body: {
                    paddingBottom: 80,
                },
            }}

        >
            {element}
        </Drawer>
    </>


    return (
        <>
            <div className='bang_danh_sach'>

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
            </div>
            {DrawerComponent}
        </>
    )
}