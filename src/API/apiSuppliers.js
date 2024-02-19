import axios from "axios";

export const apiAdminGetSuppliers = async (token) => {
    return axios({
        url: "http://localhost:8000/api/admin/danh-sach-nha-cung-cap",
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
}

export const apiAddSupplier = async (token, data) => {
    return await axios({
        url: "http://localhost:8000/api/admin/them-nha-cung-cap",
        method: "post",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify(data)
    })
}

export const apiEditSupplier = async (token, data) => {
    return await axios({
        url: "http://localhost:8000/api/admin/sua-nha-cung-cap",
        method: "put",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify(data)
    })
}