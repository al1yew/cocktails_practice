import React from 'react'
import Cocktail from './Cocktail'
import Loading from './Loading'
import { useGlobalContext } from '../context'

const CocktailList = () => {

  const { loading, cocktails } = useGlobalContext()

  if (loading) {
    return <Loading />
  }

  if (cocktails.length === 0) {
    return <h2 className='section-title'>no cocktails are there!</h2>
  }

  return (
    <section className="section">
      <h2 className="section-title">
        cocktails
      </h2>
      <div className="cocktails-center">
        {
          cocktails.map(c => {
            return <Cocktail key={c.id} {...c} />
          })
        }
      </div>
    </section>
  )

}

export default CocktailList
