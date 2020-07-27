import React from 'react';

export default function SelectButtonRight({
  children,
  disabledR,
  currentPeriod,
  changePeriod,
}) {
  const handleButtonClick = () => {
    const newIndex = currentPeriod + 1;

    changePeriod(newIndex);
  };

  return (
    <div>
      <button
        id="right"
        className={`${disabledR} waves-effect waves-light btn`}
        onClick={handleButtonClick}
        style={{ zIndex: 0 }}
      >
        {children}
      </button>
    </div>
  );
}
