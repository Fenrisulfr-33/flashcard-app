import React from 'react';
import {  Link, useHistory } from 'react-router-dom';
import { deleteDeck } from '../utils/api';

/**
 * Shows all of the information about a specified deck with options to edit or add cards to the deck,
 * navigate to the study screen, or delet the deck
 * @params
 * ? deck database ?
 * @returns
 * path = '/decks/:deckId'
 * Shows info about deck with buttons
 */
export const Deck = ({ deck }) => {
    const history = useHistory();
    
    const handleDelete = async () => {
        const abortController = new AbortController();
        const result = window.confirm('Delete this deck?\n\nYou will not be able to recover it');
        if (result) {
            await deleteDeck(deck.id, abortController.signal);
            history.push('/');
        }
    };

    return (
        <div class="card">
        <div class="card-body">
            <div class='row'>
                <h5 class="card-title">{deck.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{deck.cards.length} cards</h6>
            </div>
            <p class="card-text">{deck.description}</p>
            <div>
                <Link to={`/decks/${deck.id}`}>
                    <button className='btn btn-secondary'>
                        <span className='oi oi-eye mr-2'></span>
                        View
                    </button>
                </Link>
                <Link to={`/decks/${deck.id}/study`}>
                    <button className='btn btn-primary'>
                        <span className='oi oi-book mr-2'></span>
                        Study
                    </button>
                </Link>
                    <button 
                    className='btn btn-danger' 
                    onClick={handleDelete}
                    >
                        <span className='oi oi-trash'></span>
                    </button>
            </div>       
        </div>
        </div>
    );
}

export default Deck;