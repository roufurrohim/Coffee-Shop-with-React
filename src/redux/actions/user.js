import axios from 'axios'
import { API_URL } from '../../helpers/env';

export const ACTION_GET_USER = (payload) => {

    return (dispatch) => {
        dispatch(userPending())
        axios.post(`${API_URL}login`, payload ).then((res) => {
            // console.log(res.data.data)
            dispatch(userFullfilled(res.data.data))
        }).catch((err) => {
            dispatch(userRejected(err))
        })
    }
}

export const INSERT = (formData) => {

    return new Promise((resolve, reject) => {
        const headers = {
            'Content-Type': "multipart/form-data",
        }
        axios.post(`${API_URL}register`, formData, { headers }).then((response) => {
            
            resolve(response.data.data)
        }).catch((err) => {
            console.log(err)
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
