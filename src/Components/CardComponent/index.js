import react from 'react';


import {CardContainer,CardPhoto,Container,Plus,Title,Price} from './style'

const CardComponent = ({img,title,price,plus})=>{
    return(
        <>
        <CardContainer>
            <Container>
                <CardPhoto src={img}></CardPhoto>
                <Title>{title}</Title>
                <Price> R$ {parseFloat(price).toFixed(2)}</Price>
            </Container>
            <Plus onClick={plus}>+</Plus>
        </CardContainer>

        </>
    )
}

export default CardComponent