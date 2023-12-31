import React from 'react'
import Nav from '../sections/Nav'
import Stats from '../sections/Stats'
import Featured from '../sections/Featured'
import Footer from '../sections/Footer'
import Intro from '../sections/Intro'
import '../css/StartingPage.css'

export default function StartingPage() {
  return (
    <div className='page'>
    <Intro></Intro>
    <Nav></Nav>
    <main>
      <Stats></Stats>
      <Featured></Featured>
    </main>
    <Footer></Footer>
    </div>
  )
}
