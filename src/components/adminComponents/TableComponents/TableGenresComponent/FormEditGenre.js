import { Form, Row, Col, Input, Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { updateRefesh } from '../../../../redux/slices/refeshSlice';
import { apiEditGenre } from '../../../../API/apiGenres';

export const FormEditGenre = (props) => {
    const { token } = useSelector(state => state.accountAdmin)
    const dispatch = useDispatch()
    return (
        <>
            <Form layout='vertical' onFinish={(value) => {
                console.log('value', value)
                apiEditGenre(token, {
                    genre_id: props.data.id,
                    name: value.name,
                    description: value.description
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
                            name='name'
                            label="Tên thể loại"
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được bỏ trống'
                                }
                            ]}
                            initialValue={props.data.name}
                        >
                            <Input placeholder='Nhap ten the loai' />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item
                            name='description'
                            label="Mô tả"
                            initialValue={props.discription}
                        >
                            <Input.TextArea rows={4} placeholder='Nhap ten the loai' />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Button type='primary' htmlType='submit'>
                            Cập nhật
                        </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}