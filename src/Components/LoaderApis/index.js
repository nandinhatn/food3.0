import React, {useContext, useEffect , useState} from "react";

import api from "../../assets/Dates/api";
import {CartContext,CategoriesContext,ProductsContext} from '../../ContextProducts'


const LoaderApis = ()=>{

    const {listProducts,setListProducts} = useContext(ProductsContext);
    const {listCategories, setListCategories} = useContext(CategoriesContext)
    const {cart, setCart} = useContext(CartContext)
    
    const getCategories=()=>{
        api.get('/api/categorias').then((res)=>{
            console.log(res)
            setListCategories(res.data.response)
        })
      }
    const getProducts =()=>{
        api.get('/api/produtos').then((res)=>{
           console.log(res)
           setListProducts(res.data.response)
        })
      }
    useEffect(()=>{
        getCategories()
        getProducts()
    },[])
    return(
        <>

        </>
    )
}

export default LoaderApis