import {API} from '../config'
import queryString from 'query-string'

export const getProduct = (sortBy) => {
    return fetch(`${API}/product?sortBy=${sortBy}&order=desc&limit=6`, {
        method: 'GET',
      
    })
    .then(res => res.json())
    .catch(err =>{
        console.log(err)
    })
}

export const getCategory = () => {
    return fetch(`${API}/cat`, {
        method: 'GET',
      
    })
    .then(res => res.json())
    .catch(err =>{
        console.log(err)
    })
}

export  const getFilterProduct = (skip, limit, filters = {} ) => {
    const data = { limit, skip, filters}
    return fetch(`${API}/product/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',

        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .catch(err =>{
        console.log(err)
    })

}

export const list = params => {
    const query = queryString.stringify(params)
    // console.log("query",query)
    return fetch(`${API}/product/searchProduct?${query}`, { 
        method: 'GET',  
      
    })
    .then(res => res.json())
    .catch(err =>{
        console.log(err)
    })
}

export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET',
      
    })
    .then(res => res.json())
    .catch(err =>{
        console.log(err)
    })
}

export const getRelated = (productId) => {
    return fetch(`${API}/product/related/${productId}`, {
        method: 'GET',
      
    })
    .then(res => res.json())
    .catch(err =>{
        console.log(err)
    })
}

export const getBraintreeClientToken = (userId,token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`,

        }
    })
    .then(res => res.json())
    .catch(err =>{
        console.log(err)
    })
}

export const processPayment = (userId,token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify(paymentData)
    })
    .then(res => res.json())
    .catch(err =>{
        console.log(err)
    })
}

export const createOrder = (userId,token, orderData) => {
    return fetch(`${API}/order/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify({order: orderData})
    })
    .then(res => res.json())
    .catch(err =>{
        console.log(err)
    })
}