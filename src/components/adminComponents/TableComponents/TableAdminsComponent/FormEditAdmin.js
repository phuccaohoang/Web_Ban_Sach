import { Col, Form, Input, Row, Button } from 'antd';
import { apiEditAdmin } from '../../../../API/apiAdmins';
import { useDispatch, useSelector } from 'react-redux';
import { updateRefesh } from '../../../../redux/slices/refeshSlice';
import { updateInfoAdmin } from '../../../../redux/slices/accountAdminSlice';


export const FormEditAdmin = (props) => {

    const { token, admin_id } = useSelector(state => state.accountAdmin)
    const dispatch = useDispatch()

    return (
        <>
            <Form layout="vertical" onFinish={value => {
                console.log('value', value)
                apiEditAdmin(token, { ...value, admin_id })
                    .then(res => {
                        if (res.data.success) {
                            console.log(res.data.msg)
                            dispatch(updateRefesh())

                            if (admin_id === props.data.id) {
                                console.log('thay doi thong tin acc dang dang nhap')
                                dispatch(updateInfoAdmin(value))
                            }
                        } else {
                            console.log(res.data.msg)

                        }
                    })
                    .catch(err => {
                        console.log(err)
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
                                    message: 'Please enter user name',
                                },
                            ]}
                            initialValue={props.data.name}
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
                                    message: 'Please enter user name',
                                },
                            ]}
                            initialValue={props.data.phone}
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
                                    message: 'Please enter user name',
                                },
                            ]}
                            initialValue={props.data.email}
                        >
                            <Input placeholder="Nhap email..." />
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
                                    message: 'Please enter user name',
                                },
                            ]}
                            initialValue={props.data.address}
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
                            Cap nhat
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}