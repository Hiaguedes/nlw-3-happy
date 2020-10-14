import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import mapMarker from '../../img/map-marker.svg';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import './MapaDosOrfanatos.css';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import api from '../../services/api'

import mapIcon from '../utils/mapIcon';

interface Orphanage {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
}

function MapaDosOrfanatos(){

    const [orphanagesData, setOrphanagesData] = useState<Orphanage[]>([]);

    useEffect(() => {
        api.get('orphanages').then(res => {
            setOrphanagesData(res.data);
        })
    }, [])

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

        <Map  center={[-22.48,-43.32]} zoom={10} style={{ width:'100%', height:'100%' }}>
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX}`}/>
        
        {orphanagesData.map( orphanages =>{ return (
            <Marker icon={mapIcon}
                    position={[orphanages.latitude,orphanages.longitude]}
                    key={orphanages.id}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {orphanages.name}
              <Link to={`/orphanages/${orphanages.id}`}>
                  <FiArrowRight size={32} color="#FFF"/>            
              </Link>
              </Popup>
                    
          </Marker>
        )})}
        </Map> 

        <Link to="/orphanages/create" className="create-orphanage"><FiPlus size={32} color="#FFF" /></Link>
        </div>
    );
}

export default MapaDosOrfanatos;