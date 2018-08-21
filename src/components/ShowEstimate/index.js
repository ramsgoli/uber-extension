import React from 'react'

export default ({ prices }) => (
  <div className='container show-prices'>
    {prices.map(price => {
      return <span>{price.estimate}</span>
    })}
  </div>
)
