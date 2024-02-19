import axios from "axios";

export const apiGetAdmins = async (token, status = 1) => {
    return await axios({
        url: `http://localhost:8000/api/admin/danh-sach-quan-tri-vien/${status}`,
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
}

export const apiGetAdminById = async (token, id) => {
    return await axios({
        url: "http://localhost:8000/api/admin/quan-tri-vien/" + id,
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
}

export const apiAddAdmin = async (token, data) => {
    return await axios({
        url: "http://localhost:8000/api/admin/them-quan-tri-vien",
        method: "post",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify(data)
    })
}

export const apiDelAdmin = async (token, id) => {
    return await axios({
        url: "http://localhost:8000/api/admin/xoa-quan-tri-vien",
        method: "delete",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",

            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify({ id: id })

    })
}
export const apiRecoveryAdmin = async (token, id) => {
    return await axios({
        url: "http://localhost:8000/api/admin/khoi-phuc-quan-tri-vien",
        method: "patch",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",

            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify({ id: id })

    })
}

export const apiEditAdmin = async (token, data) => {
    return await axios({
        url: "http://localhost:8000/api/admin/sua-quan-tri-vien",
        method: "put",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify(data)
    })
}