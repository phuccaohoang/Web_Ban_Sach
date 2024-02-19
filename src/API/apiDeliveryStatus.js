import axios from "axios";

export const apiGetDeliveryStatus = async (token) => {
    return await axios({
        url: "http://localhost:8000/api/trang-thai-hoa-don",
        method: "get",
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },

    })
}