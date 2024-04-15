import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import Announcement from '../composants/Announcement'
import { useSelector, useDispatch  } from "react-redux";
import Footer from '../composants/Footer'
import Navbar from '../composants/Navbar'
import { Add, Close, FavoriteRounded, Remove, ShoppingCartRounded } from '@material-ui/icons'
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Link } from "react-router-dom";
import {suppProduitPanierAPI, viderPanier} from "../redux/FontionAPI"
import mobile from '../responsive';
import { supprimerProduitPanier } from '../redux/panierRedux';
import { useHistory } from "react-router";
import { userRequest } from "../requestMethods";
import MenuNavbar from '../composants/Menu'


const CONST_KEY = "pk_test_51KZfooCdM8sTJrsGumDQtdXReAppgLeZ8OVRUhl8BNpgDS49NghPxvgD1fxpipYV4TFWcujnNFVak4OYv0GGWtp500BTJBvLsJ";

const Container = styled.div`

`
const Wrapper = styled.div`
   padding: 20px;   
   ${mobile({ padding: "10px" })}
`
const Title = styled.h1`
   font-weight: 600;
   text-align: center;
`
const Top = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 10px;   

`
const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;border-radius: 20px;
  border: ${(props) => props.type === "check" && "none"};
  background-color: ${(props) =>props.type === "check" ? "black" : "transparent"};
  color: ${(props) => props.type === "check" && "white"};
  border-radius: 20px;
  &:hover{
    background-color: ${(props) =>props.type === "check" ? "#282828" : "#E0E0E0"};
    }     
`
const TopTexts = styled.div`
     ${mobile({ display: "none" })}
`
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
  font-weight: 700;
`
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #F8F8F8	;
  ${mobile({ flexDirection: "column" })}
`
const Info = styled.div`
  flex: 3;
`
const Product = styled.div`
  display: flex;
  justify-content: space-between;  
  border: 3px solid white; 
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
`;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid gray;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;  
  margin-left: 110 px;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;  
  ${mobile({ marginTop:"20px" })}
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  margin-left: 222px;
`

const Espace = styled.hr`
  background-color: white;
  border: none;
  height: 3px;
`
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 60vh;
  background-color: white;
`
const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #101010;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-radius: 20px;
  border: none;
  &:hover{
    background-color: #282828;
    }
`;



export default function Panier() {
  const panier = useSelector((state) => state.panier);
  const [stripeToken, setStripeToken] = useState(null);
  const utilisateur = useSelector((state) => state.utilisateur.utilisateursCourant);
  const history = useHistory();

  const Token = (token) => {
    setStripeToken(token);
  };

const d = useDispatch();
  const Click = () => {
    viderPanier(d,{userId:utilisateur._id});
  }; 


  const fermer = (produit) =>{
    suppProduitPanierAPI(d,{userId:utilisateur._id ,produits : panier.produits , produit:produit})
  }


  const prods = panier.produits.map((product) => ({
    productId: product._id,
    quantity: product.quantity,
  }));

  useEffect(() => {
    const makeRequest = async () => {
      const order = {
        userId: utilisateur._id,
        products: [...prods],
        amount: panier.total,
        address: `${stripeToken.card.address_city} ${stripeToken.card.address_line1}`,
      };
      try {
        await userRequest.post("/orders", order);
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });

        history.push("/success", {
          stripeData: res.data,
          products: panier,
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, panier.total, history]);

  return (
    <Container>
      <Navbar/>
      <Announcement/>
      <Wrapper>
         <Top>
             <Link to={`/produits`}>
             <TopButton> Continuer vos achats </TopButton>
             </Link>
             <TopButton type="check" onClick={Click}> Vider Votre Panier</TopButton>
         </Top>
         <Bottom>
         <Info>               
         { panier.produits.map((produit) => (      
           <Product>
              <ProductDetail>
                <Image src={produit.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {produit.title}
                  </ProductName>
                  <ProductColor color={produit.color} />
                  <ProductSize>
                    <b>Size:</b> {produit.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                <ProductAmount>{produit.quantite} </ProductAmount>                
                </ProductAmountContainer>
                <ProductPrice>{produit.price}.00 €</ProductPrice>
              </PriceDetail>               
              <Close onClick={()=>fermer(produit)}  style={{cursor: "pointer" , marginRight:"10px"}}/>             
            </Product> ))}
          </Info>
                    
          <Summary>
            <SummaryTitle>RÉCAPITULATIF DE LA COMMANDE</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Total sans livraison</SummaryItemText>
              <SummaryItemPrice>{panier.total}.00 €</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Frais de livraison</SummaryItemText>
              <SummaryItemPrice>{panier.total>100 || panier.total==0  ? 0 : 15}.00 €</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText></SummaryItemText>
              <SummaryItemPrice></SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{panier.total>100 || panier.total==0  ? panier.total : panier.total+15}.00 €</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="sara saad"          
              billingAddress
              shippingAddress
              description={`Vous devez payer ${panier.total}.00 €`}
              amount={panier.total * 100}
              token={Token}
              stripeKey={CONST_KEY}
            >
              <Button>Payer maintenant</Button>
            </StripeCheckout>
          </Summary>
         </Bottom>
      </Wrapper>
      <Footer/>
    </Container>
  )
}
