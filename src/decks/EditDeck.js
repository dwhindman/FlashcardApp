import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import Deck from "./Deck";
import NavBar from "../Layout/NavBar";

function EditDeck(){
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();

    useEffect(() => {
        const abortController = new AbortController();
        async function getCurrentDeck(){
            try{
                const currentDeck = await readDeck(deckId, abortController.signal);
                setDeck({...currentDeck});
            }catch(err){
                throw err;
            }
        }
        getCurrentDeck();
        return () => abortController.abort();
    },[deckId]);

    return (
        <>
        <div>
            <NavBar linkName={deck.name}
                link={`/decks/${deck.id}`}
                pageName={"Edit Deck"}
                />
        </div>
        <div>
            <h2>Edit Deck</h2>
            <Deck mode="edit" />
        </div>
        </>
        
    )
}

export default EditDeck;