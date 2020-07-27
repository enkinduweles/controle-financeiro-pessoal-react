import React from 'react';

export default function SelectButtonLeft({
  children,
  disabledL,
  currentPeriod,
  changePeriod,
}) {
  const handleButtonClick = () => {
    const newIndex = currentPeriod - 1;

    changePeriod(newIndex);
  };

  return (
    <div>
      <button
        id="left"
        onClick={handleButtonClick}
        className={`${disabledL} waves-effect waves-light btn`}
        style={{ zIndex: 0 }}
      >
        {children}
      </button>
    </div>
  );
}
