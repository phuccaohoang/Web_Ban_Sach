
import { Row, Col, Drawer, Form, Input, Select, Space, Checkbox, Button, Upload } from 'antd';
import { useEffect, useState } from 'react';

import { UploadOutlined } from '@ant-design/icons'
const { Option } = Select;

import { useSelector, useDispatch } from 'react-redux'
import { apiAdminGetAuthors } from '../../../../API/apiAuthors'
import { apiAdminGetGenres } from '../../../../API/apiGenres'
import { apiAddBook } from '../../../../API/apiBooks';
import { updateRefesh } from '../../../../redux/slices/refeshSlice';


export const FormAddBook = () => {
    const [genres, setGenres] = useState([])
    const [authors, setAuthors] = useState([])

    const { token } = useSelector(state => state.accountAdmin)

    const dispatch = useDispatch()

    useEffect(() => {
        apiAdminGetAuthors(token)
            .then(res => {
                if (res.data.success) [
                    setAuthors(res.data.data)
                ]
            })
            .catch(err => {
                console.log(err)
            })

        apiAdminGetGenres(token)
            .then(res => {
                if (res.data.success) [
                    setGenres(res.data.data)
                ]
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <>
            <Form layout="vertical" onFinish={(value) => {
                console.log(value)
                const formData = new FormData();
                formData.append('name', value.name)
                formData.append('summary', value.summary)
                formData.append('is_ebook', value.is_ebook)
                formData.append('author_id', value.author_id)
                formData.append('image_theme', value.image_theme.file.originFileObj, value.image_theme.name)
                value.genres.forEach(item => {
                    console.log(item)
                    formData.append('genres[]', item)
                });
                value.images.fileList.forEach(item => {
                    console.log(item)
                    formData.append('images[]', item.originFileObj, item.name)
                });

                apiAddBook(token, formData)
                    .then(res => {
                        if (res.data.success) {
                            dispatch(updateRefesh());
                            console.log(res.data.msg)
                        }
                        else {
                            console.log(res.data.msg)

                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="name"
                            label="Ten sach"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter user name',
                                },
                            ]}
                        >
                            <Input placeholder="Nhap ten sach..." />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="is_ebook"
                            label="Loai sach"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter user name',
                                },
                            ]}
                        >
                            <Select placeholder="Please select an owner" >
                                <Option value={0}>Sach in</Option>
                                <Option value={1}>E-Book</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="author_id"
                            label="Tac gia"

                            rules={[
                                {
                                    required: true,
                                    message: "Hay chon tac gia"
                                }
                            ]}

                        >
                            <Select placeholder="Please select an owner">
                                {
                                    authors.map(item => {
                                        return <Option value={item.id}>{item.name}</Option>
                                    })
                                }


                            </Select>
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="genres"
                            label="The loai"
                            rules={[
                                {
                                    required: true,
                                    message: 'Chọn thể loại',
                                },
                            ]}
                        >
                            <Checkbox.Group
                                options={
                                    genres.map(item => {
                                        return {
                                            value: item.id,
                                            label: item.name,
                                        }
                                    })
                                }
                            >

                            </Checkbox.Group>
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="summary"
                            label="Tóm tắt"

                        >
                            <Input.TextArea rows={4} placeholder="please enter url description" />
                        </Form.Item>
                    </Col>
                </Row>


                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="images"
                            label="Hình ảnh"
                            rules={[
                                {
                                    required: true,
                                    message: 'Chọn ảnh',
                                },
                            ]}
                        >
                            <Upload
                                listType="picture"
                                multiple
                                beforeUpload={() => false}
                                onChange={(value) => {
                                    console.log(value)

                                }}
                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>

                            </Upload>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="image_theme"
                            label="Ảnh bìa"
                            rules={[
                                {
                                    required: true,
                                    message: 'Chọn ảnh',
                                },
                            ]}
                        >
                            <Upload

                                listType="picture"
                                maxCount={1}
                                beforeUpload={() => false}
                                onChange={(value) => {
                                    console.log(value)

                                }}

                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>

                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Button type='primary' htmlType='submit'>
                            Them
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}