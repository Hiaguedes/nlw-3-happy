import React from 'react';
import {Link} from 'react-router-dom';
import mapMarker from '../../img/map-marker.svg';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import './MapaDosOrfanatos.css';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

import mapIcon from '../utils/mapIcon';

function MapaDosOrfanatos(){
    return(
        <div id="page-map">
        <aside className="barra-lateral">
        <header>
        <img src={mapMarker} alt="Símbolo da Logo da Happy" />

        <h2 className="barra-latera__titulo">Escolha um orfanato no mapa</h2>
        <p className="barra-latera__desc">Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer className="barra-lateral__footer">
            <strong>Rio de Janeiro</strong>
            <span>Petrópolis</span>
        </footer>
        </aside>

        <Map  center={[-22.5110557,-43.1839826]} zoom={16.75} style={{ width:'100%', height:'100%' }}>
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX}`}/>
        
        <Marker icon={mapIcon}
                  position={[-22.5110557,-43.1839826]}
        >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
            Lar das Meninas Super Poderosas
            <Link to="/orphanages/1">
                <FiArrowRight size={32} color="#FFF"/>            
            </Link>
            </Popup>
                  
        </Marker>
        </Map> 

        <Link to="/orphanages/create" className="create-orphanage"><FiPlus size={32} color="#FFF" /></Link>
        </div>
    );
}

export default MapaDosOrfanatos;