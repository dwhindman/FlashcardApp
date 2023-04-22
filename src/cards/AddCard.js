import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
import NavBar from "../Layout/NavBar";
import { readDeck } from "../utils/api/index";

function AddCard(){
    const { deckId } = useParams();
    const [currentDeck, setCurrentDeck] = useState({});

    useEffect(() => {
        const abortController = new AbortController();
        async function retrieveDeck() {
            try{
                if(deckId){
                    const retrievedDeck = await readDeck(deckId, abortController.signal);
                    setCurrentDeck({...retrievedDeck})
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
                <NavBar linkName={currentDeck.name}
                    link={`decks/${currentDeck.id}`}
                    pageName={"Add Card"}
                    />
            </div>
            <div className="d-flex flex-column">
                <h2>{currentDeck.name}: Add Card</h2>
                <Card />
            </div>
        </>
    )
}

export default AddCard;