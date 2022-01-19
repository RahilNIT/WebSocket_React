
import React, { useRef } from 'react';

const WebSocket_call = (order) => {

    console.log('WebSocket_call - OrderType:' + order)

    //#region Successfull test of WebSocket

    // const ws = useRef(new WebSocket("wss://ws.bitstamp.net"));
    // const apiCall = {
    //     event: "bts:subscribe",
    //     data: { channel: "order_book_btcusd" },
    // };

    // ws.current.onopen = (event) => {
    //    vfd
    //     ws.current.send(JSON.stringify(apiCall));
    // };
    
    // ws.current.onmessage = function (event) {
    //     const json = JSON.parse(event.data);
    //     try {
    //         if ((json.event = "data")) {

    //             var bids = json.data.bids;
    //             console.log(bids)
    //         }
    //     } catch (err) {
    //       console.log(err);
    //     }
    // };

    //map the first 5 bids
    // const firstBids = bids.map((item) => 
    //     <tr>
    //         <td> {item}</td>
    //         <td></td>
    //     </tr>
    // );

    //#endregion

    //#region testing data to show

    // p: price | q: quantity
    var tradeInfo = [{"p":11213, "q":211434}, {"p":2222, "q":25434}, {"p":32424, "q":768687}, {"p":456744, "q":613266}];
    const rows = tradeInfo.map((item, index) => 
        <tr key={index} data-type="bid">
            <td>{item.p}</td>
            <td>{item.q}</td>
        </tr>
    );

    //#endregion test data

    const ws = useRef(new WebSocket("wss://stream.binance.com:9443"));

    const apiCall = {
        method: "SUBSCRIBE",
        params: [
            order + "@aggTrade" //"@bookTicker"
        ],
        id: 1
    };

    ws.current.onopen = (event) => {
        ws.current.send(JSON.stringify(apiCall));
    };

    ws.current.onmessage = function (event) {
        tradeInfo = JSON.parse(event.data);
        try {
            console.log(tradeInfo);

            // const rows = tradeInfo.map((item, index) => 
            //     <tr key={index}>
            //         <td>{item.p}</td>
            //         <td>{item.q}</td>
            //     </tr>
            // );
        }
        catch (err) {
            console.log(err);
        }
    };

    return(rows);
};

export default WebSocket_call;
