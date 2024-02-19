import './LayoutAdmin.css';
import { Layout } from 'antd';
const { Content } = Layout;

import { HeaderAdmin } from '../HeaderAdminComponent/HeaderAdmin';
import { SiderAdmin } from '../SiderAdminComponent/SiderAdmin';
import { FooterAdmin } from '../FooterAdminComponent/FooterAdmin';

export const LayoutAdmin = (props) => {

    const contentStyle = {
        marginTop: '130px',
        marginLeft: '300px',
        padding: '10px 20px',
        backgroundColor: '#fff',
    };

    return (
        <>
            <HeaderAdmin />
            <SiderAdmin />
            <Content className='main_content_admin' style={contentStyle}>{props.mainContent}</Content>
            <FooterAdmin />
        </>
    )
}