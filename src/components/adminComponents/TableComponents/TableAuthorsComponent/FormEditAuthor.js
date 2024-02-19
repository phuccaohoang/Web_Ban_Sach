import { Col, Form, Input, Row, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { apiEditAuthor } from '../../../../API/apiAuthors';
import { updateRefesh } from '../../../../redux/slices/refeshSlice';


export const FormEditAuthor = (props) => {
    const { token } = useSelector(state => state.accountAdmin)
    const dispatch = useDispatch()
    return (
        <>
            <Form layout="vertical" onFinish={(value) => {
                console.log('value', value)
                apiEditAuthor(token, {
                    author_id: props.data.id,
                    name: value.name,
                    summary: value.summary
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
            }}>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="name"
                            label="Tên tác giả"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter user name',
                                },
                            ]}
                            initialValue={props.data.name}
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
                            initialValue={props.data.summary}
                        >
                            <Input.TextArea rows={4} placeholder="please enter url description" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Button type='primary' htmlType='submit'>
                            Cap nhat
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}