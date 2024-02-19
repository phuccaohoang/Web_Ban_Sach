import { Button, Col, Form, Input, Row, } from 'antd';
import { apiAddGenre } from '../../../../API/apiGenres'
import { useSelector, useDispatch } from 'react-redux'
import { updateRefesh } from '../../../../redux/slices/refeshSlice';

export const FormAddGenre = () => {

    const dispatch = useDispatch()
    const { token } = useSelector(state => state.accountAdmin)
    return (
        <>
            <Form layout="vertical"
                onFinish={(value) => {
                    console.log('done', value)
                    apiAddGenre(token, value)
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
                            label="Ten the loai"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter user name',
                                },
                            ]}
                        >
                            <Input placeholder="Nhap ten the loai..." />
                        </Form.Item>
                    </Col>

                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name="description"
                            label="Mo ta the loai"

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