import axios from "axios";

export const apiAddCart = async (token, data) => {
    return await axios({
        url: "http://localhost:8000/api/them-gio-hang",
        method: "post",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify(data)
    })
}
export const apiDelCart = async (token, data) => {
    return await axios({
        url: "http://localhost:8000/api/xoa-gio-hang",
        method: "delete",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify(data)
    })
}

export const apiGetCartsById = async (token, id) => {
    return await axios({
        url: `http://localhost:8000/api/gio-hang/${id}`,
        method: "get",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },

    })
}

export const apiEditQuantityCart = async (token, data) => {
    return await axios({
        url: "http://localhost:8000/api/sua-gio-hang",
        method: "patch",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify(data)
    })
}

