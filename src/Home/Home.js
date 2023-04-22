import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { listDecks } from "../utils/api/index";
import DeckList from "../decks/DeckList"

function Home(){
    const [decks, setDecks] = useState([]);
    
    useEffect(() => {
        const abortController = new AbortController();

        async function loadDecks() {
            try{
                const deckList = await listDecks();
                setDecks([...deckList]);
            }catch(err){
                throw(err)
            }
        }
        loadDecks();
        return abortController.abort();
    }, []);

    return (
    <>
        <div className="mb-2">
            <Link className="btn btn-secondary" to="/decks/new">
                + Create Deck
            </Link>
        </div>
        <div>
            <DeckList decks={decks} />
        </div>
        
    </>
    );
}

export default Home;