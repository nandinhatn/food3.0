import styled from "styled-components";


export const Container = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
margin-top:20px;
margin-bottom:20px;
color: white;



`;

export const TagCategory = styled.div`
background-color: ${(prop)=> prop.theme.colors.primary};
padding: 5px;
font-size: 14px;
`;

export const ContainerCards = styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap;
`;