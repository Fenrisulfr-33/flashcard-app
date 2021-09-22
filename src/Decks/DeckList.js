import React from 'react';
import Deck from './Deck';

/**
 * @props
 * an array od decks
 * @returns
 * a list of Deck componenets
 */

export const DeckList = ({ decks }) => {
    // Do not modify prop, map prop
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