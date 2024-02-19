import './TableSlideshows.css';
import '../Tables.css';
import { Row, Table, Button, Upload } from 'antd';
import { Popconfirm } from 'antd';
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons"
import { useState } from 'react';
import { apiAddSlideshows, apiDelSlideshow } from '../../../../API/apiSlideshows';
import { useSelector, useDispatch } from 'react-redux'
import { updateRefesh } from '../../../../redux/slices/refeshSlice'


export const TableSlideshows = (props) => {

    const [file, setFile] = useState([])
    const { token } = useSelector(state => state.accountAdmin)
    const dispatch = useDispatch()

    let data = props.data.map(item => {
        return {
            id: item.id,
            title: item.title === null ? "Không có" : item.title,
            url: <img style={{ height: '100px' }} src={`http://localhost:8000/${item.name}`} />,
            actions: <div>
                <Popconfirm
                    title="Ban co chac muon xoa khong ?"
                    okText="Co"
                    cancelText="Khong"
                    onConfirm={() => {
                        apiDelSlideshow(token, item.id)
                            .then(res => {
                                if (res.data.success) {
                                    console.log(res.data.msg)
                                    dispatch(updateRefesh());
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
    });


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
            title: 'Tiêu đề',
            width: 100,
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Ảnh',
            dataIndex: 'url',
            key: 'url',
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






    return (
        <>
            <div className='bang_danh_sach'>
                <Row
                    style={{
                        marginBottom: 10,
                    }}
                >
                    <Upload

                        listType="picture"
                        multiple
                        beforeUpload={() => false}
                        onChange={(value) => {
                            console.log(value)
                            setFile(value.fileList)
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>

                </Row>
                <Row style={{
                    marginBottom: 10,
                }}>
                    <Button
                        onClick={() => {
                            console.log(file)
                            if (file.length === 0) {
                                return
                            }
                            const formData = new FormData();
                            file.forEach(item => {
                                formData.append('slides[]', item.originFileObj, item.name);
                            });

                            apiAddSlideshows(token, formData)
                                .then(res => {
                                    if (res.data.success) {
                                        console.log('them thanh cong')
                                        dispatch(updateRefesh())
                                        setFile([])
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                })
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
            </div >

        </>
    )
}