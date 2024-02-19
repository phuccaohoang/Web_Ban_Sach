import axios from "axios";


export const apiGetPurchaseInvoices = async (token) => {
    return axios({
        url: "http://localhost:8000/api/admin/danh-sach-phieu-nhap",
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
}

export const apiAddPurchaseInvoice = async (token, admin_id, supplier_id, data) => {
    return axios({
        url: "http://localhost:8000/api/admin/them-hoa-don-nhap",
        method: "post",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify({
            admin_id: admin_id,
            supplier_id: supplier_id,
            purchase_invoice_details: data,
        })
    })
}