import styled from "styled-components";


export const Container = styled.div`
display: flex;
justify-content: center;
align-items: start;

flex-wrap: wrap;
`

export const ContainerMap = styled.div`
display: flex;
justify-content: center;


flex-direction: column;
gap: 20px;
margin-left: 10px;

padding: 10px;

`;

export const Input = styled.input`
border: none;
border-bottom: 1px solid #CCC;
height: 20px;
font-family: ${(prop)=> prop.theme.fonts.regular};
color: ${(prop)=> prop.theme.colors.secondary};



font-size: 12px;
:focus{
    outline: 1px solid ${(prop)=> prop.theme.colors.primary};
}
`;

export const ContainerInput = styled.div`
display: flex;
flex-direction: column;
border-left: 1px solid #A6A6A6;
border-top: none;
margin: 20px;


padding: 10px;


`;

export const Button = styled.button`
border:0;
background: ${(props)=> props.theme.colors.primary};
color: white;
border-radius: 16px;
transition: 0.5s;
margin-top: 20px;
margin-bottom:20px;
padding: 5px;
:hover{
    opacity: 0.9;
}
`;

export const TextConfirm = styled.div`
font-size: 14px;
font-family: ${(prop)=> prop.theme.fonts.regular};
color: ${(prop)=> prop.theme.colors.secondary};
margin-bottom: 10px;
`;
export const TitleConfirm = styled.div`
font-size: 14px;
font-weight: bold;
font-family: ${(prop)=> prop.theme.fonts.regular};
color: ${(prop)=> prop.theme.colors.secondary};

`;

export const TextConfirmAddress= styled.div`
padding: 20px;
font-size: 14px;
font-weight: bold;
font-family: ${(prop)=> prop.theme.fonts.regular};
color: ${(prop)=> prop.theme.colors.secondary};
`;




         

 