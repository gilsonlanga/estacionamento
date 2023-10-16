import React from 'react';
import './Home.css'
import estaciona from '../estaciona.jpg';

function Home () {
    return (
        <div>
            <h1>Gerenciamento de Estacionamento</h1>
            <figure>
            <img src={estaciona} />
            </figure>
            
        </div>
    )
}

export default Home;