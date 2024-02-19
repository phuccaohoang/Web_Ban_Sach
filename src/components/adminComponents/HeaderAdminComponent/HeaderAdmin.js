import './HeaderAdmin.css';

import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, Layout, Row, Upload } from 'antd';
import { Dropdown, Spin, Modal } from 'antd';
const { Header } = Layout;


import { useDispatch, useSelector } from 'react-redux';
import { resetAccountAdmin, updateAvatarAdmin, updateInfoAdmin } from '../../../redux/slices/accountAdminSlice';
import { apiChagePassword, apiLogout } from '../../../API/apiAccounts';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { apiUpdateAvatar } from '../../../API/apiAccounts'
import { apiGetAdminById } from '../../../API/apiAdmins'
import { apiEditAdmin } from '../../../API/apiAdmins';

export const HeaderAdmin = () => {

    const { username, avatar, token } = useSelector(state => state.accountAdmin)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const admin = useSelector(state => state.accountAdmin)

    const headerStyle = {
        color: 'black',
        height: 65,
        lineHeight: '65px',
        backgroundColor: '#fff',
        borderBottom: 'solid 1px #4096ff'
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [file, setFile] = useState(undefined)
    const [form] = Form.useForm()

    return (
        <>
            <Modal title="Thông tin tài khoản" width={700} open={isModalOpen} onCancel={handleCancel} footer={null}>
                {/* {avatar} */}

                <Row style={{
                    display: 'flex',
                    marginBottom: '10px'
                }}>
                    <img src={`http://localhost:8000/${avatar}`} style={{
                        aspectRatio: '1 / 1',
                        objectFit: 'cover',
                        height: '150px',
                        margin: '10px 20px 10px 0'
                    }} />

                    <div className='thong_tin_tk'>
                        <Row>
                            <Upload

                                listType="picture"
                                maxCount={1}
                                beforeUpload={() => false}
                                onChange={(value) => {
                                    setFile(value.fileList[0])

                                }}
                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>

                            </Upload>

                        </Row>
                        <Row style={{
                            marginTop: '10px'
                        }}>
                            <Button
                                onClick={() => {
                                    console.log(file)
                                    if (file != undefined) {
                                        console.log(file)

                                        const formData = new FormData();
                                        formData.append('avatar', file.originFileObj, file.name);
                                        formData.append('account_id', admin.account_id);

                                        apiUpdateAvatar(token, formData)
                                            .then(res => {
                                                console.log(res.data.msg)
                                                if (res.data.success) {
                                                    apiGetAdminById(admin.token, admin.account_id)
                                                        .then(res => {
                                                            if (res.data.success) [
                                                                dispatch(updateAvatarAdmin(res.data.data.account.avatar))
                                                            ]
                                                        })
                                                        .catch(err => {
                                                            console.log(err)
                                                        })

                                                }
                                            })
                                            .catch(err => {
                                                console.log(err)
                                            })
                                    }
                                }}
                                type='primary' >
                                Cập nhật avatar
                            </Button>
                        </Row>
                    </div>
                </Row>
                <Form onFinish={value => {
                    console.log('value', { ...value, admin_id: admin.admin_id })


                    apiEditAdmin(token, { ...value, admin_id: admin.admin_id })
                        .then(res => {
                            if (res.data.success) {
                                console.log(res.data.msg)
                                dispatch(updateInfoAdmin(value))
                            } else {
                                console.log(res.data.msg)

                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }}>
                    <Form.Item
                        name='name'
                        label='Tên quản trị viên'
                        labelAlign='left'
                        wrapperCol={{
                            flex: 1
                        }}
                        labelCol={{
                            flex: '120px',

                        }}
                        rules={[
                            {
                                required: true,
                                message: 'không được bỏ trống',
                            },
                        ]}
                        initialValue={admin.name}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name='email'
                        label='Email'
                        labelAlign='left'
                        wrapperCol={{
                            flex: 1
                        }}
                        labelCol={{
                            flex: '120px',

                        }}
                        rules={[
                            {
                                required: true,
                                message: 'không được bỏ trống',
                            },
                        ]}
                        initialValue={admin.email}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name='address'
                        label='Địa chỉ'
                        labelAlign='left'
                        wrapperCol={{
                            flex: 1
                        }}
                        labelCol={{
                            flex: '120px',

                        }}
                        rules={[
                            {
                                required: true,
                                message: 'không được bỏ trống',
                            },
                        ]}
                        initialValue={admin.address}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name='phone'
                        label='Số điện thoại'
                        labelAlign='left'
                        wrapperCol={{
                            flex: 1
                        }}
                        labelCol={{
                            flex: '120px',

                        }}
                        rules={[
                            {
                                required: true,
                                message: 'không được bỏ trống',
                            },
                        ]}
                        initialValue={admin.phone}
                    >
                        <Input />
                    </Form.Item>



                    <Row>
                        <Button htmlType='submit' type='primary'>
                            Cập nhật
                        </Button>
                    </Row>
                </Form>

                <Form className='thong_tin_tk' form={form} onFinish={value => {
                    console.log('value', {
                        ...value,
                        id: admin.account_id
                    })
                    apiChagePassword(token, {
                        ...value,
                        id: admin.account_id
                    })
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
                }}>
                    <Form.Item
                        name="password"
                        label="Mật khẩu cũ"
                        labelAlign='left'
                        initialValue={null}
                        wrapperCol={{
                            flex: 1
                        }}
                        labelCol={{
                            flex: '120px',

                        }}
                        rules={[
                            {
                                required: true,
                                message: 'không được bỏ trống',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Nhap mat khau..." minLength={5} />
                    </Form.Item>

                    <Form.Item
                        name="new_password"
                        label="Mật khẩu mới"
                        labelAlign='left'
                        initialValue={null}
                        wrapperCol={{
                            flex: 1
                        }}
                        labelCol={{
                            flex: '120px',

                        }}
                        rules={[
                            {
                                required: true,
                                message: 'không được bỏ trống',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Nhap mat khau..." minLength={5} />
                    </Form.Item>


                    <Row>
                        <Button htmlType='submit' type='primary' >
                            Cập nhật mật khẩu
                        </Button>
                    </Row>
                </Form>




            </Modal>
            <Header style={headerStyle} className='header_admin'>
                <div className='anh_logo'>
                    <img src='/logo_admin/logo.png' />
                </div>

                <div className='thong_tin_dang_nhap'>

                    <div className='ten_tai_khoan'>
                        <strong>
                            {username ? username : <Spin />}
                        </strong>
                    </div>

                    <div className='anh_dang_nhap'>
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: 1,
                                        label: (
                                            <>
                                                <div onClick={showModal}>Thông tin tài khoản</div>

                                            </>
                                        ),
                                    },
                                    {
                                        key: 2,
                                        label: (
                                            <>
                                                <div
                                                    onClick={() => {

                                                        apiLogout(token)
                                                            .then(response => {
                                                                console.log('Đăng xuất thành công!');
                                                                return;
                                                            })
                                                            .catch(error => {
                                                                console.log(error)
                                                                if (error.response.status != undefined && error.response.status === 401) {
                                                                    console.log("Phiên đã hết vui lòng đăng nhập lại!")
                                                                    return;
                                                                }
                                                                console.log('error', error)
                                                            })

                                                        dispatch(resetAccountAdmin());
                                                        navigate('/admin/dang-nhap')
                                                    }}
                                                >
                                                    Đăng xuất
                                                </div>
                                            </>
                                        ),
                                    },
                                ],
                            }}
                            placement="bottomLeft"
                        >
                            <img src={'http://localhost:8000/' + avatar} alt='' />
                        </Dropdown>
                    </div>




                </div>
            </Header>
        </>
    )
}