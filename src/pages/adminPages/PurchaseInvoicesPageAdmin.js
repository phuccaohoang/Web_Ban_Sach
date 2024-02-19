
import { LayoutAdmin } from '../../components/adminComponents/LayoutAdminComponent/LayoutAdmin';
import { TablePurchaseInvoices } from '../../components/adminComponents/TableComponents/TablePurchaseInvoicesComponent/TablePurchaseInvoices';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddressPage } from "../../redux/slices/addressPageSlice";
import { useEffect, useState } from 'react';
import { apiGetPurchaseInvoices } from '../../API/apiPurchaseInvoice';
import { Skeleton } from 'antd';

export const PurchaseInvoicesPageAdmin = (props) => {
    const dispatch = useDispatch()
    dispatch(updateAddressPage(props.url))

    const [data, setData] = useState(null);
    const { token } = useSelector(state => state.accountAdmin)
    const { refesh } = useSelector(state => state.refesh)

    useEffect(() => {
        apiGetPurchaseInvoices(token)
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
        <TablePurchaseInvoices data={data} />
    </>;
    return (
        <>
            <LayoutAdmin mainContent={mainContent} />
        </>
    )
}