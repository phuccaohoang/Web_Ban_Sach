import { Col, Form, Input, Row, Button } from 'antd';

import { apiAddAdmin } from '../../../../API/apiAdmins'
import { useSelector, useDispatch } from 'react-redux'
import { updateRefesh } from '../../../../redux/slices/refeshSlice';

export const FormAddAdmin = () => {

    const dispatch = useDispatch()
    const { token } = useSelector(state => state.accountAdmin)

    return (
        <>
            <Form layout="vertical" onFinish={(value) => {
                console.log(value)
                apiAddAdmin(token, value)
                    .then(res => {
                        if (res.data.success) {
                            console.log(res.data.msg)
                            dispatch(updateRefesh())
                        }
                        else {
                            console.log(res.data.msg)

                        }
                    })
                    .catch(err => {
                        console.log('err', err)
                    })
            }}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Ten quan tri vien"
                            rules={[
                                {
                                    required: true,
                                    message: 'không được bỏ trống',
                                },
                            ]}
                        >
                            <Input placeholder="Nhap ten the loai..." />
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="phone"
                            label="So dien thoai"
                            rules={[
                                {
                                    required: true,
                                    message: 'không được bỏ trống',
                                },
                            ]}
                        >
                            <Input placeholder="Nhap so dien thoai..." />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'không được bỏ trống',
                                },
                                {
                                    type: 'email',
                                    message: 'Please enter email',
                                },
                            ]}
                        >
                            <Input placeholder="Nhap email..." />
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="username"
                            label="Ten dang nhap"
                            rules={[
                                {
                                    required: true,
                                    message: 'không được bỏ trống',
                                },
                                {
                                    validator: (_, value) => {
                                        let username = String(value);
                                        if (username.indexOf(' ') !== -1) {
                                            return Promise.reject(new Error('Tên đăng nhập không có khoảng trắng!'))
                                        }
                                        return Promise.resolve();
                                    }
                                },
                                {
                                    min: 5,
                                    message: "Tên đăng nhập tối thiểu 5 ký tự!"
                                },
                                {
                                    max: 16,
                                    message: "Tên đăng nhập tối đa 16 ký tự!"
                                },
                            ]}
                        >
                            <Input placeholder="Nhap ten dang nhap..." />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="password"
                            label="Mat khau"
                            rules={[
                                {
                                    required: true,
                                    message: 'không được bỏ trống',
                                },
                                {
                                    validator: (_, value) => {
                                        let password = String(value);
                                        if (password.indexOf(' ') !== -1) {
                                            return Promise.reject(new Error('Mật khẩu không có khoảng trắng!'))
                                        }
                                        return Promise.resolve();
                                    }
                                },
                                {
                                    min: 5,
                                    message: "Tên mật khẩu tối thiểu 5 ký tự!"
                                },
                                {
                                    max: 16,
                                    message: "Tên mật khẩu tối đa 16 ký tự!"
                                }
                            ]}
                        >
                            <Input.Password placeholder="Nhap mat khau..." />
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="address"
                            label="Dia chi"
                            rules={[
                                {
                                    required: true,
                                    message: 'không được bỏ trống',
                                },
                            ]}
                        >
                            <Input.TextArea rows={4} placeholder="Nhap dia chi..." />
                        </Form.Item>
                    </Col>

                </Row>

                <Row>
                    <Col span={24}>
                        <Button
                            type='primary' htmlType='submit'
                            style={{
                                fontSize: 16,
                                width: 'auto',
                                height: 'auto'
                            }}
                        >
                            Them</Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}