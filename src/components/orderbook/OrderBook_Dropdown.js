import React from 'react';
import {useState} from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import '../../assets/style/style.css';

const OrderBook_Dropdown = () => {

    const [order, setOrder] = useState("10");

    const fetchData = (prop) => {

        //send Req

        setOrder(prop);
    }

    return (
        <div className="float-right">
            <FormControl fullWidth>
                <Select class="width-200" id="order-select" value={order} onChange={e =>fetchData(e.target.value)}>
                    <MenuItem value={10}>BTC/USDT</MenuItem>
                    <MenuItem value={20}>ETH/USDT</MenuItem>
                    <MenuItem value={30}>ADA/USDT</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default OrderBook_Dropdown;