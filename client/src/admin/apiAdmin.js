import {API} from '../config'


export  const createCategory = (userId,token,category) => {
    return fetch(`${API}/cat/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${token}`,

        },
        body: JSON.stringify(category)
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


export  const CreateProduct = (userId,token,product) => {
    return fetch(`${API}/product/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,

        },
        body: product
    })
    .then(res => res.json())
    .catch(err =>{
        console.log(err)
    })

}