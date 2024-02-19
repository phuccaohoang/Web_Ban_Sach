import './LoginAdmin.css'
import { Button, Space, Form, Input, notification } from 'antd';
import { ExclamationOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { apiLogin } from '../../../API/apiAccounts';
import { updateAccountAdmin } from '../../../redux/slices/accountAdminSlice';

export const LoginAdmin = () => {

    const dispatch = useDispatch();

    //antd thong bao
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (msg, icon) => {
        api.info({
            message: msg,
            icon: icon,
            placement: 'topRight',
        });
    };


    //form submit
    const onFinish = (values) => {

        apiLogin(values.username, values.password, 1)
            .then(response => {

                if (response.data.success) {
                    dispatch(updateAccountAdmin(response.data))
                    return;
                }

                openNotification(response.data.msg, <ExclamationOutlined style={{ color: 'red' }} />)
            })
            .catch(error => {
                console.log('err', error.message);
            })

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    }


    return (
        <>
            {contextHolder}

            <img src='/logo_admin/logo.png' className='logo_login_admin' />

            <Space align='center' className='login_admin' >


                <Form className='form_login_admin'
                    name="basic"
                    labelCol={{
                        flex: '120px',

                    }}
                    labelWrap
                    labelAlign='left'
                    wrapperCol={{
                        flex: 1,
                    }}
                    style={{
                        width: 500,
                        border: 'solid 1px white',
                        borderRadius: '8px',
                        padding: '10px 30px',
                        backdropFilter: "blur(10px)",
                        background: 'transparent',
                        color: 'black',
                        fontSize: '17px'
                    }}

                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <h1
                        style={{
                            marginBottom: 30,
                            marginTop: 10,
                            textAlign: 'center'
                        }}
                    >ĐĂNG NHẬP</h1>
                    <Form.Item
                        style={{
                            marginBottom: 44,
                        }}
                        label="Tài Khoản"

                        name="username"
                        type='string'
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập tên đăng nhập!',
                            },
                            {
                                min: 5,
                                message: "Tên đăng nhập tối thiểu 5 ký tự!"
                            },
                            {
                                max: 16,
                                message: "Tên đăng nhập tối đa 16 ký tự!"
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
                        <Input maxLength={16} style={{
                            width: '100%',
                            fontSize: '17px',
                        }} />
                    </Form.Item>

                    <Form.Item
                        style={{
                            marginBottom: 44,
                        }}
                        label="Mật Khẩu"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Hãy nhập mật khẩu!',
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
                        <Input.Password maxLength={16} style={{
                            width: '100%',
                            fontSize: '17px',
                        }} />
                    </Form.Item>


                    <Form.Item
                        style={{
                            textAlign: 'right'
                        }}
                    >
                        <Button type="primary" htmlType='submit' style={{
                            padding: '5px 10px',
                            width: "auto",
                            height: 'auto',
                            fontSize: '16px',
                            fontWeight: 500
                        }}>
                            Đăng Nhập
                        </Button>
                    </Form.Item>
                </Form>

            </Space >
        </>
    )
}