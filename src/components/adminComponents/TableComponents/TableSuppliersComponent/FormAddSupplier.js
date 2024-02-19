import { Button, Col, Form, Input, Row, } from 'antd';
import { apiAddSupplier } from '../../../../API/apiSuppliers'
import { useSelector, useDispatch } from 'react-redux'
import { updateRefesh } from '../../../../redux/slices/refeshSlice';

export const FormAddSupplier = () => {
    const dispatch = useDispatch()
    const { token } = useSelector(state => state.accountAdmin)

    return (
        <>
            <Form layout="vertical"
                onFinish={(value) => {
                    console.log('done', value)
                    apiAddSupplier(token, value)
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
                }}

            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Ten nha cung cap"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter user name',
                                },

                            ]}
                        >
                            <Input placeholder="Nhap ten nha cung cap..." />
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
                        >
                            <Input placeholder="Nhap so dien thoai nha cung cap..." />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="email"
                            label="Email nha cung cap"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter user name',
                                },
                                {
                                    type: 'email',
                                    message: 'Please enter email',
                                },
                            ]}
                        >
                            <Input placeholder="Nhap email nha cung cap..." />
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="summary"
                            label="So luoc nha cung cap"

                        >
                            <Input.TextArea rows={4} placeholder="please enter url description" />
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
                        >
                            <Input.TextArea rows={4} placeholder="please enter url description" />
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