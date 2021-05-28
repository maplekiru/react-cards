import React from 'react'

/** Card component 
 * Props :
 *  code
 *  img 
 * 
 */

function Card({code, img, zIdx}){
  return (
    <div className="Card" style={{zIndex:zIdx, position:"absolute"}}  >
      <img src={img} alt={code}></img>
    </div>
  )
}

export default Card