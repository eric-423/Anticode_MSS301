import React from 'react'
import Promotions from './promotions/Promotions'
import PaymentMethod from './payment-method/PaymentMethod'

const Payment = () => {
  return (
    <div className='col-span-2 mb-10'>
        <Promotions />
        <PaymentMethod />
    </div>
  )
}

export default Payment