import React, { useState, useEffect } from 'react'
import Card from './Card'
import axios from 'axios'

const DECK_API_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
const API_CARD_DRAW_URL = 'https://deckofcardsapi.com/api/deck/';
/**
 * CardGame
 * 
 * Props: None
 * State: 
 *  - [{cardData: img, id}...]
 * 
 * App --> CardGame --> Card
 */


function fetchDeckIdOnLoad() {
  async function getDeckId() {
    const resp = await axios.get(DECK_API_URL);
    console.log(resp.data);
    const id = resp.data.deck_id;
    return id
  }
}
const deckId = fetchDeckIdOnLoad()

function CardGame() {
  // const [deckId, setDeckId] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  /**
   * On 1st Render get deckId from API and set state deckId
   */
  // useEffect(function fetchDeckIdOnLoad(){

  //     setDeckId(id);
  //   }
  //   getDeckId();
  // },[]);

  useEffect(function fetchCardOnClick() {
    async function getCard() {
      const resp = await axios.get(`${API_CARD_DRAW_URL}/${deckId}/draw`);
      console.log(resp.data);
      const card = resp.data.cards[0];
      setCardData(cardData => [...cardData, card])
      setIsDrawing(false);
    }
    getCard();
  }, [isDrawing])

  /**
   * On button click draws card from API and ...
   */
  function drawCard(evt) {
    setIsDrawing(true);
  }

  return (
    <div>
      <button onClick={drawCard}> Draw Card </button>
    </div>
  )

}

export default CardGame