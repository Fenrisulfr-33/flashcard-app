import React from 'react';
import Deck from './Deck';

/**
 * @params
 * 
 * @returns
 */

export const DeckList = ({ decks }) => {
    const list = decks.map((deck) => <Deck key={deck.id} deck={deck} />);

    return (
        <section className='container'>
            <div className='row'>
                {list}
            </div>
        </section>
    );
}

export default DeckList;