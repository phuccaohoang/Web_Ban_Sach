import axios from "axios";


export const apiAdminGetGenres = async (token) => {
    return await axios({
        url: "http://localhost:8000/api/admin/danh-sach-the-loai",
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
}

export const apiAddGenre = async (token, data) => {
    return await axios({
        url: "http://localhost:8000/api/admin/them-the-loai",
        method: "post",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify(data)
    })
}

export const apiEditGenre = async (token, data) => {
    return await axios({
        url: "http://localhost:8000/api/admin/sua-the-loai",
        method: "put",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify(data)
    })
}