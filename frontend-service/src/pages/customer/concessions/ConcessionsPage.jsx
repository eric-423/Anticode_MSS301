import React from 'react'
import Header from '../../../components/customer/header/Header'
import Footer from '../../../components/customer/footer/Footer'
import Concessions from '../../../components/customer/booking-ticket/concessions/Concessions'
import ConcessionsSummary from '../../../components/customer/booking-ticket/concessions/ConcessionsSummary'

const ConcessionsPage = () => {
  return (
    <div>
      <Header />
      <div className="max-w-[1390px] mx-auto grid grid-cols-3 gap-6">
        <Concessions />
        <ConcessionsSummary />
      </div>
      <Footer />
    </div>
  )
}

export default ConcessionsPage
