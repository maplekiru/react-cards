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

function CardGame() {
  const [deckId, setDeckId] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
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


  // when isDrawing changes , pull one card from API and add 
  // it to cardData State
  useEffect(function fetchCardOnClick() {
    async function getCard() {
      const resp = await axios.get(`${API_CARD_DRAW_URL}/${deckId}/draw`);
      console.log(resp.data);
      const card = resp.data.cards[0];
      setCardData(cardData => [...cardData, card]);
      console.log("Changing is Drawing state,", isDrawing)
      // setIsDrawing(false);
    }
    if (deckId) {
      getCard()
    };
  }, [isDrawing]);

  /**
   * On button click draws card from API and ...
   */
  function drawCard(evt) {
    setIsDrawing(!isDrawing);
  }
  
  
  
  const cardImages = cardData.map((c, idx) => <Card key={c.code} code={c.code} img={c.images.png} zIdx={idx}/>)
  
  // this is a filler 
  if(cardData.length > 51){
    return <h1>LOSER!</h1>
  }

  return (
    <div>
      {/*  shouldn't be able to draw card while loading */}
      
      <button onClick={drawCard}> Draw Card </button> :
      
      <div style={{display:"flex", justifyContent:"center"}}>
      {cardImages}
      </div>

    </div>
  )

}

export default CardGame