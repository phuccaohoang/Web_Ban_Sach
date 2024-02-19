import { Button, Form, Input, Row } from 'antd'
import './dang_nhap.css'
import { useDispatch } from 'react-redux'
import { apiLogin } from '../../API/apiAccounts'
import { updateAccountCustomer } from '../../redux/slices/accountCustomerSlice'

export const DangNhap = (props) => {
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    return <>
        <h2 style={{ textAlign: 'center' }}>Đăng Nhập</h2>
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
                console.log('value', value)
                apiLogin(value.username, value.password)
                    .then(res => {
                        if (res.data.success) {
                            console.log(res.data)
                            dispatch(updateAccountCustomer(res.data))
                            props.handleCancel();
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
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Row style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <span>Chưa có tài khoản ? </span>
                &nbsp;&nbsp;&nbsp;
                <a onClick={() => props.setShowLogin(false)}>Đăng ký</a>
            </Row>

            <Row>
                <Button style={{
                    width: "100%",
                    marginTop: '15px'
                }} htmlType='submit'>Đăng nhập</Button>
            </Row>

        </Form>
    </>
}