import styled from "styled-components"


export const ContainerModal = styled.div`
display:flex;
justify-content: space-between;
align-items: center;
flex-direction: column;
padding: 20px;
position: sticky;
z-index: 105000005000;

font-family: ${(prop)=>prop.theme.fonts.regular};



`;
export const Image = styled.img`
width: 150px;
height: 150px;
object-fit: cover;

border-radius: 50%;
border: 3px solid ${(props)=> props.theme.colors.primary};
margin-bottom:10px;
`;
export const Button= styled.button`
display:flex;
border:none;
cursor: pointer;
background-color: ${(prop)=> prop.theme.colors.primary};
color: white;
font-size:15px;
font-weight: bold;
border-radius: 0px 0 0px  10px;
float: right;
padding:5px;
width: 50px;
justify-content: center;
:hover{
    opacity:0.9;
}
`;
export const ContainerButton = styled.div`
display: flex;
justify-content: end;

`;
export const Title = styled.h1`
font-family: ${(prop)=>prop.theme.fonts.regular};
font-size:16px;
font-weight: bold;
`;

export const ContainerButtons = styled.div`
display:flex;
justify-content: center;
align-items: center;
margin-top: 10px;
gap:5px;

`;

export const ButtonPlus = styled.button`
background-color : ${(prop)=> prop.theme.colors.primary};
border: none;
color: white;
width: 25px;
height: 25px;
font-size: 20px;
font-weight: bold;
border-radius: 0 15px 15px 0;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
:hover{
    opacity: 0.9;
}
`;
export const ButtonMinus = styled.button`
background-color: ${(prop)=> prop.disabled? '#A5A3A2': prop.theme.colors.primary};
border: none;
color: white;
width: 25px;
height: 25px;
font-size: 20px;
font-weight: bold;
border-radius: 15px 0px 0px 15px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
:hover{
    opacity: 0.9;
}

:disabled{
    background-color:#A5A3A2;
    cursor: none;
}
`;

export const QtdTxt = styled.div`
font-size: 16px;
color: ${(prop)=> prop.theme.secondary};
font-weight: bold;

`;
export const ContainerDetails= styled.div`
display: flex;
justify-content: space-between;
align-items: center;
font-family: ${(prop)=> prop.theme.fonts.regular};
flex-direction: column;

padding:20px;


`;
export const ContainerDetailsText = styled.h2`
font-family: ${(prop)=> prop.theme.fonts.regular};
font-weight: bold;
font-size: 16px;
`;
export const ButtonCheckout = styled.button`
border-radius: 16px;
border: none;
padding:10px 20px 10px 20px;


color: white;
font-weight:bold;
font-size: 14px;
background-color: ${(prop)=> prop.theme.colors.primary};
background-color: ${(prop)=> prop.disabled? '#A5A3A2': prop.theme.colors.primary};
margin-bottom: 0;

cursor:pointer;
:hover{
    opacity: 0.9;


}



`;

export const ContainerShop = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 20px;
margin-top:30px;
font-family: ${(prop)=>prop.theme.fonts.regular};

`
export const ButtonShop = styled.button`
background-color: ${(prop)=> prop.theme.colors.primary};
font-size: 12px;
color: white;
border: none;
border-radius: 16px;
padding:10px;
cursor: pointer;
:hover{
    opacity: 0.9;
}
`;


export const Sucess= styled.div`
font-size:20px ;
font-family: ${(prop)=> prop.theme.fonts.regular};
font-weight: bold;
`;

export const ContainerInput = styled.div`
display: flex;
flex-direction: row;
font-family: ${(prop)=> prop.theme.fonts};
font-size: 14px;
gap: 10px;
`;

export const Input =styled.input.attrs({type:'checkbox'})`
cursor: pointer;
margin-left : 10px ;
border-radius:16px;
background-color: red;
border: 1px solid red;
color: red;


`;

export const OptionSelfText = styled.div`


font-family: ${(prop)=> prop.theme.fonts};
font-size: 14px;
`;
