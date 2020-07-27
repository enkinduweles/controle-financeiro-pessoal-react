import React from 'react';

export default function FilterInput({
  filterValue,
  onChangeFilter,
  currentData,
}) {
  const handleChangeFilter = (event) => {
    const newValue = event.target.value;
    const filteredData = currentData.filter((item) => {
      return item.description.toLowerCase().includes(newValue.toLowerCase());
    });

    console.log(filteredData);
    onChangeFilter(newValue, filteredData);
  };

  return (
    <div className="input-field" style={styles.container}>
      <i style={styles.iconSearch} className="material-icons">
        search
      </i>
      <input
        className="validate"
        style={styles.filterInput}
        type="text"
        id="inputDescription"
        value={filterValue}
        onChange={handleChangeFilter}
        placeholder="filtro"
      />
    </div>
  );
}

const styles = {
  filterInput: {
    backgroundColor: '#dfe6e9',
    borderRadius: '10px',
    margin: 0,
    padding: '0 1rem',
  },

  iconSearch: {
    color: '#2c3a47',
    fontSize: '2.5rem',
    marginRight: '1rem',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    flexGrow: '1',
  },
};
