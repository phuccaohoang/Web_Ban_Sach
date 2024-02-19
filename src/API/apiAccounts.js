import axios from 'axios';


export const apiLogin = async (username, password, is_admin = 0) => {
    return await axios({
        method: 'post',
        url: 'http://localhost:8000/api/dang-nhap',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            username: username,
            password: password,
            is_admin: is_admin,
        })
    })
}

export const apiSignUp = async (data) => {
    return await axios({
        method: 'post',
        url: 'http://localhost:8000/api/dang-ky',
        headers: {
            'Content-Type': 'application/json',

        },
        data: JSON.stringify(data)
    })
}

export const apiLogout = async (token) => {
    return await axios({
        method: 'post',
        url: 'http://localhost:8000/api/dang-xuat',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
}

export const apiUpdateAvatar = async (token, fd) => {
    return await axios({
        method: 'post',
        url: 'http://localhost:8000/api/cap-nhat-avatar',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        data: fd
    })
}

export const apiChagePassword = async (token, data) => {
    return await axios({
        method: 'patch',
        url: 'http://localhost:8000/api/doi-mat-khau',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify(data)
    })
}