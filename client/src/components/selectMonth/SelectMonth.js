import React, { Component } from 'react';
import axios from 'axios';

import SelectButtonLeft from './SelectButtonLeft';
import SelectButtonRight from './SelectButtonRight';
import DropdownList from './DropdownList';

export default class SelectMonth extends Component {
  componentDidUpdate(prevProps) {
    const { currentPeriod, periods, onRequestPeriod } = this.props;

    if (currentPeriod !== prevProps.currentPeriod) {
      const dateToSearch = new Date(periods[currentPeriod]);
      const endpoint = `${dateToSearch.toLocaleDateString('en-us', {
        year: 'numeric',
      })}-${dateToSearch.toLocaleDateString('en-us', { month: '2-digit' })}`;

      axios(`http://localhost:3000/api/transaction?period=${endpoint}`)
        .then((item) => {
          setTimeout(() => {
            onRequestPeriod(item.data);
          }, 1000);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }
  render() {
    const {
      periods,
      currentPeriod,
      onChangePeriod,
      disabledL,
      disabledR,
    } = this.props;

    return (
      <div>
        <h2
          style={{
            fontSize: '1.5rem',
            margin: '0 0 1rem',
            textAlign: 'center',
          }}
        >
          Mês de consulta
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <SelectButtonLeft
            currentPeriod={currentPeriod}
            changePeriod={onChangePeriod}
            disabledL={disabledL}
          >
            ❮
          </SelectButtonLeft>
          <DropdownList
            periods={periods}
            currentPeriod={currentPeriod}
            changePeriod={onChangePeriod}
          />
          <SelectButtonRight
            currentPeriod={currentPeriod}
            changePeriod={onChangePeriod}
            disabledR={disabledR}
          >
            ❯
          </SelectButtonRight>
        </div>
      </div>
    );
  }
}
