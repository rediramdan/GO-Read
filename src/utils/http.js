import axios from 'axios';
import qs from 'qs'

const BASE_URL  = process.env.REACT_APP_API_BASE_URL

export const getAllBooks = (props) => {
    const {search,sort,asc,requestPage,limit} = props
    const requestData = {
        search,sort,asc,requestPage,limit
    }
    return axios.get(`${BASE_URL}/book?${qs.stringify(requestData)}`)
}

export const getMyBooks = (props) => {
    const API_T = localStorage.getItem('token')
    const {search,sort,asc,requestPage,limit} = props
    const requestData = {
        search,sort,asc,requestPage,limit
    }
    return axios.get(`${BASE_URL}/book/mybooks?${qs.stringify(requestData)}`,{
        headers:{
            'Authorization' : `Bearer ${API_T}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}

export const getHistory = (props) => {
    const API_T = localStorage.getItem('token')
    const {requestPage,limit} = props
    const requestData = {
        requestPage,limit
    }
    return axios.get(`${BASE_URL}/book/history?${qs.stringify(requestData)}`,{
        headers:{
            'Authorization' : `Bearer ${API_T}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}

export const getBookById = (bookId) => {
    return axios.get(`${BASE_URL}/book/${bookId}`)
}

export const putBook = (body, id) => {
    const API_TOKEN = localStorage.getItem('token')
    const data = new FormData()
    data.append('title', body.title) 
    data.append('description', body.description) 
    if(body.image){data.append('image', body.image)} 
    data.append('id_author', body.id_author) 
    data.append('id_genre', body.id_genre) 
    return axios.put(`${BASE_URL}/book/${id}`,data,{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'multipart/form-data',
            'Type' : 'formData'
        }
    })
}

export const deleteBook = (id) => {
    const API_TOKEN = localStorage.getItem('token')
    return axios.delete(`${BASE_URL}/book/${id}`,{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}

export const deleteHistory = (id) => {
    const API_TOKEN = localStorage.getItem('token')
    return axios.delete(`${BASE_URL}/book/history/${id}`,{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}

export const postBook = (body) => {
    const API_TOKEN = localStorage.getItem('token')
    const data = new FormData()
    data.append('title', body.title) 
    data.append('description', body.description) 
    if(body.image){data.append('image', body.image)} 
    data.append('id_author', body.id_author) 
    data.append('id_genre', body.id_genre) 
    return axios.post(`${BASE_URL}/book`,data,{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'multipart/form-data',
            'Type' : 'formData'
        }
    })
}

export const transactionBook = (body,id) => {
    const API_TOKEN = localStorage.getItem('token')
    return axios.put(`${BASE_URL}/book/transaction/${id}`,qs.stringify(body),{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}

export const checkBook = (id) => {
    const API_TOKEN = localStorage.getItem('token')
    return axios.get(`${BASE_URL}/book/check/${id}`,{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}


export const getAuthor = () => {
    return axios.get(`${BASE_URL}/author`)
}

export const putAuthor = (body, id) => {
    const API_TOKEN = localStorage.getItem('token')
    return axios.put(`${BASE_URL}/author/${id}`,qs.stringify(body),{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}

export const deleteAuthor = (id) => {
    const API_TOKEN = localStorage.getItem('token')
    return axios.delete(`${BASE_URL}/author/${id}`,{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}

export const postAuthor = (body) => {
    const API_TOKEN = localStorage.getItem('token')
    return axios.post(`${BASE_URL}/author`,qs.stringify(body),{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}

export const getGenre = () => {
    return axios.get(`${BASE_URL}/genre`)
}

export const putGenre = (body, id) => {
    const API_TOKEN = localStorage.getItem('token')
    return axios.put(`${BASE_URL}/genre/${id}`,qs.stringify(body),{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}

export const deleteGenre = (id) => {
    const API_TOKEN = localStorage.getItem('token')
    return axios.delete(`${BASE_URL}/genre/${id}`,{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}

export const postGenre = (body) => {
    const API_TOKEN = localStorage.getItem('token')
    return axios.post(`${BASE_URL}/genre`,qs.stringify(body),{
        headers:{
            'Authorization' : `Bearer ${API_TOKEN}`,
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
}

export const postLogin = (body) => {
    return axios.post(`${BASE_URL}/auth/login`,qs.stringify(body))
}

export const postRegister = (body) => {
    return axios.post(`${BASE_URL}/auth/register`,qs.stringify(body))
}

export const postLogout = (body) => {
    return axios.post(`${BASE_URL}/auth/logout`,qs.stringify(body))
}

export const refreshToken = (body) => {
    return axios.post(`${BASE_URL}/auth/token`,qs.stringify(body))
}