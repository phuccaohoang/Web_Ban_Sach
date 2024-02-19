import './TableGenres.css';
import '../Tables.css';
import { Row, Table, Button, Checkbox } from 'antd';
//Drawer
import { useState } from 'react';
import { Col, Drawer, Form, Input, Select, Space, Popconfirm } from 'antd';
import { DeleteOutlined } from "@ant-design/icons"
import { FormAddGenre } from './FormAddGenre';
import { FormEditGenre } from './FormEditGenre';
const { Option } = Select;
//Drawer

export const TableGenres = (props) => {

    let data = [];
    if (props.data !== null) {
        data = props.data.map(item => {
            return {
                id: item.id,
                name: item.name,
                description: item.description === null ? 'Đang cập nhật' : item.description,
                actions: <div>

                    <Button
                        style={{
                            borderColor: '#F1C40F',
                            color: '#F1C40F',
                        }}
                        onClick={() => {
                            showDrawerEditGenre(item.id, item)
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
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            width: 450,
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

    const showDrawerAddGenre = () => {
        setElement(<FormAddGenre />)
        setTitle("Them The Loai")
        setOpen(true)
    }
    const showDrawerEditGenre = (id, data) => {
        setElement(<FormEditGenre data={data} />)
        setTitle('Chinh Sua The Loai ' + id)
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
                            showDrawerAddGenre()
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