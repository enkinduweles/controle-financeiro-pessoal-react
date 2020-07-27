import React from 'react';
import { formatterNumber } from '../../helpers/formatterNumber';
import css from '../../styles/balance.module.css';

export default function Balance({ filteredData }) {
  const incomeEntries = filteredData.filter((elem) => elem.type !== '-');
  const expanseEntries = filteredData.filter((elem) => elem.type !== '+');
  const sumIncomeEntries = incomeEntries.reduce((acc, curr) => {
    return acc + curr.value;
  }, 0);
  const sumExpanseEntries = expanseEntries.reduce((acc, curr) => {
    return acc + curr.value;
  }, 0);
  const balance = sumIncomeEntries - sumExpanseEntries;
  return (
    <div className={css.footerBalance}>
      <div>
        <label className={css.labelInputBalance} htmlFor="totalRegister">
          Lançamentos:
        </label>
        <input
          style={styles.neutralBalance}
          className={css.inputBalance}
          type="text"
          id="entries"
          value={filteredData.length}
          readOnly
        />
      </div>

      <div>
        <label className={css.labelInputBalance} htmlFor="incomeEntries">
          Receitas:
        </label>
        <input
          style={styles.positiveBalance}
          type="text"
          id="incomeEntries"
          value={formatterNumber(sumIncomeEntries)}
          readOnly
        />
      </div>

      <div>
        <label className={css.labelInputBalance} htmlFor="expenseEntries">
          Despesas:
        </label>
        <input
          style={styles.negativeBalance}
          type="text"
          id="expenseEntries"
          value={formatterNumber(-sumExpanseEntries)}
          readOnly
        />
      </div>

      <div>
        <label className={css.labelInputBalance} htmlFor="balance">
          Saldo:
        </label>
        <input
          style={
            Math.sign(balance) === 1
              ? styles.positiveBalance
              : Math.sign(balance) === 0
              ? styles.neutralBalance
              : styles.negativeBalance
          }
          type="text"
          id="balance"
          value={formatterNumber(balance)}
          readOnly
        />
      </div>
    </div>
  );
}

const styles = {
  neutralBalance: {
    backgroundColor: '#dfe6e9',
    borderRadius: '10px',
    display: 'block',
    height: '30px',
    padding: '5px 10px',
    width: '150px',
  },

  positiveBalance: {
    color: '#6ab04c',
    backgroundColor: '#dfe6e9',
    borderRadius: '10px',
    display: 'block',
    fontWeight: 'bold',
    height: '30px',
    padding: '5px 10px',
    width: '150px',
  },

  negativeBalance: {
    backgroundColor: '#dfe6e9',
    borderRadius: '10px',
    display: 'block',
    fontWeight: 'bold',
    height: '30px',
    padding: '5px 10px',
    width: '150px',
    color: '#e17055',
  },
};
