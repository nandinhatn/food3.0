import styled from "styled-components";


export const CardContainer = styled.div`
border-radius: 0 0 20px  0px;
background-color: white;
filter: drop-shadow(7px 5px 10px #B3B3B3);

width: 150px;

gap: 10px;
margin-bottom: 10px;
`;

export const Container= styled.div`
padding-top: 10px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding-bottom: 40px;
`;

export const CardPhoto = styled.img`
width: 100px;
height: 100px;
object-fit: cover;
border-radius: 50%;
border: 3px solid ${(prop)=> prop.theme.colors.primary};
`;

export const Title = styled.div`
font-family: ${(props)=> props.theme.fonts.regular};
color: ${(props)=> props.theme.colors.secondary};
margin-top: 10px;
font-weight: bold;
font-size: 14px;

`;
export const Price = styled.div`
color: ${(props)=>props.theme.colors.primary};
font-size: 14px;

margin-top: 10px;
font-weight: bold;
`;

export const Plus = styled.div`
background-color: ${(prop)=> prop.theme.colors.primary};
color: white;
font-size:20px;
font-weight: bold;
border-radius: 10px 0 20px  0px;
float: right;
cursor: pointer;
position: absolute;
padding-right: 10px;

text-align: right;
bottom:0;
right:0;

width: 20px;
:hover{
    opacity: 0.9;
}
`;

