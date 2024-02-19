import { Button, Col, Form, Input, Row, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { apiEditSupplier } from '../../../../API/apiSuppliers';
import { updateRefesh } from '../../../../redux/slices/refeshSlice';


export const FormEditSupplier = (props) => {

    const { token } = useSelector(state => state.accountAdmin)
    const dispatch = useDispatch()

    console.log(props.data)
    return (
        <>
            <Form layout="vertical"
                onFinish={(value) => {
                    console.log('done', { ...value, supplier_id: props.data.id })
                    apiEditSupplier(token, {
                        ...value,
                        supplier_id: props.data.id
                    })
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
                }}

            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Tên nhà cung cấp"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter user name',
                                },
                            ]}
                            initialValue={props.data.name}
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
                            initialValue={props.data.phone}
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
                            ]}
                            initialValue={props.data.email}
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
                            initialValue={props.data.summary}
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
                                    message: "Không được bỏ trống"
                                }
                            ]}
                            initialValue={props.data.address}
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
                            Cap nhat
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}