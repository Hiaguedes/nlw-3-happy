import React from 'react';
import './page-landing.css';
import {FiArrowRight} from 'react-icons/fi';
import {Link} from 'react-router-dom';

import logoSVG from '../../img/logo.svg';

function Landing(){
    return (
        <div className="page-landing">
        <div className="content-wrapper">
          <img src={logoSVG} alt="Logo Happy"/>
          <main className="page-main">
            <h1 className="main-title">Leve Felicidade para o mundo</h1>
            <p className="main-desc">Visite orfanatos e mude o dia de muitas crianças.</p>
          </main>
          <div className="location"><strong>Rio de Janeiro</strong><span>Petrópolis</span></div>
          <Link to="/app" className="enter-app"><FiArrowRight size={26} color="rgba(0,0,0,0.6)"/></Link>
        </div>
      </div>
    );
}

export default Landing;