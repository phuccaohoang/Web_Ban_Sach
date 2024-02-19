
import { LayoutAdmin } from '../../components/adminComponents/LayoutAdminComponent/LayoutAdmin';
import { TableAdmins } from '../../components/adminComponents/TableComponents/TableAdminsComponent/TableAdmins';
import { useDispatch, useSelector } from 'react-redux';
import { updateAddressPage } from "../../redux/slices/addressPageSlice";
import { useEffect, useState } from 'react';
import { apiGetAdmins } from '../../API/apiAdmins';
import { Skeleton } from 'antd';

export const AdminsPageAdmin = (props) => {
    const dispatch = useDispatch()
    dispatch(updateAddressPage(props.url))

    const [data, setData] = useState(null);
    const { token } = useSelector(state => state.accountAdmin)
    const { refesh } = useSelector(state => state.refesh)

    useEffect(() => {
        apiGetAdmins(token)
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
        <TableAdmins data={data} />
    </>;
    return (
        <>
            <LayoutAdmin mainContent={mainContent} />
        </>
    )
}