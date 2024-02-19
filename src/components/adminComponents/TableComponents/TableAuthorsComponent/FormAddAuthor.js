import { Col, Form, Input, Row, Button } from 'antd';

import { apiAddAuthor } from '../../../../API/apiAuthors'
import { useSelector, useDispatch } from 'react-redux'
import { updateRefesh } from '../../../../redux/slices/refeshSlice';

export const FormAddAuthor = () => {

    const dispatch = useDispatch()
    const { token } = useSelector(state => state.accountAdmin)
    return (
        <>
            <Form layout="vertical" onFinish={(value) => {
                console.log(value)

                apiAddAuthor(token, value)
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
                            label="Ten tac gia"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter user name',
                                },
                            ]}
                        >
                            <Input placeholder="Nhap ten tac gia..." />
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="summary"
                            label="So luoc"

                        >
                            <Input.TextArea rows={4} placeholder="please enter url description" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Button type='primary' htmlType='submit'>
                            Them
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}