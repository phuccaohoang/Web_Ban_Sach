import './TableAdmins.css';
import '../Tables.css';
import { Row, Table, Button, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
//Drawer
import { useState } from 'react';
import { Col, Drawer, Form, Input, Select, Space, Popconfirm } from 'antd';
import { FormAddAdmin } from './FormAddAdmin';
import { FormEditAdmin } from './FormEditAdmin';
const { Option } = Select;
//Drawer
import { useSelector, useDispatch } from 'react-redux'
import { apiDelAdmin } from '../../../../API/apiAdmins';
import { updateRefesh } from '../../../../redux/slices/refeshSlice';



export const TableAdmins = (props) => {
    const { token } = useSelector(state => state.accountAdmin)
    const dispatch = useDispatch()

    let data = [];
    if (props.data !== null) {
        data = props.data.map(item => {
            return {
                id: item.id,
                name: item.name,
                address: item.address,
                phone: item.phone,
                email: item.email,
                actions: <div>
                    <Popconfirm
                        title="Ban co chac muon xoa khong ?"
                        okText="Co"
                        cancelText="Khong"
                        onConfirm={() => {
                            console.log('xoa')
                            apiDelAdmin(token, item.id)
                                .then(res => {
                                    if (res.data.success) {
                                        console.log(res.data.msg)
                                        dispatch(updateRefesh())
                                    } else {
                                        console.log(res.data.msg)

                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        }}
                        icon={
                            <DeleteOutlined
                                style={{
                                    color: 'red',
                                }}
                            />
                        }
                    >
                        <Button danger>Xoa</Button>
                    </Popconfirm>

                    <>&nbsp;&nbsp;</>
                    <Button
                        style={{
                            borderColor: '#F1C40F',
                            color: '#F1C40F',
                        }}
                        onClick={() => {
                            showDrawerEditAdmin(item.id, item)
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
            title: 'Tên',
            width: 200,
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
            width: 250,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
            width: 150,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: 250,
        },
        {
            title: 'Chức năng',
            dataIndex: 'actions',
            key: 'actions',
            fixed: 'right',
            width: 200,

        },
    ];


    const [open, setOpen] = useState(false);
    const [element, setElement] = useState(<></>)
    const [title, setTitle] = useState(null)
    const showDrawerAddAdmin = () => {
        setElement(<FormAddAdmin />)
        setTitle("Them Quan Tri Vien")
        setOpen(true)
    }
    const showDrawerEditAdmin = (id, data) => {
        setElement(<FormEditAdmin data={data} />)
        setTitle("Chinh Sua Quan Tri Vien " + id)

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
                            showDrawerAddAdmin(<FormAddAdmin />)
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