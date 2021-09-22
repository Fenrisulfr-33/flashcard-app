import React, { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import CardList from '../Cards/CardList';
import { readDeck, deleteDeck } from '../utils/api';

export const DeckView = () => {
    const history = useHistory();
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();

    useEffect(() => {
    const abortController = new AbortController();
        async function getDeck() {
            const data = await readDeck(deckId, abortController.signal);
            setDeck(data);
        }
        getDeck();
    }, [deckId])

    

    const handleDelete = async () => {
        const abortController = new AbortController();
        const result = window.confirm('Delete this deck?\n\nYou will not be able to recover it');
        if (result) {
            await deleteDeck(deckId, abortController.signal);
            history.push('/');
        }
    };

    if (!deck.id) {
        return "Loading..."
    } else {
        return (
            <>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <Link to='/'>
                            <span className='oi oi-home mr-2'></span>
                            Home
                        </Link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
            <div class="card">
                <div class="card-body">
                    <div class='row'>
                        <h5 class="card-title">{deck.name}</h5>
                    </div>
                    <p class="card-text">{deck.description}</p>
                    <div>
                        <Link to={`/decks/${deck.id}/edit`}>
                            <button className='btn btn-secondary'>
                                <span className='oi oi-pencil mr-2'></span>
                                Edit
                            </button>
                        </Link>
                        <Link to={`/decks/${deck.id}/study`}>
                            <button className='btn btn-primary'>
                                <span className='oi oi-book mr-2'></span>
                                Study
                            </button>
                        </Link>
                        <Link to={`/decks/${deck.id}/cards/new`}>
                            <button className='btn btn-primary'>
                                <span className='oi oi-plus mr-2'></span>
                                Add Cards
                            </button>
                        </Link>
                            <button 
                            className='btn btn-danger' 
                            onClick={handleDelete}>
                                <span className='oi oi-trash'></span>
                            </button>
                    </div>
                </div>
            </div>
            <div>
                <h2>Cards</h2>             
                <CardList deck={deck}/>
            </div>
            </>
        );
    }
};

export default DeckView;