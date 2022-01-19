import react from 'react';

const OrderBook_Rows = (tradeInfo) => {
    
    console.log(tradeInfo)


    const dataa = [{a:213, b:2434}, {a:444, b:666}];


    const rows = dataa.map((item, index) => 
        <tr key={index}>
            <td>{item.a}</td>
            <td>{item.b}</td>
        </tr>
    );

    return rows;
}

export default OrderBook_Rows;