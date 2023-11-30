import React,{useContext, useEffect, useState}from "react";
import {ProductsContext,CategoriesContext} from '../../ContextProducts'
import {
    Container,
    TagCategory
} from './style'
import api from "../../assets/Dates/api";



const ContainerInner = ()=>{

    const {listProducts,setListProducts} = useContext(ProductsContext);
    const {listCategories, setListCategories} = useContext(CategoriesContext)
   
    

    
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
        <Container>

        </Container>
        </>
    )
}

export default ContainerInner