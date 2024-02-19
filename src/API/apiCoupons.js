import axios from "axios";

export const apiGetCoupons = async (token) => {
    return await axios({
        url: "http://localhost:8000/api/admin/danh-sach-phieu-giam-gia",
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
}

export const apiAddCoupon = async (token, data) => {
    return await axios({
        url: "http://localhost:8000/api/admin/them-phieu-giam-gia",
        method: "post",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify(data)
    })
}

export const apiDelCoupon = async (token, coupon_id) => {
    return await axios({
        url: "http://localhost:8000/api/admin/xoa-phieu-giam-gia",
        method: "delete",
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
        },
        data: JSON.stringify({
            coupon_id: coupon_id
        })
    })
}