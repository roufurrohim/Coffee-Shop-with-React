import axios from 'axios'
import { API_URL } from '../../helpers/env';

export const ACTION_GET_USER = (id) => {
    
    const token = localStorage.getItem('token')
    
    const headers = {
        token: token
    }

    return (dispatch) => {
        dispatch(userPending())
        axios.get(`${API_URL}users/${id}`, {headers} ).then((res) => {
            dispatch(userFullfilled(res.data.data))
        }).catch((err) => {
            dispatch(userRejected(err))
        })
    }
}

export const LOGIN = (payload) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}login`, payload).then((response) => {
            resolve(response.data)
        }).catch((err) => {
            reject(err)
        })
    })
}

export const INSERT = (formData) => {

    return new Promise((resolve, reject) => {
        const headers = {
            'Content-Type': "multipart/form-data",
        }
        axios.post(`${API_URL}register`, formData, { headers }).then((response) => {
            resolve(response)
        }).catch((err) => {
            reject(err)
        })
    })
}

const userPending = () => {
    return {
        type: "GET_USER_PENDING"
    }
}

const userFullfilled = (payload) => {
    return {
        type: "GET_USER_FULLFILLED",
        payload
    }
}

const userRejected = (payload) => {
    return {
        type: "GET_USER_REJECTED",
        payload : "An error occurred!"
    }
}
