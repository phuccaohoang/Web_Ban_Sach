import './TableSalesInvoices.css';
import '../Tables.css';
import { Row, Table, Button, Checkbox } from 'antd';
//Drawer
import { useState } from 'react';
import { Col, Drawer, Form, Input, Select, Space } from 'antd';
import { DetailSalesInvoice } from './DetailSalesInvoice';
const { Option } = Select;
//Drawer

export const TableEbookInvoice = (props) => {

    let data = [];
    if (props.data !== null) {

        for (let i = 0; i < 100; i++) {
            data.push({
                key: i,
                name: i,
                author: "Tac gia 1",
            });
        }
    }

    const columns = [
        {
            title: 'ID',
            width: 70,
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Khách hàng',
            width: 100,
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Giá tiền (VND)',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            width: 150,
        },
        {
            title: 'Giảm giá (%)',
            dataIndex: 'discountEBook',
            key: 'discountEBook',
            width: 150,
        },
        {
            title: 'Giảm giá hóa đơn (%)',
            dataIndex: 'discountInvoice',
            key: 'discountInvoice',
            width: 150,
        },
        {
            title: 'Thành tiền',
            dataIndex: 'intoCash',
            key: 'intoCash',
            width: 150,
        }
    ];



    return (
        <>
            <div className='bang_danh_sach'>

                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    scroll={{
                        x: 1500,
                        y: 700,
                    }}
                    pagination={
                        {
                            defaultCurrent: 1,
                            defaultPageSize: 10,
                            // showSizeChanger: false,
                        }
                    }
                />
            </div>
        </>
    )
}