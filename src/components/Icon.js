import React from 'react';
import moneyBagIcon from '../../Icons/money-bag.svg';
import chartIcon from '../../Icons/chart.svg';
import bankIcon from '../../Icons/bank.svg';
import creditCardIcon from '../../Icons/credit-card.svg';
import calendarIcon from '../../Icons/calendar.svg';
import plusIcon from '../../Icons/plus.svg';
import pencilIcon from '../../Icons/pencil.svg';
import trashIcon from '../../Icons/trash.svg';
import xIcon from '../../Icons/x.svg';

function Icon({ name, size = 20, className = '', style = {} }) {
    // Map icon names to imported files
    const iconMap = {
        'money-bag': moneyBagIcon,
        'chart': chartIcon,
        'bank': bankIcon,
        'credit-card': creditCardIcon,
        'calendar': calendarIcon,
        'plus': plusIcon,
        'pencil': pencilIcon,
        'trash': trashIcon,
        'x': xIcon
    };

    const iconPath = iconMap[name];

    if (!iconPath) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }

    return (
        <img
            src={iconPath}
            alt={name}
            className={`icon ${className}`}
            style={{
                width: size,
                height: size,
                display: 'inline-block',
                verticalAlign: 'middle',
                ...style
            }}
        />
    );
}

export default Icon;
