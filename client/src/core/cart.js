import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getCart} from './cartHelper'
import CardProduct from './card'
import {Link} from 'react-router-dom'
import Checkout from './checkout'


const Cart = () => {
    const [item, setItem] = useState([])


    useEffect(() => {
        setItem(getCart())
    },[item])

    const showItem = () =>{
        return (
            <div>
                <h2>your cart has  {`${item.length}`} items</h2>
                <hr />
                {item.map((p,i)=> (
                    <CardProduct key={i} product={p} 
                    showAddToCartBtn={false}
                    cartUpdate={true}
                    cartRemove={true}
                    />
                ))}
            </div>
        )
    }

    const noItemMess = () => (
        <h2>Your cart is empty <br /> <Link to="/shop" >Continue Shopping</Link> </h2>  
    )

    return (
        <Layout title="Cart Page" description="This is cart page description" className="container" >
            <div className="row">
                <div className="col-6">
                    {item.length > 0 ? showItem(item) : noItemMess()  }
                </div>
                <div className="col-6">
                    <h2 className="mb-4">Your cart</h2>
                    <br />
                    <Checkout product={item} />
                </div>
            </div>
        </Layout>
    )
}

export default Cart