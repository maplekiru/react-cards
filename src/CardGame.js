import React, { useState, useEffect } from 'react'
import Card from './Card'
import axios from 'axios'

const DECK_API_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1';
const API_CARD_DRAW_URL = 'https://deckofcardsapi.com/api/deck/';
// Make one const base URL

/**
 * CardGame
 * 
 * Props: None
 * State: 
 *  - cardsData [{img, id}...]
 *  - deckID
 *  - isDrawing
 *  - isShuffling
 * 
 * App --> CardGame --> Card
 */

// think about changing name to make clear its a deck
function CardGame() {
  const [deckId, setDeckId] = useState(null);
  const [cardsData, setCardsData] = useState([]); // update to cards
  const [isDrawing, setIsDrawing] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  console.log("page set and rendered");


  /**
   * On 1st Render get deckId from API and set state deckId
   */

  useEffect(function getDeckIdOnLoad() {
    async function getDeckId() {
      const resp = await axios.get(DECK_API_URL);
      console.log(resp.data);
      const id = resp.data.deck_id;
      setDeckId(id);
    }
    getDeckId();
  }, []);


  /** when isDrawing is true, pull one card from API and add
   * it to cardsData State */
  useEffect(function fetchCardOnClick() {
    async function getCard() {
      const resp = await axios.get(`${API_CARD_DRAW_URL}/${deckId}/draw`);
      const card = resp.data.cards[0];
      setCardsData(cardsData => [...cardsData, card]);
      setIsDrawing(false);
      console.log(card)
    }
    if (isDrawing) {
      getCard()
    };
  }, [isDrawing, deckId]);

  /** when isShuffling is true, shuffle deck from API reset cardsData */
   useEffect(function fetchShuffleDeck() {
    async function getShuffle() {
      await axios.get(`${API_CARD_DRAW_URL}/${deckId}/shuffle`);
      setCardsData([]);
      setIsShuffling(false);
    }

    if (isShuffling) {
      getShuffle()
    };
  }, [isShuffling, deckId]);

  /**
   * On button click draws card from API
   */
  function drawCard(evt) {
    setIsDrawing(true);
  }

  /**
   * On button click shuffles deck from API
   */
   function shuffleDeck(evt) {
    setIsShuffling(true);
  }


  // maps Card Elements to render //make name cardElems
  const cards = cardsData.map((c, idx) => 
  <Card key={c.code} code={c.code} img={c.images.png} zIdx={idx} />)

  // condition to check if all the cards have been drawn
  if (cardsData.length === 52) {
    return <h1>LOSER!</h1>
  }
  
  return (
    <div>
        <button onClick={drawCard} disabled={isDrawing}> Draw Card </button> 
      <button onClick={shuffleDeck} disabled={isShuffling}> ShuffleDeck </button>


      <div style={{ display: "flex", justifyContent: "center" }}>
        {cards}
      </div>

    

    </div>
  )

}

export default CardGame