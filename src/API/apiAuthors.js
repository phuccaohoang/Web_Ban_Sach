import axios from "axios";


export const apiAdminGetAuthors = async (token) => {
    return await axios({
        url: "http://localhost:8000/api/admin/danh-sach-tac-gia",
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
}

export const apiAddAuthor = async (token, data) => {
    return await axios({
        url: "http://localhost:8000/api/admin/them-tac-gia",
        method: "post",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify(data)
    })
}

export const apiEditAuthor = async (token, data) => {
    return await axios({
        url: "http://localhost:8000/api/admin/sua-tac-gia",
        method: "put",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify(data)
    })
}