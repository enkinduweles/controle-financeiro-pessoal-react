import React from 'react';
import Action from './Action';

import css from '../../styles/personalFinancialList.module.css';
import { formatterNumber } from '../../helpers/formatterNumber';

export default function PersonalFinancialList({
  filteredData,
  onDelete,
  onPersist,
}) {
  console.log(filteredData);
  const total = filteredData.reduce((acc, curr) => {
    return acc + curr.value;
  }, 0);
  console.log(total);
  const dataGroupByDay = [];
  let accumulator = [];

  if (filteredData.length !== 0) {
    let currentDay = filteredData[0].day;

    filteredData.sort((a, b) => {
      return a.day - b.day;
    });

    filteredData.forEach((element) => {
      if (currentDay !== element.day) {
        dataGroupByDay.push(accumulator);
        currentDay = element.day;
        accumulator = [];
      }

      if (element.day.toString().length < 2) {
        const day = element.day.toString().padStart(2, '0');
        element.day = day;
      }
      accumulator.push(element);
    });

    dataGroupByDay.push(accumulator);
  }

  return (
    <div>
      {dataGroupByDay.map((groupDay, index) => {
        return (
          <div className={css.containerEntry} key={index}>
            {groupDay.map(
              ({ _id, day, category, description, value, type }) => {
                return (
                  <div
                    className={
                      type === '+' ? css.entryIncome : css.entryExpanse
                    }
                    key={_id}
                  >
                    <div className={css.containerDay}>
                      <span className={css.entryDay}>{day}</span>
                    </div>
                    <div className={css.containerInfoEntry}>
                      <span className={css.entryCategory}>{category}</span>
                      <span className={css.entryDescription}>
                        {description}
                      </span>
                    </div>
                    <div className={css.containerValue}>
                      <span className={css.entryValue}>
                        {formatterNumber(value)}
                      </span>
                    </div>
                    <div className={css.containerBtnAction}>
                      <Action id={`btnEdit-${_id}`} onPersist={onPersist}>
                        edit
                      </Action>
                      <Action id={`btnDelete-${_id}`} onDelete={onDelete}>
                        delete
                      </Action>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        );
      })}
    </div>
  );
}
