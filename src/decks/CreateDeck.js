import React from "react";
import Deck from "./Deck";
import NavBar from "../Layout/NavBar";

function CreateDeck(){

    return(
        <>
        <div>
            <NavBar pageName="Create Deck" />
        </div>
        <div>
            <h2>Create Deck</h2>
            <Deck mode="create" />
        </div>
        </>
    );
}

export default CreateDeck;