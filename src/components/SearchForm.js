import React, { useEffect, useRef } from 'react'
import { useGlobalContext } from '../context'

const SearchForm = () => {

  const { setSearch } = useGlobalContext()
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const handleInput = () => {
    setSearch(inputRef.current.value)
  }

  return (
    <section className="section search">
      <div className="search-form">
        <div className="form-control">
          <label htmlFor="name">search your drink!</label>
          <input type="text" id='name' ref={inputRef} onChange={handleInput} />
        </div>
      </div>
    </section>
  )
}

export default SearchForm
