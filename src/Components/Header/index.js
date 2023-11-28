import react from 'react';
import Foto from '../../assets/logo_pizza.jpg'

import {Container,LogoImage} from './styles.js'

import SlideBar from '../SlideBar/index.js';

const Header = ()=>{
    return(
        <>
        <Container>
            <LogoImage src={Foto}/>
            <SlideBar></SlideBar>
        </Container>
        
        </>
    )
}

export default Header;