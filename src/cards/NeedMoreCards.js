import React from "react";
import { Link } from "react-router-dom";

function NeedMoreCards({ id, cards }){
    return (
        <div>
            <h3>Not enough cards.</h3>
            <p>
                You need at least 3 cards to study.
                There are {cards} cards in this deck.
            </p>
            <div>
                <Link className="btn btn-primary"
                to={`/decks/${id}/cards/new`}>
                    Add Cards
                </Link>
            </div>
        </div>
    );
}

export default NeedMoreCards;