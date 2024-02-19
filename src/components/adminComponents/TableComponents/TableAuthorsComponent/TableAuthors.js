import './TableAuthors.css';
import '../Tables.css';
import { Row, Table, Button, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
//Drawer
import { useState } from 'react';
import { Col, Drawer, Form, Input, Select, Space, Popconfirm } from 'antd';
import { FormAddAuthor } from './FormAddAuthor';
import { FormEditAuthor } from './FormEditAuthor';
const { Option } = Select;
//Drawer

export const TableAuthors = (props) => {

    let data = [];

    if (props.data !== null) {
        data = props.data.map((item) => {
            return {
                id: item.id,
                name: item.name,
                summary: item.summary === null ? 'Đang cập nhật' : item.summary,
                actions: <div>
                    <Popconfirm
                        title={"Ban co chac muon xoa khong ?"}
                        okText="Có"
                        cancelText="Không"
                        onConfirm={() => console.log('xoa')}
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
                            showDrawerEditAuthor(item.id, item)
                        }}
                    >
                        Chỉnh sửa
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
            title: 'Giới thiệu',
            dataIndex: 'summary',
            key: 'summary',
            width: 400,
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
    const [element, setElement] = useState(<></>);
    const [title, setTitle] = useState(null);

    const showDrawerAddAuthor = () => {
        setElement(<FormAddAuthor />)
        setTitle("Them Tac Gia")
        setOpen(true)
    }
    const showDrawerEditAuthor = (id, data) => {
        setElement(<FormEditAuthor data={data} />)
        setTitle("Chinh Sua Tac Gia " + id)
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
                    <Button onClick={onClose} danger>Hủy</Button>
                    <Button onClick={onClose} type="dashed">
                        Làm mới
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
                            showDrawerAddAuthor()
                        }}
                        type='primary'
                        style={{
                            width: 100,
                            height: 40,
                        }}
                    >
                        Thêm mới
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