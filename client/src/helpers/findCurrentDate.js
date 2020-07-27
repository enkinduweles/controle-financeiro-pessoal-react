function currentDateHelper(periodArray) {
  const currentDate = new Date();
  const currentYearMonth = `${currentDate.toLocaleDateString('en-us', {
    year: 'numeric',
  })}/${currentDate
    .toLocaleDateString('en-us', {
      month: 'short',
    })
    .substr(0, 3)
    .toUpperCase()}`;

  const foundIndex = periodArray.findIndex((item) => {
    return item === currentYearMonth;
  });

  return foundIndex;
}

export { currentDateHelper };
