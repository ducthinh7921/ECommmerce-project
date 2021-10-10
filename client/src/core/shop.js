import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getCategory, getFilterProduct} from './apiCore'
import Checkbox from './checkbox'
import RadioBox from './radiobox'
import CardProduct from './card'
    

import {Prices} from './fixedPrice'

    
const Shop = () => {
    const [myFilter,setMyFilter] = useState({
        filters: { category: [], price: [] }
    })
    const [category,setCategory] =useState([])
    const [error,setError] =useState(false)
    const [limit,setLimit] =useState(6)
    const [skip,setSkip] =useState(0)
    const [size,setSize] =useState(0)
    const [filterResult,setFilterResult] =useState([])





    const init = () => {
        getCategory()
            .then(data => {
                if(data.error) {
                    setError(data.error)
                }else {
                    setCategory(data)
                }
            })
    }
    useEffect(() => {
        init()
        loadFilterResults(skip,limit,myFilter.filters)
    }, [])

    

    const handleFilter = (filters,filterBy) => {
        // console.log("shop",filters,filterBy)
        const newFilter = {...myFilter}
        newFilter.filters[filterBy] = filters

        if(filterBy == 'price') {
            let priceValues = handlePrice(filters)
            newFilter.filters[filterBy] = priceValues
            
        }
        loadFilterResults(myFilter.filters)
        setMyFilter(newFilter)
    }

    const loadFilterResults = newFilter => {
        // console.log(newFilter)
        getFilterProduct(skip,limit,newFilter)
            .then(data => {
                if(data.error) {
                    setError(data.error)
                }else {
                    setFilterResult(data.data)
                    setSize(data.size)
                    setSkip(0)
                }
            })

    }

    const loadMore = () => {

        let toSkip = skip +limit
        getFilterProduct(toSkip,limit,myFilter.filters)
            .then(data => {
                if(data.error) {
                    setError(data.error)
                }else {
                    setFilterResult([...filterResult,...data.data])
                    setSize(data.size)
                    setSkip(toSkip)
                }
            })

    }
    const loadMoreBtn = () => {
        return (
            size > 0 && size >= limit && (
                <button onClick={loadMore}  className="btn btn-warning mb-5">Load More</button>
            )
        )
    }

    

    const handlePrice = value => {
        const data= Prices
        let array = []

        for(let key in data){
            if(data[key]._id === parseInt(value) ) {
                array = data[key].array
            }
        }
        return array 
    }

    return (
        <Layout title="Shop Page" description="This is shop page description" className="container" >
            <div className="row">
                <div className="col-4">
                    <h4>Filter by checkbox</h4>
                    <ul>
                       <Checkbox category={category} handleFilter={filters => handleFilter(filters,'category')}  />   
                    </ul>
                    <h4>Filter by price range</h4>
                    <div>
                       <RadioBox prices={Prices} handleFilter={filters => handleFilter(filters,'price')}  />   
                    </div>
                    
                </div>
                <div className="col-8">
                    {/* {JSON.stringify(filterResult)} */}
                    <h2 className="mb-4">Products</h2>
                    <div className="row">
                        {filterResult.map((p,i) => (
                                <div key={i} className="col-4 mb-3">
                                  <CardProduct  product={p} />
                              </div>
                        ))}
                    </div>
                    {loadMoreBtn()}
                </div>


            </div>
           
        </Layout>
    )
}
export default Shop 

