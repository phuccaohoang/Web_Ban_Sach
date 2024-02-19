import './FooterAdmin.css';
import { Layout, } from 'antd';
const { Footer } = Layout;

export const FooterAdmin = () => {

    const footerStyle = {
        margin: '10px 0 0 300px',
        backgroundColor: '#fff',
        borderTop: 'solid 1px #4096ff',
    };

    return (
        <>
            <Footer style={footerStyle} className='footer_admin'>
                <div className='noi_dung_footer'>
                    <p>
                        @2024  made by Outboxer009
                    </p>
                </div>
            </Footer>
        </>
    )
}