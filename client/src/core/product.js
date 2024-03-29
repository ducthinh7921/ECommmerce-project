import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {read,getRelated} from './apiCore'
import CardProduct from './card'


const Product = (props) => {
    const [product,setProduct] = useState({})
    const [relatedProduct,setRelatedProduct] = useState([])

    const [error,setError] = useState(false)

    const loadSingleProduct = productId => {
        read(productId)
            .then(data=>{
                if(data.error) {
                    setError(data.error)
                }else {
                    setProduct(data)
                    // fetch related
                    getRelated(data._id)
                        .then(data => {
                            if(data.error) {
                                setError(data.error)
                            }else {
                                setRelatedProduct(data)
                            }
                        })
                }
            })
    }

    useEffect(() =>{
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    },[props])


    return (
        <Layout title={product && product.name} 
        description={product && product.description && product.description.substring(0,100) } className="container" >
            <div className="row">
                <div className="col-8">
                    {product && product.description && <CardProduct product={product} showViewProductBtn={false} />}
                </div>
                <div className="col-4"> 
                    <h4>Related Product</h4>
                    {relatedProduct.map((p,i)=> (
                        <div key={i} className="mb-3">
                            <CardProduct product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}
export default Product