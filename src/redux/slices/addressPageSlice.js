import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    url: ['trang-chu'],
    breadcrumb: [
        {
            title: "Trang chu",
        },
    ],
}

export const addressPageSlice = createSlice({
    name: 'addressPage',
    initialState,
    reducers: {
        updateAddressPage: (state, action) => {

            state.url = action.payload

            state.breadcrumb = [
                {
                    title: 'Trang chu',
                },
                ...action.payload.map(item => {

                    switch (item) {
                        case "sach": {
                            return ({
                                title: "Quan ly sach"
                            })
                        }

                        case "the-loai": {
                            return ({
                                title: "Quan ly the loai"
                            })
                        }

                        case "tac-gia": {
                            return ({
                                title: "Quan ly tac gia"
                            })
                        }

                        case "nha-cung-cap": {
                            return ({
                                title: "Quan ly nha cung cap"
                            })
                        }

                        case "hoa-don-xuat": {
                            return ({
                                title: "Quan ly hoa don xuat"
                            })
                        }

                        case "hoa-don-nhap": {
                            return ({
                                title: "Quan ly hoa don nhap"
                            })
                        }

                        case "quan-tri-vien": {
                            return ({
                                title: "Quan ly quan tri vien"
                            })
                        }

                        case "slideshow": {
                            return ({
                                title: "Quan ly slideshow"
                            })
                        }

                        case "danh-sach-sach":
                        case "danh-sach-quan-tri-vien": {
                            return ({
                                title: "Danh sach"
                            })
                        }

                        case "danh-sach-sach-in": {
                            return ({
                                title: "Danh sach sach in"
                            })
                        }

                        case "danh-sach-e-book": {
                            return ({
                                title: "Danh sach E-Book"
                            })
                        }

                        case "khoi-phuc-quan-tri-vien":
                        case "khoi-phuc-sach": {
                            return ({
                                title: "Khoi phuc"
                            })
                        }

                        case "phieu-giam-gia": {
                            return ({
                                title: "Phieu giam gia"
                            })
                        }



                    }
                })
            ]
        }
    },
})

export const { updateAddressPage } = addressPageSlice.actions

export default addressPageSlice.reducer