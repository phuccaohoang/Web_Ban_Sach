import './TableAdmins.css';
import '../Tables.css';
import { Row, Table, Button, Checkbox, Col, Drawer, Form, Input, Select, Space, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'

import { useSelector, useDispatch } from 'react-redux'
import { updateRefesh } from '../../../../redux/slices/refeshSlice';

import { apiRecoveryAdmin } from '../../../../API/apiAdmins';

export const TableRecoveryAdmin = (props) => {

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
                        title="Ban co muon khoi phuc khong ?"
                        okText="Co"
                        cancelText="Khong"
                        onConfirm={() => {
                            console.log('khoi phuc')
                            apiRecoveryAdmin(token, item.id)
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
                                    color: 'orange',
                                }}
                            />
                        }
                    >
                        <Button type='dashed'>Khôi phục</Button>
                    </Popconfirm>

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
        </>
    )
}