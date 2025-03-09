// React and react related imports
import React from 'react'

// Custom Component
import Header from '../Header';

// Styles
import './styles.scss';

const BuyNow = () => {
  return (
    <div>
        <Header/>
        <div className='buy_now-heading'>
            <h2>Buy Product List</h2>
        </div>
    </div>
  )
}

export default BuyNow