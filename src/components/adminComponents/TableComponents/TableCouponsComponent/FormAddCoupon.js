import { Col, Form, Input, InputNumber, Row, Button, Select } from 'antd';
const { Option } = Select;

import { apiAddCoupon } from '../../../../API/apiCoupons'
import { useSelector, useDispatch } from 'react-redux'
import { updateRefesh } from '../../../../redux/slices/refeshSlice';


export const FormAddCoupon = () => {

    const dispatch = useDispatch()
    const { token } = useSelector(state => state.accountAdmin)

    return (
        <>
            <Form layout="vertical" onFinish={(value) => {
                console.log(value)

                apiAddCoupon(token, value)
                    .then(res => {
                        if (res.data.success) {
                            console.log(res.data.msg)
                            dispatch(updateRefesh())
                        } else {
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
                            name="note"
                            label="Chu thich"

                        >
                            <Input.TextArea rows={4} placeholder="Nhap chu thich..." />
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={16} className='edit_size_number_admin'>
                    <Col span={12}>
                        <Form.Item
                            name="min"
                            label="Don hang toi thieu"
                            rules={[
                                {
                                    required: true,
                                    message: "Khong dc de trong"
                                }
                            ]}
                        >
                            <InputNumber addonAfter="VND" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            name="discount"
                            label="Giam gia"
                            rules={[
                                {
                                    required: true,
                                    message: "Khong dc de trong"
                                }
                            ]}

                        >
                            <InputNumber addonAfter="%" min={0} max={100} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item
                            name="type_coupon_id"
                            label="Loai phieu giam"

                            rules={[
                                {
                                    required: true,
                                    message: "Hãy chọn loại phiếu giảm"
                                }
                            ]}

                        >
                            <Select placeholder="Hãy chọn loại phiếu giảm">
                                <Option value={1}>Vận chuyển</Option>
                                <Option value={2}>Hóa đơn</Option>
                            </Select>
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
                            Them
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}