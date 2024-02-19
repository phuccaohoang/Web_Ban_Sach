

import { LayoutAdmin } from '../../components/adminComponents/LayoutAdminComponent/LayoutAdmin';
import { TableBooks } from '../../components/adminComponents/TableComponents/TableBooksComponent/TableBooks';


import { useDispatch, useSelector } from 'react-redux';
import { updateAddressPage } from "../../redux/slices/addressPageSlice";
import { useEffect, useState } from 'react';
import { apiAdminGetBooks } from '../../API/apiBooks';
import { Skeleton } from 'antd';


export const BooksPageAdmin = (props) => {


    const dispatch = useDispatch()
    dispatch(updateAddressPage(props.url))

    const [data, setData] = useState(null);

    const { token } = useSelector(state => state.accountAdmin)
    const { refesh } = useSelector(state => state.refesh)

    useEffect(() => {
        apiAdminGetBooks(token)
            .then(response => {
                //console.log('data', response.data)
                if (response.data.success) {
                    setData(response.data.data)
                }
            })
            .catch(err => {
                console.log('err', err)
            })
    }, [refesh])

    const mainContent = data === null ? <Skeleton active={true} />
        : <>
            <TableBooks data={data} />
        </>;
    return (
        <>
            <LayoutAdmin mainContent={mainContent} />
        </>
    )
}