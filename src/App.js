import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Orderbook from "./components/orderbook/OrderBook";


function App() {

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/orderbook" component={Orderbook}/>
        <Route component={Orderbook}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;