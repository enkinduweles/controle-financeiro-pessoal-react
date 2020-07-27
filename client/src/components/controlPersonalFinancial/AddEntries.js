import React from 'react';

export default function AddEntries({ id, onPersist }) {
  const handleBtnClick = () => {
    const type = 'add';
    onPersist(id, type);
  };

  return (
    <div>
      <button
        className={`waves-effect waves-light btn`}
        style={styles.btnAdd}
        onClick={handleBtnClick}
      >
        + Novo Lançamento
      </button>
    </div>
  );
}

const styles = {
  btnAdd: {
    zIndex: '0',
    marginRight: '50px',
  },
};
