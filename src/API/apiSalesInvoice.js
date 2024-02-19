import axios from "axios";

export const apiSalesInvoices = async (token) => {
    return axios({
        url: "http://localhost:8000/api/admin/danh-sach-hoa-don-ban-sach-in",
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
}


export const apiEbookSalesInvoices = async (token) => {
    return axios({
        url: "http://localhost:8000/api/admin/danh-sach-hoa-don-ban-ebook",
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
}


export const apiAddSalesInvoice = async (token, data) => {
    return axios({
        url: "http://localhost:8000/api/them-hoa-don-ban",
        method: "post",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify(data)
    })
}