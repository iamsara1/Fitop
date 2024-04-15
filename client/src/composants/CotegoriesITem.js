import React from 'react'
import styled from 'styled-components'
import mobile from '../responsive';
import { Link } from "react-router-dom";


const Container = styled.div`
    flex: 1;
    margin: 5px;
    height: 70vh;
    position: relative;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    ${mobile({ height:"25vh" })}
`
const Info = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

`
const Title = styled.h2`
    color: white;
    margin-bottom: 20px;
`

const Button = styled.button`
   border: none;
   padding: 10px;
   background-color: white;
   color: gray;
   cursor: pointer;
   font-weight: 700;
   transition: all 0.5s ease;  
   &:hover{
    background-color: #C8C8C8;
    transform: scale(1.1);
    }

`

function CategoriesITem({items}) {
  return (
    <Container>
      <Link to={`/produits/${items.categorie}`}>
      <Image src={items.img}/>
      <Info>
        <Title>{items.title}</Title>
        <Button> ACHETER MAINTENANT </Button>
      </Info>
      </Link>
    </Container>
  )
}

export default CategoriesITem