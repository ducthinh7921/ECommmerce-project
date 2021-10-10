import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getProduct} from './apiCore'
import CardProduct from './card'
import Search from './search'

const Home = () => {

    const [productBySell,setProductBySell] = useState([])
    const [productByArrival,setProductByArrival] = useState([])
    const [error,serError] = useState(false)

    const loadProductBySell = () => {
        getProduct('sold')
            .then(data => {
                if(data.error) {
                    serError(data.error)
                }else {
                    setProductBySell(data)
                }
            })
    }

    const loadProductByArrival = () => {
        getProduct('createdAt')
            .then(data => {
                if(data.error) {
                    serError(data.error)
                }else {
                    setProductByArrival(data)
                }
            }) 
    }

    useEffect(() =>{
        loadProductBySell()
        loadProductByArrival()

    },[])

    return (
        <Layout title="Home Page" description="This is home page description" className="container" >
            <Search />
            <h2 className="mb-4" >Best Sellers</h2>
            <div className="row">
                {productBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <CardProduct  product={product} />
                    </div>
                
                ))}
            </div>

            <hr />
            <h2 className="mb-4" >New Arrival</h2>
            <div className="row">
                {productByArrival.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                      <CardProduct  product={product} />
                  </div>
                ))}
            </div>
           
        </Layout>
    )
}


export default Home