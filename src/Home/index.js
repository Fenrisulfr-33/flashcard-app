import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listDecks } from '../utils/api';
import DeckList from '../Decks/DeckList';

/**
 * @params
 * 
 * @returns
 */

export default function Home() {
    const [decks, setDecks] = useState();
    useEffect(() => {
        const abortController = new AbortController();

        async function fetchDecks() {
            const data = await listDecks(abortController.signal);
            setDecks(data);
            console.log(data);
        }
        fetchDecks();
    }, [])
    // empty array means it only runs once
    if (!decks) {
        return "Loading..."
    } else {
        return (
            <div>
                <div className='actions'>
                    <Link to='/decks/new'>
                        <button className='btn btn-secondary'>
                            <span className='oi oi-plus mr-2'></span>
                            Create Deck
                        </button>
                    </Link>
                </div>
                <div>
                    <DeckList decks={decks}/>
                </div>
            </div>
        );
    }
}