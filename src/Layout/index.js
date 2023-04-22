import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home/Home";
import CreateDeck from "../decks/CreateDeck";
import EditDeck from "../decks/EditDeck";
import Study from "../decks/Study";
import AddCard from "../cards/AddCard";
import EditCard from "../cards/EditCard";
import ViewDeck from "../decks/ViewDeck";

function Layout() {
  return (
    <>
      <Header />
        <div className="container">
          <Switch>
           <Route exact path="/">
             <Home />
           </Route>
           <Route exact path={"/decks/new"}>
            <CreateDeck />
           </Route>
           <Route exact path={"/decks/:deckId/edit"}>
            <EditDeck />
           </Route>
           <Route exact path={"/decks/:deckId/study"}>
            <Study />
           </Route>
           <Route exact path={"/decks/:deckId/cards/new"}>
            <AddCard />
           </Route>
           <Route exact path={"/decks/:deckId/cards/:cardId/edit"}>
            <EditCard />
           </Route>
           <Route exact path={"/decks/:deckId"}>
            <ViewDeck />
           </Route>
           <Route>
            <NotFound />
           </Route>
          </Switch>
       </div>
      
    </>
  );
}

export default Layout;
