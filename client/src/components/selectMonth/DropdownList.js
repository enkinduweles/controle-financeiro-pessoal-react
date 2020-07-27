import React from 'react';

export default function DropdownList({ changePeriod, periods, currentPeriod }) {
  const handleSelectChange = (event) => {
    const newValue = +event.target.value;

    console.log(event.target.value);
    changePeriod(newValue);
  };

  return (
    <div>
      <select
        className="browser-default"
        style={styles.dropDown}
        value={currentPeriod}
        onChange={handleSelectChange}
      >
        {periods.map((item, index) => {
          return (
            <option key={index} value={index}>
              {item}
            </option>
          );
        })}
      </select>
    </div>
  );
}

const styles = {
  dropDown: {
    width: '150px',
  },
};
