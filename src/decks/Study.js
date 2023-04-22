import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardBtn from "../cards/CardBtn";
import NeedMoreCards from "../cards/NeedMoreCards";
import NavBar from "../Layout/NavBar";

function Study(){
    const [deck, setDeck] = useState({});
    const [count, setCount] = useState(0);
    const [cards, setCards] = useState([]);
    const [card, setCard] = useState({});
    const [nextIndex, setNextIndex] = useState(1);
    const [flipped, setFlipped] = useState(false);

    const { deckId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const abortController = new AbortController();
        async function retrieveDeck(){
            try{
                if(deckId){
                    const retrievedDeck = await readDeck(deckId, abortController.signal);
                    setDeck({...retrievedDeck});
                    setCount(retrievedDeck.cards.length);
                    setCards([...retrievedDeck.cards]);
                    setCard({...retrievedDeck.cards[0]});
                }
            }catch(err){
                throw err;
            }
        }
        retrieveDeck();
        return () => abortController.abort();
    }, [deckId]);

    const handleFlip = () =>{
        setFlipped(!flipped);
    };

    const reload = () => {
        setCard(cards[0]);
        setNextIndex(1);
        handleFlip();
    };

    const handleNext = () => {
        if(nextIndex < cards.length){
            setCard(cards[nextIndex]);
            setNextIndex((currentIndex) => currentIndex + 1);
            handleFlip();
        }else{
            const response = window.confirm(
                "Restart cards\n Click 'cancel' to return to home page."
            );
            response ? reload() : history.push("/");
        }
    };

    return (
        <>
            <div>
                <NavBar linkName={deck.name}
                    link={`/decks/${deck.id}`}
                    pageName={"Study"}
                    />
            </div>
            <h2>{deck.name}: Study</h2>
            {count < 3 || !count ? (
                <NeedMoreCards name={deck.name} id={deck.id} cards={count} />
            ) : (
                <CardBtn
                    card={card}
                    count={count}
                    index={nextIndex}
                    flipped={flipped}
                    flip={handleFlip}
                    next={handleNext}
                    />
            )}
        </>
    );
}

export default Study;