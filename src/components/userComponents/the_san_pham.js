import './the_san_pham.css'
import { HeartOutlined, ReadOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Rate } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { apiAddCart, apiGetCartsById } from '../../API/apiCustomer';
import { updateCartsCustomer } from '../../redux/slices/accountCustomerSlice';

export const TheSanPham = (props) => {
    const navigate = useNavigate()
    const customer = useSelector(state => state.accountCustomer)
    const dispatch = useDispatch()

    let actions = props.data.is_ebook ? [
        <ReadOutlined style={{ fontSize: '20px' }} />,
        <HeartOutlined style={{ fontSize: '20px' }} />,
    ]
        : [

            <ShoppingCartOutlined style={{ fontSize: '20px' }} onClick={() => {
                if (props.data.quantity < 1) {
                    console.log('Hết hàng')
                    return
                }

                if (!customer.isLogin) {
                    console.log('dang nhap ms thuc hien dc chuc nang')
                    return
                }
                console.log('book', props.data.id)
                console.log('khach', customer.customer_id)

                apiAddCart(customer.token, {
                    book_id: props.data.id,
                    customer_id: customer.customer_id,
                    quantity: 1
                })
                    .then(res => {
                        console.log(res.data)
                        if (res.data.success) {

                            apiGetCartsById(customer.token, customer.customer_id)
                                .then(res => {
                                    if (res.data.success) {
                                        console.log(res.data.data)
                                        dispatch(updateCartsCustomer(res.data.data))
                                    } else {
                                        console.log(res.data.msg)
                                    }
                                })
                                .catch(err => {
                                    console.log(err)
                                })
                        } else {
                            console.log(res.data.msg)
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }} />,
            <HeartOutlined style={{ fontSize: '20px' }} />
        ]



    return <>
        <Card
            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',

            }}
            cover={
                <img
                    style={{
                        aspectRatio: '3 / 4',
                        objectFit: 'cover',
                        width: '100%',
                        cursor: 'pointer'
                    }}
                    src={`http://localhost:8000/${props.data.image_theme}`}
                    onClick={() => {
                        navigate(`/chi-tiet-sach/${props.data.id}`)
                    }}
                />
            }
            actions={actions}
        >
            <div className='noi_dung_the_san_pham'>
                <h3>{props.data.name}</h3>
                <div className='thong_tin_sach'>
                    <p className='tac_gia'>Tác giả: {props.data.author.name}</p>
                    <div className='gia' style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        margin: '10px 0'
                    }}>
                        <mark>Giảm giá: {props.data.discount}%</mark>
                        <strong>{props.data.price * (1 - (props.data.discount / 100))} vnd</strong>

                    </div>
                    <div style={{ marginTop: '10px' }}>

                        {props.data.average_point >= 1 ? <Rate disabled defaultValue={props.data.average_point} /> : 'Chưa có đánh giá'}
                    </div>
                </div>

            </div>
        </Card>
    </>
}