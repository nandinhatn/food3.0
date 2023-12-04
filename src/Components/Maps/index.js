import react,{useEffect, useState, useContext}  from 'react'
import {
    CartContext, 
    FreteContext, 
    ProductsContext, 
    CategoriesContext,
   
} from '../../ContextProducts'

import {Input,Button,Container,Title} from './style'
import { getDistance } from 'geolib'

import Geocode from "react-geocode";
import infos from '../../assets/Dates/infos';
import axios from 'axios';

import { withMask } from 'use-mask-input';
import apiKey from '../../assets/Dates/keys';




const Maps = ()=>{

    const [distance, setDistance] = useState([])
 
    const [cep, setCep] = useState('04141100')
    const [cepConfirm, setCepConfirm] = useState(false)
    const [address, setAddress] = useState()
    const [neighborhood, setNeighborhood] = useState()
    const [city, setCity] = useState()
    const [uf, setUF] = useState() 
    const [complement, setComplement] = useState()
    const [number, setNumber] = useState('')
    const [confirmAddres, setConfirmAddress] = useState(false)
 
   /*  const [lat, setLat] = useState();
    const [long,setLong] = useState()   */  
    const {frete,setFrete} = useContext(FreteContext)
    const {cart,setCart} = useContext(CartContext)
    const [txtAddress, setTxtAddress] = useState('')
    

    //6d3600f53d3a810a01e61276b18a238f58b135bb
   /*  const teste = ()=>{
        console.log('aqui222')
        const successCallback = (position) => {
            console.log(position);
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            console.log(lat,long)
          };
          
          const errorCallback = (error) => {
            console.log(error);
            console.log('as permissões de localização devem ser autorizadas')
          };
          
          navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    } */
    

    const getPosition = ()=>{
        console.log('*************************************************aqui')
        const key = apiKey
        
     
     let query= infos.cidade + txtAddress
     
        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${key}`).then((res)=>{
            if(res){
                console.log(res.data.results[0].address_components) 
                console.log(res.data.results[0].address_components[0])// cep
                console.log(res.data.results[0].address_components[1].long_name)// rua
                console.log(res.data.results[0].address_components[2].long_name)// bairro
                console.log(res.data.results[0].address_components[3].long_name)// cidade
                console.log(res.data.results[0].address_components[4].long_name)// estado 
                console.log(res.data.results[0].formatted_address)// endereço formatado
                setAddress(res.data.results[0].formatted_address)
                console.log(res.data.results[0].geometry.location.lat)// lat
                console.log(res.data.results[0].geometry.location.lng)// lat */
    
               
                let lat = res.data.results[0].geometry.location.lat
                let long = res.data.results[0].geometry.location.lng 
    
                setAddress(res.data.results[0].formatted_address) 
             
                getDistanceBettwenn(lat,long) 
                console.log(res.data.results)
            }
            
           
        }).catch((e)=>{
            console.log(e)
        })
       
       
       
   

        
    }
    function getDistanceBettwenn(lat,long){
        console.log(lat,long)
        const distance = getDistance(
            { latitude: lat, longitude: long },
            { latitude: -24.3173, longitude: -46.9956 }
           
        )
        console.log('lat',lat,long)
        console.log(distance)
        let distanceKm = distance/1000
        if(distanceKm<= infos.limit_entrega){
            console.log('atendimento é feito')
            console.log(infos.faixas)
            const filter = infos.faixas.filter((el)=> el.distance <= distanceKm)
            console.log('infos',filter[0])
            setFrete(filter[0].value)
            setConfirmAddress(true)
        }
        else{
            console.log('não permitido')
        }
    }



    const clearForm=()=>{
        setBairro('')
        setComplemento('')
        setUF('')
        setStreet('')
        setLocalidade('')
    }
/* 
    const getAddress= ()=>{
        let newcep =cep.replaceAll(' ', '').replaceAll('_','').replaceAll('-', '')
        console.log('chamei', newcep, newcep.length)
      if(newcep.length>=8){

            axios.get(`https://viacep.com.br/ws/${newcep}/json/`).then((res)=>{
                console.log(res)
                if(res.statusText=='OK'){
                    setCepConfirm(true)
                    setStreet(res.data.logradouro)
                    setBairro(res.data.bairro)
                    setLocalidade(res.data.localidade)
                    setUF(res.data.uf)
                    
                }
                if(res.data.error==true){
                    console.log('erroooooooooooooooo')
                }
            })
        }
        else{
           clearForm()
        }
       
        
       

    } */

/*     const configCep= (value)=>{
        console.log('teste')
        setCep(value)
        getAddress()
      


    } */
  
    
    useEffect(()=>{
     /*    getAddress() */
    /*     if(cep.length<8){
            clearForm()
        } */
    },[cep])

    useEffect(()=>{
  
      
    },[])
    return(
        <>
        <Container></Container>
        <Title> Informações de  Endereço</Title>
       {/*  <div> Digite seu CEP </div>
        <input ref={withMask('99999-999')} onChange={(e)=> setCep(e.target.value) }></input> */}
       
        <Input value={txtAddress} onChange={(e)=> setTxtAddress(e.target.value)} placeholder='Digite seu endereço'></Input>
        <Button  onClick={()=> getPosition()}>Confirma Endereco</Button>
        

       

            

            {confirmAddres? 

            <>
            <div>Informe o numero</div>

            <Input value={number} onChange={(e)=> setNumber(e.target.value)}></Input>
            <div>Informe o Complemento</div>
            <Input value={complement} onChange={(e)=> setComplement(e.target.value)}></Input>
            {confirmAddres && number !='' ? 
            <>
            <Title>Endereço de Entrega</Title>
            <Container>

            <div>{address}</div>
            </Container>
            <div>Forma de Pagamento</div>
            <div> aqui entra as informaçãoes de pagamento</div>
            </>
             :''}
            

            </>
            : ''}
        </>
    )
}
export default Maps;