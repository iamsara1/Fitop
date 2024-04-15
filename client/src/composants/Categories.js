import React from 'react'
import styled from 'styled-components'
import {categories} from "../data"
import CategoriesITem from './CotegoriesITem'
import mobile from '../responsive';

const Container = styled.div`
   display: flex;
   padding: 20px;
   ${mobile({ padding: "0px", flexDirection:"column"})}

`
function Categories() {
  return (
    <Container>
      {categories.map(items=>(
         <CategoriesITem  items={items} key={items.id}/>
      ))}
    </Container>
  )
}

export default Categories