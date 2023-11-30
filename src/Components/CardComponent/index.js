import react from 'react';


import {CardContainer,CardPhoto,Container,Plus,Title,Price} from './style'

const CardComponent = ({img,title,price,plus})=>{
    return(
        <>
        <CardContainer>
            <Container>
                <CardPhoto src={img}></CardPhoto>
                <Title>{title}</Title>
                <Price> R$ {price}</Price>
            </Container>
            <Plus onClick={plus}>+</Plus>
        </CardContainer>

        </>
    )
}

export default CardComponent