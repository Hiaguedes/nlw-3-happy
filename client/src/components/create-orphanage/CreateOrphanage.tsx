import React, { FormEvent, useState , ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import './create-orphanage.css';
import { useHistory } from "react-router-dom";

import Sidebar from '../Sidebar/Sidebar';

import { FiPlus } from "react-icons/fi";

import {LeafletMouseEvent} from 'leaflet'
import mapIcon from '../utils/mapIcon';
import api from "../../services/api";

export default function CreateOrphanage() {

  const [position, setPosition] = useState({latitude: 0 , longitude:0});
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHour] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [images, setImages] = useState<File[]>([]);
  const [previewImages,setpreviewImages] = useState<string[]>([]);

  const history = useHistory();

  const {latitude,longitude} = position;

  function handleSelectImages(e: ChangeEvent<HTMLInputElement>){
    if(!e.target.files) return;

    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(img => {
      return URL.createObjectURL(img)
    });

    setpreviewImages(selectedImagesPreview);
  }

  function handleMapClick(e: LeafletMouseEvent){
    const {lat,lng} = e.latlng
    setPosition({
      latitude:lat,
      longitude: lng
    })
  }

  async function handleSubmit(e:FormEvent){
    e.preventDefault();

    const data = new FormData();
    data.append('name', name);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));

    images.forEach(img => {
      data.append('images',img)
    })

    await api.post('orphanages',data);

    alert('Cadastro Realizado com sucesso');

    history.push('/app');
  }

  return (
    <div id="page-create-orphanage">

      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-22.52,-43.20]} 
              style={{ width: '100%', height: 280 }}
              zoom={12}
              onclick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX}`}
              />
            {position.latitude !==0 && (
              <Marker interactive={false} icon={mapIcon} position={[position.latitude,position.longitude]} />
            )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name"
                    value={name} 
                    onChange={e => setName(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" 
                        maxLength={300} 
                        value={about}
                        onChange={e=> setAbout(e.target.value)}
                        />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">

              </div>

              <div className="images-container">

              {previewImages.map(img =>{
                //TODO fazer botão de exclusão
                return (
                  <img src={img} key={img} alt={name} /> 
                )
              })}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>

              </div>
                <input multiple onChange={handleSelectImages} type="file" id="image[]"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions"
                        value={instructions}
                        onChange={e=> setInstructions(e.target.value)}            
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input id="opening_hours" 
                       value={opening_hours}
                       onChange={e=> setOpeningHour(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                type="button" 
                className={open_on_weekends ? "active" : ''}
                onClick={()=> setOpenOnWeekends(true)}
                >
                  Sim
                  </button>


                <button 
                type="button"
                className={!open_on_weekends ? "active" : ''}
                onClick={()=> setOpenOnWeekends(false)}
                >
                  Não
                  </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
