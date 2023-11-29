import React, { useState, useEffect, useContext} from "react";
import Slider from "react-slick";
import { 
    Carousel,  
    ContainerSliderStyle, 
    Teste,
    H3
} from './styles';
import api from "../../assets/Dates/api";

const SlideBar = (props)=>{

    const [listCategories, setListCategories] = useState();

    const getCategories = ()=>{
        api.get('/api/categorias').then((res)=>{
            console.log('aqui')
            console.log(res.data.response)
            setListCategories(res.data.response)
        })
    }

   
    useEffect(()=>{
        getCategories()
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
         <ContainerSliderStyle>
    
    <Carousel  {...settings}>
    
    {listCategories? '' : ''}
    {listCategories.map(element => 
         <div>
         <H3>{element.title}</H3>
       </div>
    )}
   
         
         
 
  
  
  
  
  
  
 
  
     
   
  
  
   
    
  
  
    </Carousel>
  
    </ContainerSliderStyle>
        </>
    )
}

export default SlideBar