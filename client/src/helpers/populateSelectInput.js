import { currentDateHelper } from './findCurrentDate.js';

const date = new Date('01-01-2019');

const OBJECT_REFERENCE = {
  period: [],
  maxYear: 2021,
  initialYear: date.getFullYear(),
  initialMonth: date.getMonth(),
  maxMonth: 12,
  currentYearMonth: '',
};

function yearMonthCollection() {
  const {
    period,
    maxYear,
    initialYear,
    initialMonth,
    maxMonth,
  } = OBJECT_REFERENCE;

  for (let i = initialYear; i <= maxYear; i++) {
    date.setFullYear(i);
    for (let j = initialMonth; j < maxMonth; j++) {
      date.setMonth(j);
      const yearMonth = `${date.toLocaleDateString('en-us', {
        year: 'numeric',
      })}/${date
        .toLocaleDateString('en-us', {
          month: 'short',
        })
        .substr(0, 3)
        .toUpperCase()}`;
      period.push(yearMonth);
    }
  }

  OBJECT_REFERENCE.currentYearMonth = currentDateHelper(
    OBJECT_REFERENCE.period
  );

  return OBJECT_REFERENCE;
}

export { yearMonthCollection };
