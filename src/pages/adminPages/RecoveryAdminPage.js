
import { LayoutAdmin } from '../../components/adminComponents/LayoutAdminComponent/LayoutAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddressPage } from "../../redux/slices/addressPageSlice";
import { useEffect, useState } from 'react';
import { apiGetAdmins } from '../../API/apiAdmins';
import { Skeleton } from 'antd';
import { TableRecoveryAdmin } from '../../components/adminComponents/TableComponents/TableAdminsComponent/TableRecoveryAdmins';

export const RecoveryAdminPage = (props) => {
    const dispatch = useDispatch()
    dispatch(updateAddressPage(props.url))

    const [data, setData] = useState(null);
    const { token } = useSelector(state => state.accountAdmin)
    const { refesh } = useSelector(state => state.refesh)

    useEffect(() => {
        apiGetAdmins(token, 0)
            .then(response => {
                //console.log(response.data.data)
                if (response.data.success) {
                    setData(response.data.data)
                }

            })
            .catch(err => {
                console.log('err', err)
            })
    }, [refesh])

    const mainContent = data === null ? <Skeleton active={true} /> : <>
        <TableRecoveryAdmin data={data} />
    </>;
    return (
        <>
            <LayoutAdmin mainContent={mainContent} />
        </>
    )
}