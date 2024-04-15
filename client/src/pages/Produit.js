import React from 'react'
import styled from 'styled-components'
import Footer from '../composants/Footer'
import Navbar from '../composants/Navbar'
import Nouveautes from '../composants/Nouveautes'
import { Add, Remove } from "@material-ui/icons"
import { useEffect, useState } from "react"
import {  useLocation } from "react-router-dom"
import { ajouterproduitFavori,supprimerproduitFavori } from "../redux/FavoriteRedux"
import axios from 'axios'
import { ajouterProduitPanierAPI} from "../redux/FontionAPI"
import { useDispatch,useSelector } from "react-redux"
import mobile from '../responsive';
import { FavoriteBorderOutlined } from '@material-ui/icons'
import MenuNavbar from '../composants/Menu'
import { Favorite} from '@material-ui/icons'
import { useHistory } from 'react-router-dom'

const Container = styled.div`
`
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px",flexDirection:"column", marginTop: "20px" })}
`

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({ padding: "10px" })}
`

const Title = styled.h1`
  font-weight: 500;
  font-size: 45px;
  ${mobile({ fontweight: "200", fontSize:"30px" })}
`

const Desc = styled.p`
  margin: 20px 0px;
  margin-top: -20px ;
  color: #333333;
  font-weight: 450;
`

const Price = styled.span`
  font-weight: 500;
  font-size: 35px;
  color: #333333;
  text-align: end;
`
const FilterContainer = styled.div`
  width: 100%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
  margin-left: 10px;
  border: 1px solid gray;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
  width: 120px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid gray;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid gray;
  background-color: black;
  margin-left: 10px;
  cursor: pointer;  
  color: white;
  width: 400px;
  font-weight: 800;
  &:hover{
      background-color: #191919;
  }
  ${mobile({ width: "200px" })}
`;
export default function Produit() {
  const lien = useLocation();
  const id = lien.pathname.split("/")[2];
  const [produit, setProduit] = useState({});
  const [quantite, setQuantite] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const utilisateur = useSelector((state) => state.utilisateur.utilisateursCourant);
  const produits = useSelector(state => state.panier.produits);
  const BASE_URL = "http://localhost:8080/api/";
  useEffect(() => {
    const getProduit = async () => {
      try {
        const res = await axios.get(BASE_URL  + `products/find/`+ id);
        setProduit(res.data);
      } catch {}
    };
    getProduit();
  }, [id]);

  const MODQuantite = (type) => {
    if (type === "remove") { quantite > 1 && setQuantite(quantite - 1);} 
    else {setQuantite(quantite + 1); }
  }; 
  const P = useDispatch();
  const F = useDispatch();
  const S = useDispatch();
  const MODClick = () => {
      if(utilisateur!=null){
     (color!=="" && size !=="") ?
         ajouterProduitPanierAPI(P,{produit:{ ...produit, quantite, price:produit.price*quantite, color , size},userId : utilisateur._id,produits})
         : alert("Veuillez entrez votre taille et la couleur !! ")  }
      else {
          history.push(url);
      }
  };
  

  const wishlist = useSelector((state) => state.wishlist);
  let url = "/login";
  let history = useHistory();

  const existeProduit =  wishlist.produits.filter(prod => prod._id === produit._id )
  console.log(existeProduit)

  const R =() =>{

   if (existeProduit.length === 0){                                                
    F(
      ajouterproduitFavori({ produit}),
     );       
  } else {
          S(
          supprimerproduitFavori( {produit})  
            ); 
       }
}
  return (
    <Container>
      <Navbar/>
      <MenuNavbar/>
      <Wrapper>
        <ImgContainer>
          <Image src={produit.img} />
        </ImgContainer>
        <InfoContainer>
            <Title> {produit.title}</Title>
            <Desc>  {produit.desc} </Desc>
            <Price>{produit.price},00 €</Price>
            <FilterContainer>
             <Filter>
              <FilterTitle>Couleur :</FilterTitle>
              {produit.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
             </Filter>
             <Filter>
              <FilterTitle>Taille :</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
              <FilterSizeOption disabled selected> Size </FilterSizeOption>
                {produit.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
             </Filter>
            </FilterContainer>
            <AddContainer>
             <AmountContainer>
              <Remove style={{cursor: "pointer"}} onClick={() => MODQuantite("remove")}/>
              <Amount>{quantite}</Amount>
              <Add style={{cursor: "pointer"}} onClick={() => MODQuantite("add")} />
             </AmountContainer>
             <Filter>
             <Button onClick={MODClick}>AJOUTER AU PANIER</Button>             
             {
               existeProduit.length === 0 ? <FavoriteBorderOutlined style={{marginLeft: "10px", fontSize:"35px", cursor:"pointer"}}  onClick={R}/>   :
              <Favorite style={{marginLeft: "10px", fontSize:"35px", cursor:"pointer"}}  onClick={R}/>    
             }
             
             </Filter>
            </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Nouveautes/>
      <Footer/>
    </Container>
  )
}
