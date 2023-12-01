import React, { useState, useEffect, useContext} from "react";
import Slider from "react-slick";
import { ProductsContext, CategoriesContext, Cart } from "../../ContextProducts";
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

    const [exib, setExib]= useState(false)

 
    useEffect(()=>{
        console.log('exib categorie', listCategories)
        if(listCategories && listCategories.length>0){
            setExib(true)
        }
    },[listCategories])
   
  
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
         <H3>{element.title}</H3>
       </div>
    )} 
    </Carousel>
  
    </ContainerSliderStyle> 
         : 'nao pode exibir'}
        
        </>
    )
}

export default SlideBar