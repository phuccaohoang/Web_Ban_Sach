import axios from "axios";

export const apiAdminGetBooks = async (token, list = 'all', status = 1) => {

    let url = list === 'all' ? `http://localhost:8000/api/admin/danh-sach-sach/${status}`
        : (list === 'ebook' ? `http://localhost:8000/api/admin/danh-sach-ebook/${status}`
            : `http://localhost:8000/api/admin/danh-sach-sach-in/${status}`)
    return await axios({
        url: url,
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
}

export const apiGetBooks = async (list = 'all') => {
    let url = list === 'all' ? `http://localhost:8000/api/danh-sach-sach/1`
        : (list === 'ebook' ? `http://localhost:8000/api/danh-sach-ebook/1`
            : `http://localhost:8000/api/danh-sach-sach-in/1`)
    return await axios({
        url: url,
        method: "get",

    })
}

export const apiGetBookById = async (id) => {
    return await axios({
        url: `http://localhost:8000/api/chi-tiet-sach/${id}`,
        method: 'get',
    })
}

export const apiAddBook = async (token, fd) => {
    return await axios({
        url: "http://localhost:8000/api/admin/them-sach",
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        data: fd
    })
}

export const apiEditBook = async (token, fd) => {
    return await axios({
        url: "http://localhost:8000/api/admin/sua-sach",
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        data: fd
    })
}

export const apiDelBook = async (token, id) => {
    return await axios({
        url: "http://localhost:8000/api/admin/xoa-sach",
        method: "delete",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",

            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify({ id: id })
    })
}

export const apiRecoveryBook = async (token, id) => {
    return await axios({
        url: "http://localhost:8000/api/admin/khoi-phuc-sach",
        method: "patch",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",

            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify({ id: id })
    })
}