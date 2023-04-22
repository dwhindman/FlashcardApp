import React from "react";
import { Link } from "react-router-dom";
import { deleteDeck } from "../utils/api/index";

function DeckList({decks}){

    async function handleDelete(idToDelete){
        const abortController = new AbortController();
        try{
            const result = window.confirm(
                "Delete this deck?\n You will not be able to recover it."
            );
            if(result){
                await deleteDeck(idToDelete, abortController.signal);
                window.location.reload();
            }
        }catch(err){
            throw(err)
        }

        return () => abortController.abort();
    }

    return (
        <>
         {decks.map((deck) => (
            <div className="card" key={deck.id}>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <div className="flex-item">
                            <h2 className="card-title">{deck.name}</h2>
                        </div>
                        <div className="flex-item">
                            <p className="text-muted">{deck.cards.length} cards</p>
                        </div>
                    </div>

                    <p className="card-text">{deck.description}</p>

                    <div className="d-flex justify-content-between">
                        <div className="">
                        <Link className="btn btn-secondary" to={`/decks/${deck.id}`}>
                            View
                        </Link>
                        <Link className="btn btn-primary" to={`/decks/${deck.id}/study`}>
                            Study
                        </Link>
                        </div>
                    <div className="">
                    <button className="btn btn-danger" 
                        type="button"
                        onClick={() => handleDelete(deck.id)}>Delete</button>
                    </div>
                    </div>
                </div>
            </div>
         ))}
        </>
    )
}

export default DeckList;