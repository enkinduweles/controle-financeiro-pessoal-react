import React from 'react';

export default function Action({ id, children, onDelete, onPersist, text }) {
  const handleIconClick = () => {
    const idHash = id.substring(id.indexOf('-', 0) + 1, id.length);
    let type = 'edit';

    id.includes('Delete') ? onDelete(idHash) : onPersist(idHash, type);

    // if(id.includes('Delete')) {
    //   onDelete(idHash);
    // }
  };
  return (
    <span
      className="material-icons"
      style={styles.actionEntry}
      onClick={handleIconClick}
    >
      {children}
    </span>
  );
}

const styles = {
  actionEntry: {
    fontSize: '2rem',
    cursor: 'pointer',
    marginLeft: '10px',
  },
};
