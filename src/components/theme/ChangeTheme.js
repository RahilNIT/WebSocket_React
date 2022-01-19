
import React from 'react';
import sun from './sun.png';
import moon from './moon.png';
import './ChangeTheme_Style.css';
import '../../assets/style/style.css';

const ChangeTheme = () => {

    const clickHandler = (theme) => {

        console.log(theme)

        var body = document.body;
        var moon = document.getElementById('moon-icon');
        var sun = document.getElementById('sun-icon');

        if (theme === 'dark') {
            body.classList.add('dark-theme');
            moon.classList.add('d-none');
            sun.classList.remove('d-none');
        }
        else {
            body.classList.remove('dark-theme');
            sun.classList.add('d-none');
            moon.classList.remove('d-none');
        }
    }

    return (
        <div className="d-inline">
            <img src={moon} id="moon-icon" alt="moon" class="theme-icon cursor-pointer" onClick={() => clickHandler('dark')}></img>
            <img src={sun} id="sun-icon" alt="sun" class="theme-icon cursor-pointer d-none" onClick={() => clickHandler('light')}></img>
        </div>
    );
};

export default ChangeTheme;