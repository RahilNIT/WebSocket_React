
import React, { useState, useEffect, useRef } from 'react';

const WebSocket_call = (orderOBJ) => {

    const order = orderOBJ.order;
    const [bids, setBids] = useState([0]);
    const [asks, setAsks] = useState([0]);

    //console.log('WebSocket_call - OrderType:' + order)

    useEffect(() => {

        const ws = new WebSocket("wss://ws.bitstamp.net");

        const apiCall = {
            event: "bts:subscribe",
            data: { channel: "order_book_" + order.slice(0,-1) },
        };

        ws.onopen = (event) => {
            ws.send(JSON.stringify(apiCall));
        };
        
        ws.onmessage = function (event) {

            const json = JSON.parse(event.data);

            try {
                if (json.event = "data") { //get 5 data each
                    if (json.data.bids != undefined) setBids(json.data.bids.slice(0, 5)); 
                    if (json.data.asks != undefined) setAsks(json.data.asks.slice(0, 5));
                }
            }
            catch (err) {
            console.log(err);
            }
        };

        return () => ws.close();
    });

    const bidsRows = bids.map((item, index) => {
        return(
            //bid ask condition is just example
            <tr key={index} data-type="bid"> 
                <td>{item[0]}</td>
                <td>{item[1]}</td>
            </tr>
        );
    });

    const asksRows = asks.map((item, index) => {
        return(
            //bid ask condition is just example
            <tr key={index} data-type="ask"> 
                <td>{item[0]}</td>
                <td>{item[1]}</td>
            </tr>
        );
    });

    return(<>{bidsRows}{asksRows}</>);
};

export default WebSocket_call;
