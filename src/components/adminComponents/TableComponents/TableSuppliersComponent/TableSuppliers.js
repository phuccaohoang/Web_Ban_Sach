import './TableSuppliers.css';
import '../Tables.css';
import { Row, Table, Button, Checkbox } from 'antd';
//Drawer
import { useState } from 'react';
import { Col, Drawer, Form, Input, Select, Space, Popconfirm } from 'antd';
import { DeleteOutlined, PropertySafetyFilled } from "@ant-design/icons"
import { FormAddSupplier } from './FormAddSupplier';
import { FormEditSupplier } from './FormEditSupplier';
const { Option } = Select;
//Drawer

export const TableSuppliers = (props) => {

    let data = [];

    if (props.data !== null) {
        data = props.data.map(item => {
            return {
                id: item.id,
                name: item.name,
                address: item.address,
                phone: item.phone,
                email: item.email,
                summary: item.summary === null ? 'Đang cập nhật' : item.summary,
                actions: <div>

                    <Button
                        style={{
                            borderColor: '#F1C40F',
                            color: '#F1C40F',
                        }}
                        onClick={() => {
                            showDrawerEditSupplier(item.id, item)
                        }}
                    >
                        Chinh sua
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
            title: 'Tên nhà cung cấp',
            width: 200,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: 150,
        },
        {
            title: 'Số điện thoại',
            width: 150,
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 150,
        },
        {
            title: 'Sơ lược',
            dataIndex: 'summary',
            key: 'summary',
            width: 250,
        },
        {
            title: 'Chức năng',
            key: 'actions',
            dataIndex: 'actions',
            fixed: 'right',
            width: 200,

        },
    ];


    const [open, setOpen] = useState(false);
    const [element, setElement] = useState(<></>)
    const [title, setTitle] = useState(null)


    const showDrawerAddSupplier = () => {
        setElement(<FormAddSupplier />)
        setTitle("Them Nha Cung Cap")
        setOpen(true)
    }
    const showDrawerEditSupplier = (id, data) => {
        setElement(<FormEditSupplier data={data} />)
        setTitle('Chinh Sua Nha Cung Cap ' + id)
        setOpen(true)
    }
    const onClose = () => {
        setElement(<></>)
        setOpen(false);
    };
    let DrawerComponent = <>
        <Drawer
            title={title}
            width={720}
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
                            showDrawerAddSupplier()
                        }}
                        type='primary'
                        style={{
                            width: 100,
                            height: 40,
                        }}
                    >
                        Them moi
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