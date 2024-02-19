
import { LayoutAdmin } from '../../components/adminComponents/LayoutAdminComponent/LayoutAdmin';

import { useDispatch, useSelector } from 'react-redux';
import { updateAddressPage } from "../../redux/slices/addressPageSlice";
import { Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { TableEbookInvoice } from '../../components/adminComponents/TableComponents/TableSalesInvoicesComponent/TableEbookInvoice';
import { apiEbookSalesInvoices } from '../../API/apiSalesInvoice';

export const EbookSalesInvoice = (props) => {
    const dispatch = useDispatch()
    dispatch(updateAddressPage(props.url))

    const [data, setData] = useState(null);
    const { token } = useSelector(state => state.accountAdmin)
    const { refesh } = useSelector(state => state.refesh)

    useEffect(() => {
        apiEbookSalesInvoices(token)
            .then(res => {
                if (res.data.success) {
                    setData(res.data.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [refesh])

    const mainContent = data === null ? <Skeleton active={true} /> : <>
        <TableEbookInvoice data={data} />
    </>;
    return (
        <>
            <LayoutAdmin mainContent={mainContent} />
        </>
    )
}