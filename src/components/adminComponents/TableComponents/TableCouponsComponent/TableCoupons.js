import './TableCoupons.css';
import '../Tables.css';
import { Row, Table, Button, Checkbox } from 'antd';
//Drawer
import { useState } from 'react';
import { Col, Drawer, Form, Input, Select, Space, Popconfirm } from 'antd';
import { DeleteOutlined } from "@ant-design/icons"
import { FormAddCoupon } from './FormAddCoupon';
import { apiDelCoupon } from '../../../../API/apiCoupons';
import { useDispatch, useSelector } from 'react-redux';
import { updateRefesh } from '../../../../redux/slices/refeshSlice';
const { Option } = Select;
//Drawer

export const TableCoupons = (props) => {

    const { token } = useSelector(state => state.accountAdmin)
    const dispatch = useDispatch();

    let data = [];
    if (props.data !== null) {
        data = props.data.map(item => {
            return {
                id: item.id,
                discount: item.discount,
                min: item.min,
                typeCoupon: item.type_coupon.name,
                note: item.note,
                actions: <div>
                    <Popconfirm
                        title="Ban co chac muon xoa khong ?"
                        okText="Co"
                        cancelText="Khong"
                        onConfirm={() => {
                            apiDelCoupon(token, item.id)
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
            title: 'Giảm giá (%)',
            width: 150,
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Giá tối thiểu (vnd)',
            dataIndex: 'min',
            key: 'min',
            width: 250,
        },
        {
            title: 'Loại phiếu giảm',
            dataIndex: 'typeCoupon',
            key: 'typeCoupon',
            width: 250,
        },
        {
            title: 'Mô tả',
            dataIndex: 'note',
            key: 'note',
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

    const showDrawerAddCoupon = () => {
        setElement(<FormAddCoupon />)
        setTitle("Them Phieu Giam Gia")
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
            extra={
                <Space>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button onClick={onClose} type="primary">
                        Submit
                    </Button>
                </Space>
            }
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
                            showDrawerAddCoupon()
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