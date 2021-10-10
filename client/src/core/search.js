import React,{useState,useEffect} from 'react'
import {getCategory,list} from './apiCore'
import CardProduct from './card'

const Search = () => {
    const [data,setData] = useState({
        categories:[], 
        category:"", 
        search:"", 
        results:[], 
        searched:false
    })

    const {categories,category,search,results,searched} = data

    const loadCategory = () => {
        getCategory()
            .then(data =>{
                if(data.error){
                    console.log(data.error)
                }else {
                    setData({...data,categories:data})
                }
            })
    }

    useEffect(() => {
        loadCategory()
    },[])

    const searchData = () => {
        // console.log(search,category) 
        if(search){
            list({search: search || undefined, category: category})
                .then(res => {
                    if(res.error) {
                        console.log(res.error)
                    }else {
                        setData({...data,results: res,searched:true})
                    }
                })
        }
    }

    const searchSubmit = (event) => {
        event.preventDefault()
        searchData()

    }
    const handleChange = (name) => event => {
        setData({...data, searched :false , [name]: event.target.value})
    }

    const searchMess = (searched, results) => {
        if(searched && results.length > 0) {
            return `Found ${results.length} products`
        }
        if(searched && results.length < 1) {
            return 'Product not found'
        }
    }

    const searchProduct = (results = []) =>{   
        return (
           <div>
                <h2 className=" mt-4 mb-4">
                    {searchMess(searched, results)}
                </h2>
                <div className="row">
                    {results.map((p,i)=> (
                        <div key={i} className="col-4 mb-3">
                          <CardProduct  product={p} />
                      </div>
                    ))}
                 </div>
           </div>
        )
    }

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <span className="input-group-text">
                <div className="input-group input-group-lg">
                    <div className="input-group-prepend">
                        <select className="btn mr-2" onChange={handleChange("category")} >
                            <option value="All" > All </option>
                            {categories.map((c,i)=> (
                                <option key={i} value={c._id}>{c.name}</option>
                            ))}
                        </select>
                    </div>  
                    <input onChange={handleChange('search')} type="search" className="form-control" value={search} />
                </div>
                <div className="btn input-group-append" style={{border:"none"}} >
                    <button className="input-group-text">Search</button>
                </div>
            </span>
        </form>
    )

    return (    
        <div className="row">
     
            <div className="container mb-3">{searchForm()}</div>
            <div className="container mb-3">{searchProduct(results)}</div>

        </div>
    )
}

export default Search