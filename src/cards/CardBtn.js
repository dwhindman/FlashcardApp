import React from "react";

function CardBtn({card, flip, flipped, count, index, next}){
    const nextBtn = (
        <button type="button" className="btn btn-primary" 
        onClick={next}>
            Next
        </button>
    );

    return (
        <>
            <div className="card">
                <div className="card-body">
                <h4 className="card-title">
                    Card {index} of {count}
                </h4>
                <p className="card-text">{!flipped ? card.front : card.back}</p>
                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={flip}
                    >
                    Flip
                </button>
                {flipped && nextBtn}
                </div>
            </div>
        </>
    );
}

export default CardBtn;