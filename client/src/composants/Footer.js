import { MailOutline, Phone } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import mobile from '../responsive';

const Container = styled.div`
    display: flex;
    ${mobile({flexDirection:"column"})}
`
const Left = styled.div`
   flex: 1;
   display: flex;
   flex-direction: column;
   padding: 20px;
   padding-left: 60px;
   margin-right: 200px;
   ${mobile({paddingLeft:"10px"})}
`
const Logo = styled.h1`
`
const Description = styled.p`
   margin: 20px 0px;  
   text-align: justify;
`
const Title = styled.h3`
   margin-bottom: 50px;
   padding-top: 10px;
`
const List = styled.ul`
   margin: 0;
   padding: 0;
   list-style: none;
   display: flex;
   flex-wrap: wrap;
   padding-top: 20px;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    cursor: pointer;
`
const Right = styled.div`
   flex: 1;
   padding-top: 20px;
   ${mobile({paddingLeft:"10px", backgroundColor:"#F8F8F8"})}   
`
const ContactItem = styled.div`
   margin-bottom: 20px;
   display: flex;
   align-items: center;
   cursor: pointer;
`
const Payment = styled.img`
   padding-top: 80px;   
   margin-left: 37%;
   ${mobile({paddingLeft:"10px", paddingTop: "10px"})}
`

export default function Footer() {
  return (
    <Container>
      <Left>
          <Logo>Fitop</Logo>
          <Description> Fitop est un site de vente de vêtements de sports et accessoires de marque, combinant
            des marques mondialement reconnues telles que Nike, adidas, Puma et The North Face,afin d'offrir
            une expérience consommateur de haut niveau. JD est une entreprise de vente au détail leader dans
            son secteur, qui combine le meilleur de la vente au détail physique et numérique pour offrir une 
            proposition convaincante aux consommateurs, qui permet à ses clients de faire leurs achats de manière 
            transparente sur tous les canaux. 
        </Description>        
      </Left>
      <Right>
          <Title> Contacter nous </Title>
          <ContactItem>
             <MailOutline style={{marginRight: "10px"}}/> contact-us@fitop.fr
          </ContactItem>
          <ContactItem>
             <Phone style={{marginRight: "10px"}}/> +33 1234567
          </ContactItem>
          <Payment src="pay.png"/>
      </Right>
    </Container>
  )
}
