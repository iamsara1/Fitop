import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Home from './pages/Home';
import ListeProduits from './pages/ListeProduits';
import Panier from './pages/Panier';
import Favories from './pages/Favories';
import Login from './pages/Login';
import Produit from './pages/Produit';
import Register from './pages/Register';
import { useSelector } from "react-redux";
import ListeSearchProduits from './pages/ListeSearchProduits';


function App() {
  const utilisateur = useSelector((state) => state.utilisateur.utilisateursCourant);
  return (
    <Router>
      <Switch>
        <Route exact path="/"  component={Home}/>
        <Route exact path="/produits/search/:keysearch" component={ListeSearchProduits}/>
        <Route exact path="/produits/:categorie" component={ListeProduits}/>
        <Route exact path="/produits" component={ListeProduits}/>
        <Route exact path="/produit/:id" component={Produit}/>
        <Route path="/panier" component={Panier}/>
        <Route path="/favories" component={Favories}/>
        <Route path="/login">{utilisateur ? <Redirect to="/"/> : <Login />}</Route>
        <Route path="/register">{utilisateur ? <Redirect to="/" /> : <Register />}</Route>
      </Switch>
    </Router>
  );
  
}  

export default App;

//  <Route path="/success">
//    <Success />
//  </Route>
        
        