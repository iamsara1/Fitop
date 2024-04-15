import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux"
import { login,logout } from "../redux/FontionAPI"
import { useState } from "react"
import { useHistory } from 'react-router-dom'
import mobile from '../responsive'
import {Home} from "@material-ui/icons"

const Container = styled.div`
 background-color: #F0F0F0;
`
const MiniContainer = styled.div`
width: 100vw;
height: 90vh;
background-size: cover;
background-color: #F0F0F0;
display: flex;
align-items: center;
justify-content: center;    
`
const Wrapper = styled.div`
  width: 40%;
  height: 55%;
  padding: 45px;
  background-color: white;
  border-radius: 10px;
  ${mobile({ width: "70%"})}
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`


const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
  margin-top: 15px;
`
const Button = styled.button`
  width: 40%;
  border: none;
  margin-top: 20px;
  padding: 15px 20px;
  background-color: #101010	;
  color: white;
  cursor: pointer;
  font-weight: 600;  
  ${mobile({ width: "30%"})}
  border-radius: 10px 100px / 120px;
  &:hover{
    background-color: #696969;
    }
`
const Error = styled.span`
  color: #B22222;
  font-weight: 700;
  text-align: center;
`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  font-weight: 500;
  ${mobile({ fontSize: "10px"})}
`
const header = styled.header`
`

export default function Login() {
  const d = useDispatch();
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const {chercher, error } = useSelector((state) => state.utilisateur);
  const Click = (e) => {
    e.preventDefault();
    login(d, { email, password });
  }; 
  
  let history = useHistory();
  const lien = (e) => {
    history.push("/register");
  };
  const home = (e) => {
    history.push("/");
  };
return (
    <Container>
    <header> <Link onClick={home}><Home style={{ marginLeft:"35px",marginTop :"15px",fontSize:"30px" }}/> </Link></header>
    <MiniContainer>    
    <Wrapper>
      <Title>CONNEXION</Title>
      <Form>
        {error && <Error>Veuillez verifier votre mail et password !!</Error>}
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value) }/>
        <Input placeholder="password" onChange={(e) => setPassword(e.target.value) } type="password"/>
        <Button onClick={Click} >Se Connecter</Button>        
        <Link style={{ marginTop : "20px" }}>DO NOT YOU REMEMBER THE PASSWORD ?</Link>
        <Link onClick={lien}>CREATE A NEW ACCOUNT</Link>
      </Form>
    </Wrapper>
  </MiniContainer>
  </Container>
  )
}