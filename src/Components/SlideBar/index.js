import react,{useEffect, useContext, useState} from 'react';
import api from '../../assets/Dates/api';

import Slider from "react-slick";
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

const SlideBar = ()=>{

    const [listCategories, setListCategories] = useState('')


    const getCategorias=()=>{
        api.get('/api/categorias').then((response)=>{
           setListCategories(response.data.response)
        })
    }

    useEffect(()=>{
        getCategorias()
    },[])

    return(
        <>
        <Slider {...settings}>
        <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
          <div>
            <h3>7</h3>
          </div>
          <div>
            <h3>8</h3>
          </div>  
        </Slider>
        </>
    )
}

export default SlideBar;