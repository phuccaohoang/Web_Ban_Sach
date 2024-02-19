import axios from 'axios'


export const apiAdminGetSlideshows = async (token) => {
    return axios({
        url: "http://localhost:8000/api/admin/danh-sach-slideshow",
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },

    })
}


export const apiAddSlideshows = async (token, fd) => {
    return await axios({
        url: "http://localhost:8000/api/admin/them-slideshow",
        method: "post",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        data: fd
    })
}

export const apiDelSlideshow = async (token, slide_id) => {
    return await axios({
        url: "http://localhost:8000/api/admin/xoa-slideshow",
        method: "delete",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify({
            slide_id: slide_id
        })
    })
}

export const apiGetSlideshows = async () => {
    return axios({
        url: "http://localhost:8000/api/danh-sach-slideshow",
        method: 'get',


    })
}