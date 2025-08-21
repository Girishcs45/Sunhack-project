import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MainLayout({children}) {
  return (
    <div>
      <Header/>
      <div>
        {children}
      </div>
      <Footer/>
    </div>
  )
}
