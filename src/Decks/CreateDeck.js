import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../utils/api';

/**
 * @returns
 * allows user to create a new deck with no cards
 */

export const CreateDeck = () => {
    // get history first
    const history = useHistory();
    // empty the deck form
    const [deck, setDeck] = useState({
        name: '',
        description: '',
    });
    // same as deck
    const initalFormData = {
        name: '',
        description: '',
    };
    // set formData
    const [formData, setFormData] = useState({ ...initalFormData });
    // handle the updating change of text
    const handleChange = ({ target }) => {
        setFormData({
            ...formData,
            [target.name]: target.value,
        });
    };
    // If the user clicks cancel they are taken to the home screen
    const handleCancel = () => {
        history.push('/');
    };
    // If the user clicks submit, submit the form and then return to the deck screen
    const handleSubmit = (event) => {
        event.preventDefault();
        deck.name = formData.name;
        deck.description = formData.description;
        const abortController = new AbortController();
        async function addDeck(){
            const newDeck = await createDeck(deck, abortController.signal);
            setFormData({ ...initalFormData });
            history.push(`/decks/${newDeck.id}`);
        }
        addDeck();        
    };
    // no deck no display
    if (!deck) {
        return 'Loading...';
    } else {
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to='/'>
                                <span className='oi oi-home mr-2'></span>
                                Home
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                    </ol>
                </nav>
                <h2>Create Deck</h2>
                <form>
                    <div classname="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            className="form-control" 
                            id="name" 
                            name='name'
                            rows="3" 
                            placeholder='Deck Name'
                            onChange={handleChange}
                            value={formData.name}
                        ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea 
                            className="form-control" 
                            id="description" 
                            name='description'
                            rows="3" 
                            placeholder='Brief description of the deck'
                            onChange={handleChange}
                            value={formData.description}
                        ></textarea>
                    </div>
                    <button className='btn btn-secondary' onClick={handleCancel}>
                        Cancel
                    </button>
                    <button className='btn btn-primary' onClick={handleSubmit}>
                        Submit
                    </button>
                </form>
            </>
        );
    }
};

export default CreateDeck;