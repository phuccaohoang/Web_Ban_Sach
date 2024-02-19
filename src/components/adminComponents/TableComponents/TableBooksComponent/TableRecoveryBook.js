import './TableBooks.css';
import '../Tables.css';
import { Row, Table, Button, Checkbox, Popconfirm } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";

import { useSelector, useDispatch } from 'react-redux'
import { updateRefesh } from '../../../../redux/slices/refeshSlice';

import { apiRecoveryBook } from '../../../../API/apiBooks';

export const TableRecoveryBook = (props) => {
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
                        title={`Ban co muon khôi phục khong ?`}
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => {
                            console.log('khoi phuc')
                            apiRecoveryBook(token, item.id)
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
            })
        })

        console.log('data table', data)
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

        </>
    )
}