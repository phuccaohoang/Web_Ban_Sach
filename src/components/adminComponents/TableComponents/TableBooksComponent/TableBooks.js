import './TableBooks.css';
import '../Tables.css';
import { Row, Table, Button, Checkbox, Popconfirm } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
//Drawer
import { useState } from 'react';
import { Col, Drawer, Form, Input, Select, Space } from 'antd';
import { FormAddBook } from './FormAddBook';
import { FormEditBook } from './FormEditBook';
const { Option } = Select;
//Drawer
import { useSelector, useDispatch } from 'react-redux'
import { updateRefesh } from '../../../../redux/slices/refeshSlice';
import { apiDelBook } from '../../../../API/apiBooks';



export const TableBooks = (props) => {
    const { token } = useSelector(state => state.accountAdmin)
    const dispatch = useDispatch()

    let data = [];
    console.log('data', props.data)
    if (props.data !== null) {

        data = props.data.map((item) => {
            return ({
                id: item.id,
                name: item.name,
                author: item.author.name,
                summary: item.summary === null ? 'Đang cập nhật' : item.summary,
                quantity: item.quantity,
                price: item.price,
                discount: item.discount,
                typeBook: item.is_ebook ? 'E-Book' : 'Sách in',
                sold: item.sold,
                point: item.average_point,
                actions: <div>
                    <Popconfirm
                        title={`Ban co muon sach ${item.id} xoa khong ?`}
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => {
                            console.log('xoa')
                            apiDelBook(token, item.id)
                                .then(res => {
                                    if (res.data.success) {
                                        console.log(res.data.msg)
                                        dispatch(updateRefesh())
                                    } else[
                                        console.log(res.data.msg)

                                    ]
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
                        <Button danger>Xóa</Button>
                    </Popconfirm>

                    <>&nbsp;&nbsp;</>
                    <Button
                        style={{
                            borderColor: '#F1C40F',
                            color: '#F1C40F',
                        }}
                        onClick={() => {
                            showDrawerEditBook(item.id, item)
                        }}

                    >
                        Chỉnh sửa
                    </Button>

                </div>,
            })
        })

    }


    const columns = [
        {
            title: 'ID',
            width: 70,
            dataIndex: 'id',
            key: 'name',
            fixed: 'left',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Name',
            width: 300,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
            //sorter: (a, b) => a.name - b.name,
        },
        {
            title: 'Author',
            width: 200,
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Tóm tắt',
            dataIndex: 'summary',
            key: 'summary',
            width: 450,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: 100,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            width: 150,
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            key: 'discount',
            width: 150,
        },
        {
            title: 'Loại sách',
            dataIndex: 'typeBook',
            key: 'typeBook',
            width: 150,
        },
        {
            title: 'Đã bán',
            dataIndex: 'sold',
            key: 'sold',
            width: 100,
        },
        {
            title: 'Điểm',
            dataIndex: 'point',
            key: 'point',
            width: 100,
        },
        {
            title: 'Chức năng',
            key: 'actions',
            dataIndex: 'actions',
            fixed: 'right',
            width: 200,

        },
    ];

    //Drawer
    const [element, setElement] = useState(<></>)
    const [title, setTitle] = useState("")
    const [open, setOpen] = useState(false);

    const showDrawerAddBook = () => {
        setTitle('Them Sach')
        setElement(<FormAddBook />)
        setOpen(true);
    };
    const showDrawerEditBook = (id, data) => {
        setTitle("Chinh Sua Sach " + id)
        setElement(<FormEditBook data={data} />)
        setOpen(true);
    };
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
    //Drawer
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
                            showDrawerAddBook()
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