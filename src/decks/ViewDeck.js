import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";
import { readDeck, deleteDeck } from "../utils/api";
import NavBar from "../Layout/NavBar";
import CardList from "../cards/CardList";

function ViewDeck() {
    const { deckId } = useParams();
    const history = useHistory();
    const { url } = useRouteMatch();
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
    
    async function handleDelete(idToDelete){
        try{
            const result = window.confirm(
                "Delete this deck?\n You will not be able to recover it."
            );
            if(result){
                const abortController = new AbortController();
                await deleteDeck(idToDelete, abortController.signal);
                history.push("/");
            }
        }catch(err){
            throw err;
        }
    }

    return (
        <>
            <NavBar pageName={deck.name} />
            {!deck.id ? (
                <>
                    <h2>Loading Deck...</h2>
                </>
            ) : (
                <>
                    <div>
                        <h2>{deck.name}</h2>
                        <p>{deck.description}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="flex-item">
                            <Link
                                className="btn btn-secondary"
                                to={`/decks/${deck.id}/edit`}>
                                    Edit
                            </Link>
                            <Link
                                className="btn btn-primary"
                                to={`/decks/${deck.id}/study`}>
                                    Study
                            </Link>
                            <Link 
                                className="btn btn-primary"
                                to={`${url}/cards/new`}>
                                    Add Cards
                            </Link>
                        </div>
                        <div className="flex-item">
                            <button
                                className="btn btn-danger"
                                type="button"
                                onClick={() => handleDelete(deck.id)}
                                > Delete </button>
                        </div>
                    </div>
                    <div>
                        <h2>Cards</h2>
                        <CardList cards={deck.cards} />
                    </div>
                </>
            )}
        </>
    )
}

export default ViewDeck;