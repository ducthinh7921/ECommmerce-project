import React, {useState,useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom'
import ShowImage from './showImage'
import moment from 'moment'
import { AddItem ,UpdateItem,RemoveItem} from './cartHelper';

const CardProduct = ({product, showViewProductBtn=true, showAddToCartBtn=true,cartUpdate=false,cartRemove=false}) => {

    const [redirect,setRedirect] = useState(false)
    const [count,setCount] = useState(product.count)



    const showViewBtn = (showViewProductBtn) => {
      return (
        showViewProductBtn && (
            <Link to={`/product/${product._id}`} className="mr-2">
                <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
                    View Product
                </button>
            </Link>
        )
      )   
    }

    const addToCart = () => {
        AddItem(product, () => {
            setRedirect(true)
        })
    }
    
    const shouldRedirect =redirect => {
        if(redirect){
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (showAddToCartBtn ) => {
        return (
            showAddToCartBtn &&
                (<button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2">
                    Add to card
                </button>
            )
        )
    }
    const showStock = (quantity) => {
        return quantity > 0 ? <span className="badge badge-primary badge-pill"  >In Stock</span> : 
        <span className="badge badge-primary badge-pill"  >Out Stock</span> 
    }

    const handleChange = productId => event => {
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if(event.target.value >= 1) {
            UpdateItem(productId, event.target.value,)
        }
    }

    const showCartUpdate = cartUpdate => {
        return cartUpdate && (
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text">Quantity</span>
                </div>
                <input type="number" className="form-control" value={count} onChange={handleChange(product._id)}/>
            </div>
        )
    }
     
    const showDeleteToCart = (cartRemove ) => {
        return (
            cartRemove &&
                (<button onClick={() => RemoveItem(product._id)} className="btn btn-outline-danger mt-2 mb-2">
                    Remove product
                </button>
            )
        )
    }

    return (
            <div className="card">
                <div className="card-header name">{product.name}</div>
                <div className="card-body">
                    {shouldRedirect(redirect)}
                    <ShowImage item={product} url="product"  />
                    <p className="lead mt-2" >{product.description.substring(0,50)}</p>
                    <p className="black-10">${product.price}</p>
                    <p className="black-9">
                        Category: {product.category && product.category.name}
                    </p>
                    <p className="black-8">
                        Added on {moment(product.createdAt).fromNow()}
                    </p>


                        {showStock(product.quantity)}
                        <br />
                        {showViewBtn(showViewProductBtn)}
                        {showAddToCart(showAddToCartBtn)}
                        {showDeleteToCart(cartRemove)}
                        {showCartUpdate(cartUpdate)}
                  
                </div>
            </div>
        
    )
}

export default CardProduct