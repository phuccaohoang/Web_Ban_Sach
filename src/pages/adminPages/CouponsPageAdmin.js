import { LayoutAdmin } from '../../components/adminComponents/LayoutAdminComponent/LayoutAdmin';
import { TableCoupons } from '../../components/adminComponents/TableComponents/TableCouponsComponent/TableCoupons';

import { useDispatch, useSelector } from 'react-redux';
import { updateAddressPage } from "../../redux/slices/addressPageSlice";
import { useEffect, useState } from 'react';
import { apiGetCoupons } from '../../API/apiCoupons';
import { Skeleton } from 'antd';

export const CouponsPageAdmin = (props) => {
    const dispatch = useDispatch()
    dispatch(updateAddressPage(props.url))

    const { token } = useSelector(state => state.accountAdmin)
    const { refesh } = useSelector(state => state.refesh)

    const [data, setData] = useState(null)

    useEffect(() => {
        apiGetCoupons(token)
            .then(response => {
                if (response.data.success) {
                    setData(response.data.data)
                }
            })
            .catch(err => {
                console.log('err', err)
            })
    }, [refesh])

    const mainContent = data === null ? <Skeleton active={true} /> : <>
        <TableCoupons data={data} />
    </>

    return (
        <>
            <LayoutAdmin mainContent={mainContent} />
        </>
    )
}