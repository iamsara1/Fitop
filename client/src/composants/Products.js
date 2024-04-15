import React from 'react'
import styled from 'styled-components'
import ProductsItem from './ProductsItem'
import { useState , useEffect} from "react";
import axios from "axios";

const Container = styled.div`
padding: 20px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
`

export default function Products({ categorie, filtre, sort,search }) {
    const [produits, setProduits] = useState([]);
    const [produitsFiltrer, setproduitsFiltrer] = useState([]);


    useEffect(() => {
      const getProduits = async () => {
        let url = `http://localhost:8080/api/products`; 
        if(categorie) 
          {  url = `http://localhost:8080/api/products?category=${categorie}`;  }
        else if (search)
          {  url = `http://localhost:8080/api/products?search=${search}`; }
          
        try {
          const res = await axios.get(url);
          setProduits(res.data);
        } catch (err) {console.log("erreur")}
      }; getProduits()}, [categorie,search]);

    useEffect(() => {
      (categorie || search) &&  setproduitsFiltrer(
        produits.filter((item) =>
            Object.entries(filtre).every(([key, value]) =>
              item[key].includes(value)
            )
          )
        ); }, [produits, categorie, filtre,search]);

    useEffect(() => {
      if (sort === "les plus récents") {
        setproduitsFiltrer((prev) => [...prev].sort((a, b) => a.createdAt - b.createdAt));
      } else if (sort === "Pris bas à élevé") { setproduitsFiltrer((prev) => [...prev].sort((a, b) => a.price - b.price) );
      } else {
        setproduitsFiltrer((prev) => [...prev].sort((a, b) => b.price - a.price));
      }
    }, [sort]);

  return (
    <Container>
        {(categorie || search)
        ? produitsFiltrer.map((items) => <ProductsItem items={items} key={items.id} />)
        : produits
            .slice(9,13)
            .map((items) => <ProductsItem items={items} key={items.id} />)}
    </Container>
  )
}
