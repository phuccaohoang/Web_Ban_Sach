import { useState } from 'react';
import './FilterAdmin.css';
import { Checkbox, Rate, Row, Button, Input, Form } from 'antd';
import { FilterOutlined, RedoOutlined } from '@ant-design/icons';
import { Select } from 'antd';



export const FilterAdmin = (props) => {

    const [data, setData] = useState({
        genres: ['manga', 'manhwa', 'manga', 'manhwa', 'manga', 'manhwa', 'manga', 'manhwa', 'manga', 'manhwa', 'manga', 'manhwa', 'manga', 'manhwa',],
        authors: ['oda', 'sukuna',],
        suppliers: ['whale', 'delay',],
    });


    let checked = {
        genres: [],
        typeBook: -1,
        authors: -1,
        suppliers: -1,
        point: 0,
        price: {
            begin: 0,
            end: -1,
        }
    }


    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <>

            {
                Object.keys(data).length === 0 ? "spin"
                    : <Form className='filter_admin' onChange={(value) => {
                        console.log('check form', value)
                    }}>
                        <div className='main_filter'>
                            {
                                props.filterBooks ? <>
                                    <Row>
                                        <div className='filter_genres'>
                                            <h4>The loai</h4>
                                            <Form.Item
                                            >
                                                <Checkbox.Group
                                                    onChange={(value) => {
                                                        console.log('check group', value)
                                                    }}
                                                    style={{
                                                        display: 'flex',
                                                        columnGap: 15,
                                                        rowGap: 5,
                                                        maxWidth: 1200
                                                    }}
                                                    options={[...data.genres.map((item, idx) => {
                                                        return ({
                                                            value: idx,
                                                            label: item,

                                                        })
                                                    })]}
                                                >

                                                </Checkbox.Group>

                                            </Form.Item>

                                        </div>
                                    </Row>



                                    <Row
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            maxWidth: 1220
                                        }}
                                    >
                                        <div className='filter_authors'>
                                            <h4>Tac gia</h4>
                                            <Form.Item

                                            >
                                                <Select
                                                    style={{
                                                        width: '200px',
                                                    }}
                                                    defaultValue={-1}

                                                    placeholder="Chon tac gia"
                                                    optionFilterProp="children"
                                                    onChange={(value) => {
                                                        console.log('check author', value)
                                                    }}
                                                    filterOption={filterOption}
                                                    options={[
                                                        {
                                                            value: -1,
                                                            label: 'Tat ca',
                                                        },
                                                        ...data.authors.map((item, idx) => {
                                                            return (
                                                                {
                                                                    value: idx,
                                                                    label: item
                                                                }
                                                            )
                                                        })

                                                    ]}
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className='filter_suppliers'>
                                            <h4>Nha cung cap</h4>
                                            <Form.Item

                                            >
                                                <Select
                                                    style={{
                                                        width: '200px',
                                                    }}
                                                    defaultValue={-1}

                                                    placeholder="Chon nha cung cap"
                                                    optionFilterProp="children"
                                                    onChange={(value) => {
                                                        console.log('check supplier', value)
                                                    }}
                                                    filterOption={filterOption}
                                                    options={[
                                                        {
                                                            value: -1,
                                                            label: 'Tat ca',
                                                        },
                                                        ...data.suppliers.map((item, idx) => {
                                                            return (
                                                                {
                                                                    value: idx,
                                                                    label: item
                                                                }
                                                            )
                                                        })
                                                    ]}
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className='filter_rate'>
                                            <h4>Danh gia</h4>
                                            <Form.Item

                                            >
                                                <Rate
                                                    style={{
                                                        fontSize: 25
                                                    }}
                                                    defaultValue={0}
                                                    onChange={(value) => {
                                                        console.log('check point', value)
                                                    }}
                                                />
                                            </Form.Item>
                                        </div>

                                        <div className='filter_price'>
                                            <h4>Gia tien</h4>
                                            <Form.Item

                                            >
                                                <Select
                                                    defaultValue={0}
                                                    style={{
                                                        width: 120,
                                                        marginRight: 10
                                                    }}
                                                    onChange={(value) => {
                                                        console.log('check price begin', value)
                                                    }}
                                                    options={[
                                                        {
                                                            value: 0,
                                                            label: '0',
                                                        },
                                                        {
                                                            value: 50000,
                                                            label: '50000',
                                                        },
                                                        {
                                                            value: 100000,
                                                            label: '100000',
                                                        },
                                                    ]}
                                                />

                                                <Select
                                                    defaultValue={-1}
                                                    style={{
                                                        width: 120,
                                                    }}
                                                    onChange={(value) => {
                                                        console.log('price end', value)
                                                    }}
                                                    options={[
                                                        {
                                                            value: 50000,
                                                            label: '50000',
                                                        },
                                                        {
                                                            value: 100000,
                                                            label: '100000',
                                                        },
                                                        {
                                                            value: -1,
                                                            label: '> 100000',
                                                        },
                                                    ]}
                                                />
                                            </Form.Item>
                                        </div>


                                    </Row>


                                    <Row>
                                        <div className='type_book'>
                                            <h4>Loai sach</h4>
                                            <Form.Item

                                            >
                                                <Select
                                                    style={{
                                                        width: '200px',
                                                        marginBottom: 10,
                                                    }}
                                                    defaultValue={-1}

                                                    placeholder="Chon loai sach"
                                                    optionFilterProp="children"
                                                    onChange={(value) => {
                                                        console.log('check type book', value)
                                                    }}
                                                    filterOption={filterOption}
                                                    options={[
                                                        {
                                                            value: -1,
                                                            label: 'Tat ca',
                                                        },
                                                        {
                                                            value: 0,
                                                            label: "Sach in",
                                                        },
                                                        {
                                                            value: 1,
                                                            label: "E-Book",
                                                        },

                                                    ]}
                                                />
                                            </Form.Item>
                                        </div>
                                    </Row>
                                </> : null

                            }


                            <Row>
                                <Input
                                    placeholder={`Nhap ten ${props.searchText}...`}
                                    type='large'
                                    onChange={(value) => {
                                        console.log('check name', value.currentTarget.value)
                                    }}
                                    style={{
                                        margin: '10px',
                                        fontSize: 16,
                                        maxWidth: 1200,
                                    }}
                                />
                            </Row>
                        </div >
                        <div className='button_filter'>
                            <Button style={{
                                width: 70,
                            }} type="primary" icon={<RedoOutlined />} size={"large"} />
                            <Button style={{
                                width: 70,
                                marginLeft: 10,
                            }} type="primary" icon={<FilterOutlined />} size={"large"} />
                        </div>
                    </Form >
            }

        </>

    )
}