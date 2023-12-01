import styled from "styled-components";



export const Container = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;

`;

export const LogoImage = styled.img`
width: 120px;
height: 120px;
border-radius: 50%;
padding: 20px;
cursor: pointer;
`;

export const ContainerCountCart = styled.div`
padding: 10px 15px 10px 15px;
border-radius: 15px;
gap: 20px;
display: flex;
align-items: center;
justify-content: center;
background-color: ${(prop)=> prop.theme.colors.primary};
color: white;
margin: 10px 0 20px 0;
cursor: pointer;
`