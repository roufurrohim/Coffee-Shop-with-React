import axios from 'axios'
import { API_URL } from '../../helpers/env';

export const ACTION_GET_ALL_PRODUCTS = () => {
    const token = localStorage.getItem('token')
    const headers = {
        token: token
    }
    return (dispatch) => {
        dispatch(allProductPending())
        axios.get(`${API_URL}products`, { headers }).then((response) => {
            dispatch(allProductsFullfilled(response.data))
        }).catch((err) => {
            dispatch(allProductsRejected(err))
        })
    }
}

export const INSERT = (formData) => {
    console.log(formData)

    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token')
        const headers = {
            'Content-Type': "multipart/form-data",
            token: token
        }
        axios.post(`${API_URL}products`, formData, { headers }).then((response) => {
            resolve(response)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const DELETE = (id) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token')
        const headers = {
            token: token
        }
        axios.delete(`${API_URL}products/${id}`, { headers }).then((response) => {
            resolve(response)
        }).catch((err) => {
            reject(err)
        })
    })
}

const allProductPending = () => {
    return {
        type: "GET_ALL_PRODUCTS_PENDING"
    }
}

const allProductsFullfilled = (payload) => {
    return {
        type: "GET_ALL_PRODUCTS_FULLFILLED",
        payload
    }
}



const allProductsRejected = ( payload ) => {
    return {
        type : "GET_ALL_PRODUCTS_REJECTED",
        payload : "An error occurred!",
    }
}