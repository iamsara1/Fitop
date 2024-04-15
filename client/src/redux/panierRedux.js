import { createSlice } from "@reduxjs/toolkit";
const panier = createSlice({
  name: "panier",
  initialState: {
    produits: [],
    quantite: 0,
    total: 0   
   },
  reducers: {
    ajouterproduitPanier: (state, action) => {
    const prod = state.produits.filter(produit => produit._id === action.payload.produit._id);      
      if(prod.length !== 0 ){
          prod[0].price += action.payload.produit.price;
          prod[0].quantite += action.payload.produit.quantite;
          state.produits= state.produits.filter(produit => produit._id !== action.payload.produit._id);
          state.produits.push(prod[0]);
      }else{
        state.quantite += 1;
        state.produits.push(action.payload.produit);
      }
      state.total += action.payload.produit.price ;

    },
    ajouterPanier : (state,action) => {
      state.produits = action.payload.products;
      state.quantite = action.payload.panierQuantity;
      state.total= action.payload.Total;
    },
    supprimerPanier : (state) => {
      state.produits = [];
      state.quantite = 0;
      state.total= 0;
    },
    supprimerProduitPanier : (state, action) => {
      state.quantite -= 1;
      state.total -= state.produits.filter(produit => produit._id === action.payload.produit._id)[0].price
      state.produits= state.produits.filter(produit => produit._id !== action.payload.produit._id);
    },
  },
});

export const { ajouterproduitPanier,supprimerPanier,supprimerProduitPanier,ajouterPanier } = panier.actions;
export default panier.reducer;