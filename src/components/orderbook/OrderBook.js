import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ChangeTheme from '../theme/ChangeTheme';
import WebSocket_call from '../../services/WebSocket_call';
import '../../assets/style/style.css';
import './OrderBook_Style.css';


const OrderBook = (props) => {

    var unit = '';
    const [order, setOrder] = useState("btcusdt");

    const changeOrder = (order) => {
        setOrder(order);
        
        switch(order){
            case 'btcusdt':
                unit = 'BTC';
                break;
            case 'ethusdt':
                unit = 'ETH';
                break;
            case 'adausdt':
                unit = 'ADA';
                break;
        }
        
        document.getElementById('anount-header-name').innerHTML = "Amount (" + unit + ")";
    }

    return (
        <div>
            <header>
                <label className="font-size-large">Order</label>
                <ChangeTheme />
                <div className="float-right">
                    <FormControl fullWidth>
                        <Select class="width-200" id="order-select" value={order} onChange={ e => changeOrder(e.target.value)}>
                            <MenuItem value="btcusdt">BTC/USDT</MenuItem>
                            <MenuItem value="ethusdt">ETH/USDT</MenuItem>
                            <MenuItem value="adausdt">ADA/USDT</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </header>
            <div className="order-book">
                <table>
                    <tr>
                        <th>Price (USDT)</th>
                        <th id="anount-header-name">Amount (BTC)</th>
                    </tr>
                    <WebSocket_call order={order}/>
                </table>
            </div>
        </div>
    );
};

export default OrderBook;