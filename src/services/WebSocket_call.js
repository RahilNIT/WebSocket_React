
import React, { useState, useEffect, useRef } from 'react';

const WebSocket_call = (order) => {

    const [bids, setBids] = useState([0]);
    const [asks, setAsks] = useState([0]);

    console.log('WebSocket_call - OrderType:' + order)

    //#region Successfull test of WebSocket

    const ws = useRef(new WebSocket("wss://ws.bitstamp.net"));

    useEffect(() => {

    ws.current.onopen = (event) => {
        var channel = "order_book_" + order.slice(0,-1);

        console.log('channel: '+ channel)

        const apiCall = {
            event: "bts:subscribe",
            data: { channel: channel },
          };

        ws.current.send(JSON.stringify(apiCall));
    };
    
    ws.current.onmessage = function (event) {

        const json = JSON.parse(event.data);

        console.log(json.data.bids.slice(0, 5))

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

    //#endregion

    // const ws = useRef(new WebSocket("wss://stream.binance.com:9443"));
    // const apiCall = {
    //     method: "SUBSCRIBE",
    //     params: [
    //         order + "@aggTrade" //"@bookTicker"
    //     ],
    //     id: 1
    // };

    return () => ws.current.close();

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
