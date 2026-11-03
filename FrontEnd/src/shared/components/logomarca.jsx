import React from 'react';
import {Link} from 'react-router-dom'

import './components.css';

import LogoNova from '../../img/logomarca.png'


const LogoMarca =()=> {

    return(
        <div className='LogoNova'>
         <img src={LogoNova} alt="" />
        </div>
    )

}



export default LogoMarca;


































/* 
import React from "react";

function Footer(){

var ano = new Date().getFullYear();

return <section id="footer">
<div>
       <ul className="list-unstyled list-inline social text-center">
           <li className="list-inline-item"><a href="#"><i className="fa fa-facebook fa-2x"></i></a></li>
           <li className="list-inline-item"><a href="#"><i className="fa fa-twitter fa-2x"></i></a></li>
           <li className="list-inline-item"><a href="#"><i className="fa fa-instagram fa-2x"></i></a></li>
           <li className="list-inline-item"><a href="#" target="_blank"><i classNameName="fa fa-envelope fa-2x"></i></a></li>
       </ul>
</div>

        <a href="Santa Mônica Centro Educacional"></a>
        <p>Santa Mônica Centro Educacional - {ano} </p>
        <span>(21) 97029-4268 / (21) 2391-5800</span>
        </section>;
        

}

export default Footer;

*/