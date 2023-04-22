import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import Card from "./Card";
import NavBar from "../Layout/NavBar";

function EditCard(){
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState({});

    useEffect(() => {
        const abortController = new AbortController();
        async function retrieveDeck(){
            try{
                if(deckId){
                    const retrievedDeck = await readDeck(deckId, abortController.signal);
                    setDeck({...retrievedDeck});
                }
            }catch(err){
                throw err;
            }
        }
        retrieveDeck();
        return () => abortController.abort();
    }, [deckId]);

    return (
        <>
            <div>
                <NavBar linkName={`Deck $deck.name`}
                    link={`/decks/${deck.id}`}
                    pageName={`Edit Card ${cardId}`}
                    />
            </div>
            <div>
                <h2>Edit Card</h2>
                <Card mode="edit" />
            </div>
        </>
    )
}

export default EditCard;