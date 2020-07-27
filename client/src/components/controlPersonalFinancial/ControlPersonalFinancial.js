import React, { Component } from 'react';
import Balance from './Balance';
import FilterInput from './FilterInput';
import AddEntries from './AddEntries';
import PersonalFinancialList from './PersonalFinancialList';

export default class ControlPersonalFinancial extends Component {
  render() {
    const {
      filterValue,
      currentData,
      onChangeFilter,
      filteredData,
      onDelete,
      onPersist,
    } = this.props;
    return (
      <>
        {/* <Balance filteredData={filteredData} /> */}
        {/* <AddEntries id="btnAdd" onPersist={onPersist} /> */}
        {/* <FilterInput
          onChangeFilter={onChangeFilter}
          currentData={currentData}
          filterValue={filterValue}
        /> */}
        <PersonalFinancialList
          filteredData={filteredData}
          onDelete={onDelete}
          onPersist={onPersist}
        />
      </>
    );
  }
}
