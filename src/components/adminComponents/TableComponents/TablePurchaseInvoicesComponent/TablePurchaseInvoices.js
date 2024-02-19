import './TablePurchaseInvoices.css';
import '../Tables.css';
import { Row, Table, Button, Checkbox } from 'antd';
//Drawer
import { useState } from 'react';
import { Col, Drawer, Form, Input, Select, Space } from 'antd';
import { FormAddPurchaseInvoice } from './FormAddPurchaseInvoice';
import { DetailPurchaseInvoice } from './DetailPurchaseInvoice';
const { Option } = Select;
//Drawer

export const TablePurchaseInvoices = (props) => {

    let data = [];

    if (props.data !== null) {
        data = props.data.map(item => {
            return {
                id: item.id,
                supplier: item.supplier.name,
                admin: item.admin.name,
                totalBook: item.purchase_invoice_details.reduce((sum, item) => {
                    return Number(sum) + Number(item.quantity)
                }, 0),
                totalCost: item.purchase_invoice_details.reduce((sum, item) => {
                    return Number(sum) + Number(item.cost)
                }, 0),
                actions: <div>
                    <Button
                        style={{
                            borderColor: 'green',
                            color: 'green',
                        }}
                        onClick={() => {
                            showDrawerShowDetail(item.id, item.purchase_invoice_details)
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
            title: 'Nhà cung cấp',
            width: 100,
            dataIndex: 'supplier',
            key: 'supplier',
        },
        {
            title: 'Quản trị viên',
            dataIndex: 'admin',
            key: 'admin',
            width: 150,
        },
        {
            title: 'Tổng sách',
            width: 100,
            dataIndex: 'totalBook',
            key: 'totalBook',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalCost',
            key: 'totalCost',
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


    const [open, setOpen] = useState(false);
    const [element, setElement] = useState(<></>)
    const [title, setTitle] = useState(null)

    const showDrawerAddPurchaseInvoice = () => {
        setElement(<FormAddPurchaseInvoice />)
        setTitle('Tạo Phiếu Nhập')
        setOpen(true)
    }
    const showDrawerShowDetail = (id, data = null) => {
        setElement(<DetailPurchaseInvoice data={data} />)
        setTitle('Chi Tiết Phiếu Nhập ' + id)
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
                <Row
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Button
                        onClick={() => {
                            showDrawerAddPurchaseInvoice()
                        }}
                        type='primary'
                        style={{
                            width: 'auto',
                            height: 40,
                        }}
                    >
                        Tạo phiếu nhập
                    </Button>
                </Row>
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