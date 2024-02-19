import { Button, Form, Input, Row } from 'antd'
import './dang_ky.css'
import TextArea from 'antd/es/input/TextArea'
import { apiSignUp } from '../../API/apiAccounts'

export const DangKy = (props) => {

    const [form] = Form.useForm()



    return <>
        <h2 style={{ textAlign: 'center' }}>Đăng Ký</h2>
        <Form
            form={form}
            labelCol={{
                flex: '150px',
            }}
            labelAlign="left"
            labelWrap
            wrapperCol={{
                flex: 1
            }}
            style={{
                marginTop: '15px'
            }}
            onFinish={value => {
                console.log(value)
                apiSignUp(value)
                    .then(res => {
                        if (res.data.success) {
                            console.log(res.data.msg)

                        } else {
                            console.log(res.data.msg)

                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    .finally(() => {
                        form.resetFields()
                    })

            }}

        >

            <Form.Item

                label="Tên đăng nhập"
                name='username'
                rules={[
                    {
                        required: true,
                        message: 'Không được bỏ trống'
                    },
                    {
                        min: 5,
                        message: "Tên mật khẩu tối thiểu 5 ký tự!"
                    },
                    {
                        max: 16,
                        message: "Tên mật khẩu tối đa 16 ký tự!"
                    },
                    {
                        validator: (_, value) => {
                            let username = String(value);
                            if (username.indexOf(' ') !== -1) {
                                return Promise.reject(new Error('Tên đăng nhập không có khoảng trắng!'))
                            }
                            return Promise.resolve();
                        }
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Mật khẩu"
                name='password'
                rules={[
                    {
                        required: true,
                        message: 'Không được bỏ trống'
                    },
                    {
                        min: 5,
                        message: "Tên mật khẩu tối thiểu 5 ký tự!"
                    },
                    {
                        max: 16,
                        message: "Tên mật khẩu tối đa 16 ký tự!"
                    },
                    {
                        validator: (_, value) => {
                            let password = String(value);
                            if (password.indexOf(' ') !== -1) {
                                return Promise.reject(new Error('Mật khẩu không có khoảng trắng!'))
                            }
                            return Promise.resolve();
                        }
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item

                label="Họ tên"
                name='name'
                rules={[
                    {
                        required: true,
                        message: 'Không được bỏ trống'
                    }
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item

                label="Email"
                name='email'
                rules={[
                    {
                        required: true,
                        message: 'Không được bỏ trống'
                    },
                    {
                        type: 'email',
                        message: 'Nhập sai cú pháp'
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item

                label="Địa chỉ"
                name='address'

            >
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item

                label="Số điện thoại"
                name='phone'

            >
                <Input />
            </Form.Item>

            <Row style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <span>Đã có tài khoản ? </span>
                &nbsp;&nbsp;&nbsp;
                <a onClick={() => props.setShowLogin(true)}>Đăng nhập</a>
            </Row>

            <Row>
                <Button style={{
                    width: "100%",
                    marginTop: '15px'
                }} htmlType='submit'>Đăng ký</Button>
            </Row>

        </Form>
    </>
}