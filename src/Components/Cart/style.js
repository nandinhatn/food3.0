import styled from "styled-components";

export const ContainerCart = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 30px;
flex-direction: column;
height: 100%;

`;

export const ItensCart = styled.div`
display: grid;

grid-template-columns: 1fr 1fr 4fr 2fr 2fr 2fr;
justify-content: space-evenly;
align-items: start;
text-align: left;

border-bottom: 1px solid #CCC;
width: 100%;
gap: 10px;
font-family: ${(prop)=> prop.theme.fonts.regular};
font-size: 12px;
cursor: pointer;
:hover{
    background-color: ${(prop)=> prop.theme.colors.primary};
    color: white;
}
`;

export const ItensCartTitle = styled.div`
display: grid;
text-align: left;
grid-template-columns: 1fr 1fr 4fr 2fr 2fr 2fr;
justify-content: space-evenly;
align-items: start;
font-size: 12px;

font-weight: bold;
font-family: ${(prop)=> prop.theme.fonts.regular};
border-bottom: 1px solid #CCC;
width: 100%;
gap: 10px;
`;

export const ContainerNoCart = styled.div`
display:flex;
justify-content: center;
flex-direction: column;
align-items: center;
font-size: 14px;
font-weight: bold;
font-family: ${(prop)=> prop.theme.fonts.regular};
color: ${(prop)=> prop.theme.colors.secondary};


`;