import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons'
import React, { useState } from 'react'
import styled from 'styled-components'
import { sliderItems } from '../data'
import mobile from '../responsive';


const Container = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    background-color: #f0f0f0;
    padding-top: 5px;
    position: relative;
    overflow: hidden;
    ${mobile({ display: "none" })}
`
const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position : absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${props=> props.direction ==="left" && "10px"};
    right: ${props=> props.direction ==="right" && "10px"};
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
`
const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transform: translateX(${(props) => props.slideIndex * - 100}vw );
    transition: all 1.5s ease;
`
const Slide = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
    //background-color: #${(props) => props.bg};
`
const ImageContainer = styled.div`
    flex: 1;
    height: 100%;
`
const InfoContainer = styled.div`
    flex: 1;
`
const Image = styled.img`
   height: 100%;
   flex: 1;
`
const Title = styled.h1`
   font-size: 50px;
`
const Desc = styled.p`
   margin: 50px 0px;
   font-size: 17px;
   font-weight: 500;
   letter-spacing: 3px;
   font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
`
const Button = styled.button`
   padding: 10px;
   font-size: 16px;
   background-color: #F5F5F5;
   cursor: pointer;
   font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
   transition: all 0.5s ease;
   
   &:hover{
    background-color: #C8C8C8;
    transform: scale(1.1);
    }
`

function Slider() {
   const [slideIndex, setSlideIndex] = useState(0);
   const handleClick =(direction) => {
       if (direction === "left"){
        setSlideIndex(slideIndex > 0 ? slideIndex -1 : 2);
       } else {
        setSlideIndex(slideIndex < 2 ? slideIndex +1 : 0);  
       }
   };
  return (
    <Container>
        <Arrow direction="left" onClick={()=>handleClick("left")}>
            <ArrowLeftOutlined/>
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
          {sliderItems.map((items) => (
            <Slide key={items.id}>
                <ImageContainer> <Image  src={items.img} /> </ImageContainer>                
            </Slide> 
           ))}         
        </Wrapper>
        <Arrow direction="right" onClick={()=>handleClick("right")}>
            <ArrowRightOutlined/>
        </Arrow>
    </Container>
  )
}

export default Slider