import React from 'react'
import { Link } from 'react-router-dom'

const Cocktail = ({ image, name, id, info, glass }) => {
  return (
    <Link to={`/Cocktail/${id}`} className="cocktail">
      <div className="img-container">
        <img src={image} alt={name} />
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
      </div>
    </Link>
  )
}

export default Cocktail
