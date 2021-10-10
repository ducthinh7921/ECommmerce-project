import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getProduct,getBraintreeClientToken,processPayment,createOrder} from './apiCore'
import CardProduct from './card'
import {isAuthenticated} from '../auth/index'
import { Link} from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react"
import {emptyCart} from './cartHelper'

const Checkout = ({product}) => {

    const [data, setData] = useState({
        loading: false,
        success: false, 
        clientToken: null,
        error:"",
        instance:{},
        address: ""
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken  = (userId,token) => {
        getBraintreeClientToken(userId,token)
            .then(data => {
                if(data.error){
                    setData({...data, error: data.error})
                }else {
                    setData({ clientToken: data.clientToken})
                }
            })
    }

    useEffect(() => {
        getToken(userId,token)
    },[])

    const handleAddress = event => {
        setData({...data,address: event.target.value})
    }

    const getTotal = () => {
        return product.reduce((curValue, newValue) => {
            return curValue + newValue.count * newValue.price   
        },0)
    }

    const showCheckOut = () => {
        return (
            isAuthenticated()  ? (
                    
     
                 
                <div >{showDropIn()}</div>
            ) : (
                <Link to="/login" > 
                    <button className="btn btn-primary" >Login To Checkout</button>
                </Link>
            )
        )
    }
    const buy = () => { 
        // send req payment to server
        let nonce
        let getNone = data.instance.requestPaymentMethod()
                        .then(data => {
                            // console.log(data)   
                            nonce = data.nonce
                            // console.log("send nonce and total to process:",nonce,getTotal())
                            const paymentData = {
                                paymentMethodNonce: nonce,
                                amount: getTotal(product),
                            }

                            processPayment(userId,token, paymentData)
                                .then(response => {
                                    setData({...data,success: response.success})
                                    // empty card && create order

                                    const orderData = { 
                                        products : product,
                                        transaction_id: response.transaction.id,
                                        amount: response.transaction.amount,
                                        address: data.address
                                    }

                                    createOrder(userId,token,orderData)

                                    emptyCart(() => {
                                        console.log("payment success!")
                                    })
                                    

                                } )
                                .catch(error =>  console.log(error))
                        })
                        .catch(error => {
                            // console.log("drop in err",error)
                            setData({...data,error:error.message})
                        })
                        

    }

    const showError = error => (
        <div className="alert alert-danger" style={{display: error ? "" :"none" }} >
            {error}
        </div>
    )

    const showSuccess = success => (
        <div className="alert alert-info" style={{display: success ? "" :"none" }} >
            Thanks!
        </div>
    )

    const showAddress = () => (
        <div className="form-group mb-3">
            <label className="text-muted" >Delivery address</label>
                     
            <textarea 
                onChange={handleAddress}
                className="form-control"
                value={data.address}
                placeholder="Enter your address to delivery"
            />
        </div> 
    )
    

    const showDropIn = () => (
        <div onBlur={() => setData({...data,error:""})} >
            {data.clientToken !== null && product.length > 0 ? (
                <div>

                    <DropIn  options={{
                            authorization : data.clientToken
                        }} 
                        onInstance = {instance => (data.instance = instance)}
                     />
                    <button onClick={buy} className="btn btn-success">Pay</button>
                </div>
            ) : null }
        </div>  
    )
                        
    return <div>

        <h2>Total: ${getTotal(product)}</h2>
        {showSuccess(data.success)}
        {showError(data.error)}
        {showAddress()}
        {showCheckOut()}

    </div>
}

export default Checkout