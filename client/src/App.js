import React, { Component } from 'react';
import { yearMonthCollection } from './helpers/populateSelectInput';

import AddEntries from './components/controlPersonalFinancial/AddEntries';
import FilterInput from './components/controlPersonalFinancial/FilterInput';
import Balance from './components/controlPersonalFinancial/Balance';
import SelectMonth from './components/selectMonth/SelectMonth';
import Spinner from './components/Spinner';
import ControlPersonalFinancial from './components/controlPersonalFinancial/ControlPersonalFinancial';
import axios from 'axios';
import ModalPersistData from './components/ModalPersistData';
import css from './styles/app.module.css';

const API_URL = 'http://localhost:3000/api/transaction';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      periodSelectInput: [],
      currentYearMonth: '',
      currentData: [],
      filteredData: [],
      selectData: {},
      disabledL: '',
      disabledR: '',
      filterInput: '',
      isModalOpen: false,
      type: '+',
      isDisabled: '',
      modeEntryRequest: '',
    };
  }
  componentDidMount() {
    const yearMonthReferences = yearMonthCollection();
    this.setState({
      periodSelectInput: yearMonthReferences.period,
      currentYearMonth: yearMonthReferences.currentYearMonth,
      disabled: '',
    });
  }
  componentDidUpdate(_, prevState) {
    const { currentYearMonth, periodSelectInput } = this.state;
    if (prevState.currentYearMonth !== currentYearMonth) {
      switch (currentYearMonth) {
        case 0:
          this.setState({ disabledL: 'disabled', disabledR: '' });
          break;
        case periodSelectInput.length - 1:
          this.setState({ disabledL: '', disabledR: 'disabled' });
          break;
        default:
          this.setState({ disabledR: '', disabledL: '' });
          break;
      }
    }
  }

  handleChangePeriod = (value) => {
    this.setState({
      currentYearMonth: value,
    });
  };

  handleRequestPeriod = (data) => {
    const { filterInput } = this.state;
    if (filterInput !== '') {
      const filteredData = data.filter((item) => {
        return item.description
          .toLowerCase()
          .includes(filterInput.toLowerCase());
      });
      this.setState({ filteredData });
    } else {
      this.setState({
        currentData: data,
        filteredData: data,
      });
    }
  };

  handleChangeFilter = (filterInput, filteredData) => {
    this.setState({ filterInput, filteredData });
  };

  handleDeleteEntry = (id) => {
    const newCurrentData = Object.assign([], this.state.filteredData);

    axios
      .delete(`http://localhost:3000/api/transaction/delete?id=${id}`)
      .then(() => {
        const filterDeletedData = newCurrentData.filter((item) => {
          return item._id !== id;
        });
        this.setState({
          currentData: filterDeletedData,
          filteredData: filterDeletedData,
        });
      })
      .catch((error) => {
        alert(JSON.stringify(error.response.data));
      });
  };

  handlePersistEntry = (id, mode) => {
    const newFilteredData = Object.assign([], this.state.filteredData);
    const newDate = new Date();
    const newCurrentDate = newDate.toISOString().split('T', 1).toString();
    console.log(newCurrentDate);
    console.log(id);

    if (mode === 'edit') {
      const foundItem = newFilteredData.find((item) => {
        return item._id === id;
      });

      const type = foundItem.type.includes('-') ? '-' : '+';
      console.log(type);
      console.log(foundItem);
      this.setState({
        isModalOpen: true,
        selectData: foundItem,
        type,
        isDisabled: 'disabled',
        modeEntryRequest: 'put',
      });
    } else {
      this.setState({
        selectData: {
          description: '',
          category: '',
          value: 0,
          yearMonthDay: newCurrentDate,
        },
        isDisabled: '',
        modeEntryRequest: 'post',
      });
    }

    this.setState({ isModalOpen: true });
  };

  handleCloseModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  handlePersistRequest = (dataToPersist, modeEntry) => {
    const { _id } = dataToPersist;
    const newFilteredData = Object.assign([], this.state.filteredData);
    console.log(dataToPersist);
    console.log(modeEntry);

    if (modeEntry === 'put') {
      axios.put(`${API_URL}/update?id=${_id}`, dataToPersist).then(() => {
        const foundIndex = newFilteredData.findIndex((item) => {
          return item._id === _id;
        });
        newFilteredData[foundIndex] = dataToPersist;
        this.setState({
          filteredData: newFilteredData,
        });
      });
    } else {
      console.log(dataToPersist);

      console.log(newFilteredData);
      delete newFilteredData._id;
      axios.post(`${API_URL}/insert`, dataToPersist).then((res) => {
        newFilteredData.push(res.data);

        this.setState({
          filteredData: newFilteredData,
          crurrentData: newFilteredData,
        });
      });
    }

    this.setState({ isModalOpen: false });
  };

  render() {
    const {
      periodSelectInput,
      currentYearMonth,
      disabledL,
      disabledR,
      currentData,
      filterInput,
      filteredData,
      isModalOpen,
      selectData,
      type,
      isDisabled,
      modeEntryRequest,
    } = this.state;

    return (
      <div className={css.page}>
        <header className={css.header}>
          <div>
            <h1 className={`${css.mainTitle} center`}>
              Desafio Final do Bootcamp Full Stack
            </h1>
            <div className={css.leftMenu}>
              <AddEntries id="btnAdd" onPersist={this.handlePersistEntry} />
              <FilterInput
                onChangeFilter={this.handleChangeFilter}
                currentData={currentData}
                filterValue={filterInput}
              />
            </div>
          </div>

          <SelectMonth
            periods={periodSelectInput}
            currentPeriod={currentYearMonth}
            onChangePeriod={this.handleChangePeriod}
            disabledL={disabledL}
            disabledR={disabledR}
            onRequestPeriod={this.handleRequestPeriod}
          />
        </header>

        <div className={css.mainContent}>
          <h3 className={css.subTitle}>Controle Financeiro Pessoal</h3>

          {currentData.length === 0 ? (
            <Spinner />
          ) : (
            <ControlPersonalFinancial
              currentData={currentData}
              filterValue={filterInput}
              onChangeFilter={this.handleChangeFilter}
              filteredData={filteredData}
              onDelete={this.handleDeleteEntry}
              onPersist={this.handlePersistEntry}
            />
          )}
        </div>

        {isModalOpen && (
          <ModalPersistData
            onClose={this.handleCloseModal}
            onSave={this.handlePersistRequest}
            selectData={selectData}
            type={type}
            isDisabled={isDisabled}
            httpMethod={modeEntryRequest}
          />
        )}

        <footer>
          <Balance filteredData={filteredData} />
        </footer>
      </div>
    );
  }
}
