import "./ProductList.css"
import ProductCard from "../ProductCard/ProductCard";
import { CategoryContext } from "../../contexts/categoryContext";
import { useContext, useEffect, useState } from "react";
import { fetchProductApi } from "../../utils/fetchProducts";
import { ShowPageContext } from "../../contexts/showPageContext";
import { PaginationContext } from "../../contexts/paginationContext";
import { GetApiContext } from "../../contexts/getApiContext";

const ProdcutList = () => {
    const [data,setData]=useState([])
    const [isLoading,setIsLoading]=useState(undefined)
    const [error,setError]=useState(undefined)
    const {selectValueCategory}=useContext(CategoryContext)
    const {selectLimitShowPage}=useContext(ShowPageContext)
    const {selectPagination}=useContext(PaginationContext)
    const {setDataApi}=useContext(GetApiContext)
    
    useEffect(() => {
        const getApi=async ()=>{
            setIsLoading(true)
            try {
                const data=await fetchProductApi({category:[...selectValueCategory],limit:selectLimitShowPage,page:selectPagination})
                setData(data.productsData)
                setDataApi(data)
            } catch (error) {
                setError(error.message)
            } finally{
                setIsLoading(false)
            }
        }
        getApi()
        document.title= "Procuts page"
    }, [selectValueCategory,selectLimitShowPage,selectPagination]);
    
    
    if (isLoading) {
        return <div>Loading data...</div>
    }
    if (error) {
        return <div>Error: {error} </div>
    }
    return (
        <div className='container-product-list' >
            {
                data.map((item,index)=>{
                    return <ProductCard 
                        key={index}
                        productName={item.name}
                        productPrice={Math.round(item.price)}
                        productImage={item.images[0]}
                        category={item.category.name}
                    />
                })
            }
        </div>
    )
};
export default ProdcutList