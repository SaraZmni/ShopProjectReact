import { fetchProducts } from "../../../utils/fetchProducts"
import { useState,useEffect, useContext } from "react"
import "./ProductPage.css"
import ProductList from "../../product-list/ProductList"
import Category from "../../Category/Category"
import { CategoryContext } from "../../../contexts/categoryContext"
const ProductPage=()=>{

    const [data,setData]=useState([])
    const [isLoading,setIsLoading]=useState(undefined)
    const [error,setError]=useState(undefined)
    const {selectValue}=useContext(CategoryContext)

    const [filterData,setFilterData]=useState([])

    useEffect(() => {
        const getApi=async ()=>{
            setIsLoading(true)
            try {
                const data=await fetchProducts()
                setData(data)
            } catch (error) {
                setError(error.message)
            } finally{
                setIsLoading(false)
            }
        }
        getApi()
        document.title= "Procuts page"
    }, []);
    const ex=data.filter((item)=>{
        return [...selectValue].includes(item.category.name)
    })
    console.log("seve context: ",[...selectValue]);

    console.log('ex: ',ex);
    console.log(filterData);
    
    
    if (isLoading) {
        return <div>Loading data...</div>
    }
    if (error) {
        return <div>Error: {error} </div>
    }    
    return(
        <div className="container-product-main">
            <Category/>
            {
                ex.length > 0 ?
                <ProductList data={ex}/> :
                <ProductList data={data}/>
            }
        </div>
    )
}
export default ProductPage