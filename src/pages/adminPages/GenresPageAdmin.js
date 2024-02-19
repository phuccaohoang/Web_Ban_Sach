import { LayoutAdmin } from '../../components/adminComponents/LayoutAdminComponent/LayoutAdmin';
import { TableGenres } from '../../components/adminComponents/TableComponents/TableGenresComponent/TableGenres';

import { useDispatch, useSelector } from 'react-redux';
import { updateAddressPage } from "../../redux/slices/addressPageSlice";
import { useEffect, useState } from 'react';
import { apiAdminGetGenres } from '../../API/apiGenres';
import { Skeleton } from 'antd';

export const GenresPageAdmin = (props) => {
    const dispatch = useDispatch()
    dispatch(updateAddressPage(props.url))

    const [data, setData] = useState(null);
    const { token } = useSelector(state => state.accountAdmin)
    const { refesh } = useSelector(state => state.refesh)


    useEffect(() => {

        apiAdminGetGenres(token)
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
        <TableGenres data={data} />
    </>

    return (
        <>
            <LayoutAdmin mainContent={mainContent} />
        </>
    )
}