import React, { useEffect, useState } from "react";
//import { FaWhatsapp } from "react-icons/fa";
import './orphanage.css';
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import Sidebar from "../Sidebar/Sidebar";
import mapIcon from '../utils/mapIcon';
import api from "../../services/api";
import {useParams } from 'react-router-dom';

interface Orphanage {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: {
    id: number;
    url: string;
  }[]
}

interface OrphanageParams{
  id:string;
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  const {id} = params
  const [orphanageData, setOrphanageData] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
      api.get(`orphanages/${params.id}`).then(res => {
          setOrphanageData(res.data);
      })
  }, [params.id])

  if(!orphanageData) return <p>... Loading</p> //seria interessando algo como o shimmer effect https://blog.rocketseat.com.br/react-native-shimmer/

  return (
    <div id="page-orphanage">
      <Sidebar />
      <main>
        <div className="orphanage-details">
          <img src={orphanageData.images[activeImageIndex].url} alt={orphanageData.name} />

          <div className="images">
            {orphanageData.images.map((img,index) =>{
              return(

              <button 
              className={activeImageIndex === index? "active" : ''} 
              type="button" 
              key={img.id}
              onClick={(() => {
                setActiveImageIndex(index)
              })}
              >

                <img src={img.url} alt={orphanageData.name} />
              </button>
              )
            })}
          </div>
          
          <div className="orphanage-details-content">
          <h1>{orphanageData.name}</h1>
            <p>{orphanageData.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanageData.latitude,orphanageData.longitude]}
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX}`}
                />
                <Marker interactive={false} icon={mapIcon} position={[orphanageData.latitude,orphanageData.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=@${orphanageData.latitude},${orphanageData.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanageData.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanageData.opening_hours}
              </div>
            {orphanageData.open_on_weekends? (
                            <div className="open-on-weekends">
                            <FiInfo size={32} color="#39CC83" />
                            Atendemos <br />
                            fim de semana
                          </div>
            ) : (
                          <div className="open-on-weekends dont-open">
                          <FiInfo size={32} color="#FF6690" />
                          Não Atendemos <br />
                          fim de semana
                        </div>
            ) }
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}