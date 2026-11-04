import React from 'react';
import {Link} from 'react-router-dom'

import './components.css';

import imagemFooter from '../../img/rodape_pdc.png'


const Footer = () => {
    return (

        <div className='footer'>
        <img src={imagemFooter} alt="" />
        </div>

    );
  };


export default Footer;
