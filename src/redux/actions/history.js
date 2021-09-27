import axios from 'axios'
import { API_URL } from '../../helpers/env';


export const ACTION_GET_ALL_HISTORY = () => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    const headers = {
        token: token
    }
    return (dispatch) => {
        dispatch(allHistoryPending())
        axios.get(`${API_URL}transaction/${id}`, {headers}).then((response) => {
            dispatch(allHistoryFullfilled(response.data.data))
        }).catch((err) => {
            dispatch(allHistoryRejected(err))
        })
    }
}

export const ACTION_GET_DETAILS_HISTORY = (id) => {
    const token = localStorage.getItem('token')
    const headers = {
        token: token
    }
    return (dispatch) => {
        dispatch(detailsHistoryPending())
        axios.get(`${API_URL}transaction-details/${id}`, {headers}).then((response) => {
            dispatch(detailsHistoryFullfilled(response))
        }).catch((err) => {
            dispatch(detailsHistoryRejected(err))
        })
    }
}

export const DELETE_HISTORY = (id) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token')
        const headers = {
            token: token
        }
        axios.delete(`${API_URL}transaction/${id}`, {headers}).then((response) => {
            resolve(response)
        }).catch((err) => {
            reject(err)
        })
    })
}


const allHistoryPending = () => {
    return {
        type: "GET_ALL_HISTORY_PENDING"
    }
}

const allHistoryFullfilled = (payload) => {
    return {
        type: "GET_ALL_HISTORY_FULLFILLED",
        payload
    }
}



const allHistoryRejected = ( payload ) => {
    return {
        type : "GET_DETAILS_HISTORY_REJECTED",
        payload : "An error occurred!",
    }
}

const detailsHistoryPending = () => {
    return {
        type: "GET_DETAILS_HISTORY_PENDING"
    }
}

const detailsHistoryFullfilled = (payload) => {
    return {
        type: "GET_DETAILS_HISTORY_FULLFILLED",
        payload
    }
}



const detailsHistoryRejected = ( payload ) => {
    return {
        type : "GET_DETAILS_HISTORY_REJECTED",
        payload : "An error occurred!",
    }
}