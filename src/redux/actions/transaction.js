import axios from 'axios'
import { API_URL } from '../../helpers/env';

export const INSERT_TRANS = (payload) => {
    const token = localStorage.getItem('token')
    
    return new Promise((resolve, reject) => {
        const headers = {
            'Content-Type': "application/json",
            'token': token
        }
        console.log(headers)
        axios.post(`${API_URL}transaction`, payload, { headers }).then((response) => {
            resolve(response)
        }).catch((err) => {
            reject(err)
        })
    })
}