import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams} from "react-router-dom";
import { createCard, readCard, updateCard } from "../utils/api/index";

function CardForm({ mode = "create" }){
    const history = useHistory();
    const { deckId, cardId } = useParams();

    const initialFormData = {
        front: "",
        back: "",
    };

    const [formData, setFormData] = useState({...initialFormData});

    const handleChange = ({ target }) => {
        setFormData({...formData, [target.name]: target.value });
    }

    useEffect(() => {
        const abortController = new AbortController();
        async function getEditCard() {
            try{
                const cardToEdit = await readCard(cardId, abortController.signal);
                setFormData({...cardToEdit});
            }catch(err){
                throw err;
            }
        }
            if(mode === "edit") {
                getEditCard();
            }
        
            return () => abortController.abort();
        
    }, [cardId, mode]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const abortController = new AbortController();
        async function addCard(){
            try{
                await createCard(deckId, formData, abortController.signal);
                setFormData({...initialFormData});
            }catch(err){
                throw err;
            }
        }
        async function editCard(){
            try{
                await updateCard(formData, abortController.signal);
                history.push(`/decks/${deckId}`);
            }catch(err){
                throw err;
            }
        }
        mode === "edit" ? editCard() : addCard();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <label htmlFor="front">Front</label>
                <textarea
                    type="text"
                    className="form-control"
                    id="front"
                    name="front"
                    value={formData.front}
                    onChange={handleChange}
                    placeholder="Front side of card"
                    />
            </div>
            <div className="row">
                <label htmlFor="back">Back</label>
                <textarea
                    type="text"
                    className="form-control"
                    id="back"
                    name="back"
                    value={formData.back}
                    onChange={handleChange}
                    placeholder="Back side of card"
                    />
            </div>
            <div className="row">
                <Link to={`/decks/${deckId}`} className="btn btn-primary">
                    {mode === "edit" ? "Cancel" : "Done" }
                    </Link>
                <button type="submit" className="btn btn-primary">
                    {mode === "edit" ? "Submit" : "Save"}
                </button>
            </div>
        </form>
    );
}

export default CardForm;