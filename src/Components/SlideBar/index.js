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

    const [exib, setExib]= useState(false)

    const getCategories = ()=>{
        api.get('/api/categorias').then((res)=>{
           
            setListCategories(res.data.response)
        })
    }

    useEffect(()=>{
        if(listCategories && listCategories.length>0){
            setExib(true)
        }
    },[listCategories])
   
    useEffect(()=>{
        getCategories()
       
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