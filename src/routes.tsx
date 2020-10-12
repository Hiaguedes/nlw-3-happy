
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Landing from './components/Landing/Landing';
import MapaDosOrfanatos from './components/Mapa-Orfanatos/MapaDosOrfanatos'

function Routes(){
    return (
    <BrowserRouter>
    <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/app" component={MapaDosOrfanatos} />
    </Switch>
    </BrowserRouter>
    );
}

export default Routes;