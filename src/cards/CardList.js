import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { deleteCard } from "../utils/api/index";

function CardList({cards}) {
    const history = useHistory();
    const { url } = useRouteMatch();

    async function handleDelete(idToDelete){
        const abortController = new AbortController();
        try{
            const result = window.confirm(
                "Delete this card?\nYou will not be able to recover it."
            );
            if(result){
                await deleteCard(idToDelete, abortController.signal);
                window.location.reload();
            }
        }catch(err){
            throw err;
        }

        return () => abortController.abort();
    }

    return (
        cards && (
            <div>
                {cards.map((card) => (
                    <div className="card" key={card.id}>
                        <div className="card-body">
                            <div>
                                <p>{card.front}</p>
                            </div>
                            <div>
                                <p>{card.back}</p>
                                <button className="btn btn-secondary"
                                    type="button"
                                    onClick={() => history.push(`${url}/cards/${card.id}/edit`)}
                                    > Edit</button>

                                <button className="btn btn-danger"
                                    type="button"
                                    onClick={() => handleDelete(card.id)}
                                    > Delete</button>
                            </div>
                        </div>    
                    </div>
                ))}
            </div>
        )
    )
}

export default CardList;