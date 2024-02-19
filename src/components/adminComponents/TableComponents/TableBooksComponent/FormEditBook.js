import { Col, Form, Input, InputNumber, Row, Select, Checkbox, Button, Upload } from 'antd'
import { useEffect, useState } from 'react';
const { Option } = Select;

import { UploadOutlined } from '@ant-design/icons'

import { useDispatch, useSelector } from 'react-redux'
import { apiAdminGetAuthors } from '../../../../API/apiAuthors'
import { apiAdminGetGenres } from '../../../../API/apiGenres'
import { apiEditBook } from '../../../../API/apiBooks';
import { updateRefesh } from '../../../../redux/slices/refeshSlice';


export const FormEditBook = (props) => {

    const [authors, setAuthors] = useState([])
    const [genres, setGenres] = useState([])

    const { token } = useSelector(state => state.accountAdmin)
    const dispatch = useDispatch()
    useEffect(() => {

        apiAdminGetGenres(token)
            .then(res => {
                if (res.data.success) {
                    setGenres(res.data.data)
                }
            })
            .catch(err => {
                console.log('err', err)
            })

        apiAdminGetAuthors(token)
            .then(res => {
                if (res.data.success) {
                    setAuthors(res.data.data)
                }
            })
            .catch(err => {
                console.log('err', err)
            })
    }, [])

    return (
        <>
            <Form layout='vertical' onFinish={(value) => {
                console.log('value', value)
                const formData = new FormData();
                formData.append('name', value.name)
                formData.append('book_id', props.data.id)
                formData.append('summary', value.summary)
                formData.append('discount', value.discount)
                formData.append('price', value.price)
                formData.append('author_id', value.author_id)
                value.genres.forEach(item => {
                    console.log(item)
                    formData.append('genres[]', item)
                });
                if (value.image_theme !== undefined && value.image_theme.fileList.length > 0) {
                    console.log('image theme')
                    formData.append('image_theme', value.image_theme.fileList[0].originFileObj, value.image_theme.fileList[0].name)
                }
                if (value.images !== undefined && value.images.fileList.length > 0) {
                    console.log('images')
                    value.images.fileList.forEach(item => {
                        console.log(item)
                        formData.append('images[]', item.originFileObj, item.name)
                    });
                }

                apiEditBook(token, formData)
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

            }}>
                <Row >
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Tên sách"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập dữ liệu"
                                }
                            ]}
                            initialValue={props.data.name}
                        >
                            <Input placeholder='Nhap ten sach...' />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="author_id"
                            label="Tác giả"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập dữ liệu"
                                }
                            ]}
                            initialValue={props.data.author_id}
                        >
                            <Select placeholder="hay chon tac gia" >
                                {
                                    authors.map(item => {
                                        return (

                                            <Option value={item.id}>{item.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="price"
                            label="Giá"
                            className='edit_size_number_admin'
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập dữ liệu"
                                }
                            ]}
                            initialValue={props.data.price < 10000 ? 10000 : props.data.price}
                        >
                            <InputNumber

                                min={10000}
                                addonAfter="VND"
                                placeholder='Nhap gia...' />
                        </Form.Item>
                    </Col>
                </Row>


                <Row gutter={16}>


                    <Col span={12}>
                        <Form.Item
                            name="discount"
                            label="Giảm giá"
                            className='edit_size_number_admin'
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập dữ liệu"
                                }
                            ]}
                            initialValue={props.data.discount}
                        >
                            <InputNumber

                                min={0}
                                max={100}
                                addonAfter="%"
                                placeholder='Nhap giam gia...' />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="genres"
                            label="Thể loại"
                            rules={[
                                {
                                    required: true,
                                    message: "Nhập dữ liệu"
                                }
                            ]}
                            initialValue={
                                props.data.genres_books.map(item => {
                                    return item.genre.id
                                })
                            }
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
                            <Input.TextArea rows={4} placeholder="please enter url description" defaultValue={props.data.summary} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="images"
                            label="Hình ảnh"
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
                        >
                            <Upload
                                listType="picture"
                                beforeUpload={() => false}
                                maxCount={1}
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
                            Cập nhật
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}