import styled from "styled-components";


export const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
text-align: center;

`
export const Title = styled.div`
font-weight: bold;
display: flex ;
justify-content: center;
margin-top: 20px;
color: ${(prop)=> prop.theme.colors.primary};
`;

export const ContainerRadios = styled.div`
display: flex;
margin-bottom: 20px;
margin-top: 40px;
`;

export const Radios = styled.input`
display: flex;
justify-content: center;
text-align: center;
margin: 5px;
`;

export const Label = styled.div`
text-align: center;

`;

export const Button = styled.button`
border:0;
background: ${(props)=> props.theme.colors.primary};
color: white;
border-radius: 16px;
transition: 0.5s;
margin-top: 20px;
margin-bottom:20px;
cursor: pointer;
padding: 10px;
:hover{
    opacity: 0.9;
}
`;