import styled from "styled-components";
import Slider from 'react-slick'
export const Carousel=styled(Slider)`


.slick-slide{
    
  
    display:flex;
    background: ${(prop)=> prop.theme.colors.primary};
    justify-content: center;
    align-items: center;
    color: white;
   
    width: 100%;
  
}
.slick-prev::before,.slick-next:before{
    color: black;
}

`;
export const CarouselImg = styled.img`
object-fit: cover;
border-radius: 6px;
`;

export const ContainerSliderStyle = styled.div`

/* border-top: 1px solid #ccc; */
/* border-bottom: 1px solid #ccc; */

background: ${(prop)=> prop.theme.colors.primary};
color: white;
display: flex;
justify-content: center;
align-items: center;
padding-bottom: 10px;
width: 100%;





`;
export const Teste = styled.div`
color: white;

margin-top: 10px;
width: 100px;
font-size: 12px;
`;

export const H3 = styled.div`
font-size:14px;
margin-top:10px;
margin-bottom: 10px;
font-weight: bold;
`;
