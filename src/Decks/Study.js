import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from '../Cards/Card';
import { readDeck } from '../utils/api';
import NotEnough from './NotEnough';

/**
 * Allows the user to studty the cards from a specified deck
 * @params
 * 
 * @returns
 * 
 */

export const Study = () => {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    
    useEffect(() => {
        const abortController = new AbortController();

        async function fetchDeck() {
            const data = await readDeck(deckId, abortController.signal);
            setDeck(data);
        }
        fetchDeck();
    }, [deckId])

    if (!deck.id) {
        return "Loading..."
    } 
    if (deck.cards.length < 3) {
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
                    <li class="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Study</li>
                </ol>
            </nav>
            <NotEnough deck={deck}/>
            </>
        );
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
                <li class="breadcrumb-item"><Link to={`/decks/${deck.id}`}>{deck.name}</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
        </nav>
        <h3>Study: {deck.name}</h3>
        <div>
            <Card deck={deck}/>
        </div>
        </>
        );
    }
};

export default Study;