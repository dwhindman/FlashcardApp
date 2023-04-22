import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createDeck, readDeck, updateDeck } from "../utils/api/index";

function Deck({ mode }) {
    const history = useHistory();
    const { deckId } = useParams();

    const initialFormData = {
        name: "",
        description: "",
    };

    const [formData, setFormData] = useState({...initialFormData});

    const handleChange = ({ target }) =>
    setFormData({...formData, [target.name]: target.value});

    useEffect(() => {
        const abortController = new AbortController();

        async function getDeck() {
            try{
                const deckToEdit = await readDeck(deckId, abortController.signal);
                setFormData({...deckToEdit})
            }catch(err){
                throw err;
            }
        }
        if(mode === "edit"){
            getDeck();
        }
        return () => abortController.abort();
    },[deckId, mode]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        async function createNewDeck(){
            try{
                const newDeck = await createDeck(formData, abortController.signal);
                setFormData({...initialFormData});
                history.push(`/decks/${newDeck.id}`);
            }catch(err){
                throw err;
            }
        }
        async function editDeck(){
            try{
                await updateDeck(formData, abortController.signal);
                history.push(`/decks/${deckId}`);
            }catch(err){
                throw err;
            }
        }
        mode === "create" ? createNewDeck() : editDeck();
        return () => abortController.abort(); 
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Deck Name"
                        />
                </div>
                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Brief description of deck"
                        />
                </div>
                <div className="row">
                    <Link to={mode === "create" ? "/" : `/decks/${deckId}`}
                     className="btn btn-secondary">
                        Cancel
                    </Link>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </>
    )
}

export default Deck;