
import React, { useState, useRef } from 'react';

const WebSocket_call = (order) => {

    const [bids, setBids] = useState([0]);
    const [asks, setAsks] = useState([0]);

    console.log('WebSocket_call - OrderType:' + order)

    //#region Successfull test of WebSocket

    const ws = useRef(new WebSocket("wss://ws.bitstamp.net"));

    ws.current.onopen = (event) => {

        const apiCall = {
            event: "bts:subscribe",
            data: { channel: "order_book_" + order.slice(0,-1) + "" },
          };

        ws.current.send(JSON.stringify(apiCall));
    };
    
    ws.current.onmessage = function (event) {

        const json = JSON.parse(event.data);
        try {
            if (json.event = "data") { //get 10 data each
                setBids(json.data.bids.slice(0, 10)); 
                setAsks(json.data.asks.slice(0, 10));
            }
        }
        catch (err) {
          console.log(err);
        }
    };

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

    setTimeout(()=>{

        const apiCall = {
            event: "bts:unsubscribe",
            data: { channel: "order_book_" + order.slice(0,-1) + "" },
          };

        ws.current.send(JSON.stringify(apiCall));
    }, 700)

    //#endregion

    // const ws = useRef(new WebSocket("wss://stream.binance.com:9443"));

    // const apiCall = {
    //     method: "SUBSCRIBE",
    //     params: [
    //         order + "@aggTrade" //"@bookTicker"
    //     ],
    //     id: 1
    // };

    // ws.current.onopen = (event) => {
    //     ws.current.send(JSON.stringify(apiCall));
    // };

    // ws.current.onmessage = function (event) {
    //     tradeInfo = JSON.parse(event.data);
    //     try {
    //         console.log(tradeInfo);

    //         // const bidsRows = tradeInfo.map((item, index) => 
    //         //     <tr key={index}>
    //         //         <td>{item.p}</td>
    //         //         <td>{item.q}</td>
    //         //     </tr>
    //         // );
    //     }
    //     catch (err) {
    //         console.log(err);
    //     }
    // };

    return(<>{bidsRows}{asksRows}</>);
};

export default WebSocket_call;
