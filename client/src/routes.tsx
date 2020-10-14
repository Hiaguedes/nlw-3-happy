
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './components/Landing/Landing';
import MapaDosOrfanatos from './components/Mapa-Orfanatos/MapaDosOrfanatos'
import Orphanage from './components/Orphanage/Orphanage';
import createOrphanage from './components/create-orphanage/CreateOrphanage';


function Routes(){
    return (
    <BrowserRouter>
    <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={MapaDosOrfanatos} />
        <Route path="/orphanages/create" component={createOrphanage} />
        <Route path="/orphanages/:id" component={Orphanage} />
    </Switch>
    </BrowserRouter>
    );
}

export default Routes;