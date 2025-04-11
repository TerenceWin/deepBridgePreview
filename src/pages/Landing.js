import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Partners from '../components/Partners';
import MyForm from '../components/Form'
import Footer from '../components/Footer'
import VisionMission from '../components/VissionMission'

const Landing = () => {
  return (
    <div>
      <Hero />
      <Partners />
      <Features />
      <VisionMission/>
      <MyForm />
      <Footer/>
    </div>
  );
};

export default Landing;