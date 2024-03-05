import React, { useState, useEffect, useContext} from "react";
import Slider from "react-slick";
import {
     ProductsContext, 
     CategoriesContext,
    CartContext,
    SelectCategoryContext
    } from "../../ContextProducts";
import { 
    Carousel,  
    ContainerSliderStyle, 
    Teste,
    H3
} from './styles';
import api from "../../assets/Dates/api";

const SlideBar = (props)=>{

    const {listProducts, setListProducts} = useContext(ProductsContext)
    const {listCategories, setListCategories} = useContext(CategoriesContext)
    const {selectCategory, setSelectCategory} = useContext(SelectCategoryContext)

    const [exib, setExib]= useState(false)

 
    const getSelectCategory=(id)=>{
        console.log('clickei', id)
        let select = {search:true, categorySelected: id}
        setSelectCategory(select)
        console.log(selectCategory)
    /*  if(id>0){
        setSelectCategory({search: true, categorySelected: id} 
        )
       }
       else{
           setSelectCategory(
            {search: false, categorySelected:0}
           )
       } 

    } */
}

   useEffect(()=>{
        console.log('exib categorie', listCategories)
        if(listCategories && listCategories.length>0){
            setExib(true)
        }
    },[listCategories]) 

    useEffect(()=> {
        console.log(listCategories)
    },[])
   
  
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        arrows: false,
    
        slidesToShow:  4,
        slidesToScroll: 4 ,
        autoplay:true,
      };
    return(
        <>
         {exib? 
         
         <ContainerSliderStyle>
    
    <Carousel  {...settings}>
    
 
  {listCategories.map(element => 
         <div>
         <H3 onClick={()=> getSelectCategory(element.id)}>{element.name}</H3>
       </div>
    )} 
    </Carousel>
  
    </ContainerSliderStyle> 
         : 'nao pode exibir'} 
        
        </>
    )
}

export default SlideBar