import { connexionCommence, connexionReussi, connexionEchoue ,deconnexion, registerStart, registerSuccess, registerFailure} from "./utilisateurRedux"
import {ajouterPanier, ajouterproduitPanier, supprimerPanier, supprimerProduitPanier} from "./panierRedux"
import { suppFavori } from "./FavoriteRedux"
import { publicRequest,userRequest } from "../requestMethods";


export const login = async (dispatch, user) => {
  dispatch(connexionCommence());
  try {
    const res = await userRequest.post(`/auth/login`, user);
    const res2 = await publicRequest.get(`/panier/find/${res.data._id}`);
    dispatch(ajouterPanier(res2.data))
    dispatch(connexionReussi(res.data));
  } catch (err) {
    dispatch(connexionEchoue());
  }
};


export const logout = async (dispatch) => {
    dispatch(supprimerPanier());
    dispatch(suppFavori());
    dispatch(deconnexion());
 };

export const viderPanier = async (dispatch,panierItem) => {
    await publicRequest.put(`/panier/${panierItem.userId}`, {userId: panierItem.userId , products :[] ,Total : 0,panierQuantity : 0 } );
    dispatch(supprimerPanier());
 };

export const suppProduitPanierAPI = async (dispatch, panierItem) => {
    try {
        const oldProducts = panierItem.produits;
        const produitSupp = panierItem.produit;

        const products = oldProducts.filter(product =>  product._id !== produitSupp._id )
        const total = products.reduce((total, produit) => total + (produit.price ),0);

        await publicRequest.put(`/panier/${panierItem.userId}`, {userId: panierItem.userId , products :products ,Total : total,panierQuantity : products.length } );
        dispatch(supprimerProduitPanier({produit:produitSupp}));
    } catch (err) {}
};



 export const sendMail = async (mail) => {
  try {
    await publicRequest.post("/newsletter/signup", mail);
  } catch (err) {}
};

 export const inscrire = async (dispatch, user) => {
  dispatch(registerStart());
  try {  
    const res = await publicRequest.post("/auth/inscrire", user);
    await publicRequest.post("/panier/", {userId: res.data._id , products:[]} );
    dispatch(registerSuccess(res.data));
  } catch (err) {
    dispatch(registerFailure());
  }
};

export const ajouterProduitPanierAPI = async (dispatch, panierItem) => {
   try {
        const oldProducts = panierItem.produits;
        const products = [...oldProducts , panierItem.produit];
        const total = products.reduce((total, produit) => total + (produit.price),0);

        await publicRequest.put(`/panier/${panierItem.userId}`, {userId: panierItem.userId , products :products ,Total : total,panierQuantity : products.length } );
        dispatch(ajouterproduitPanier(panierItem));
    } catch (err) {}
};

