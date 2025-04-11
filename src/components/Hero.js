import React from 'react';
import robo from '../images/9C0F0C22-AE93-41CF-881C-9B82EBAC9206 copy 2.png'
import '../styles/custom.css'
import {Link} from 'react-scroll'

function Hero() {

  function handleClick(){
    console.log("this has been clicked");
    
  }

  return (
    <div className="hero " >
      <div className='gradient-overlay'>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Deep-Bridge: AI-Powered CRM for Traditional Businesses
              </h1>
              <p className=" mb-4 text-align-center text-muted h5">
                Bridging deeper connections for your business.
              </p>
              <Link  to="Form" spy={true}><button className="btn btn-primary btn-lg">
                Message us
              </button></Link>
            </div>
            <div className="col-lg-6">
              <div className="position-relative">
                <img 
                  src={robo}
                  alt="Sanuker Chatbot Illustration" 
                  className="img-fluid"
                  style={{minHeight:"`100%`"}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Hero;