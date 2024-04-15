import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";

const Container = styled.div`
   flex: 1;
   margin: 5px;
   min-width: 280px;
   height: 350px;
   display: flex;
   align-items: center;
   justify-content: center;
   position: relative;
`
const Circle = styled.div`
   width: 200px;
   height: 200px;
   border-radius: 50%;
   background-color: white;
   position: absolute;
`
const Image = styled.img`
   width: 100%;
   height: 100%;
   object-fit: contain; //cover
   z-index: 2;
`
const Info = styled.div`
   width: 100%;
   height: 100%;
   position: absolute;
   top: 0;
   left: 0;
   background-color: rgba(0,0,0,0.2);
   z-index: 3;
   display: flex;
   justify-content: center;
   align-items: center;
   opacity: 0;
   transition: all 0.5 ease;  
   &:hover {
       opacity: 1;
   }
`
const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    align-items: center;
    display: flex;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    cursor: pointer;

    &:hover{
        background-color: rgba(0,0,0,0.1);
        transform: scale(1.1);
    }
`

export default function ProductsItem({items}) {
  return (
    <Container>
       <Circle  />
       <Image src={items.img}/>
       <Info>
           <Icon>
           <Link to={`/produit/${items._id}`}>
          <SearchOutlined style={{color: "black"}} />
          </Link>
           </Icon>
           <Icon>
           <Link to={`/produit/${items._id}`}>
               <ShoppingCartOutlined style={{color: "black"}} />
            </Link>
           </Icon>
       </Info>
    </Container>
  )
}
