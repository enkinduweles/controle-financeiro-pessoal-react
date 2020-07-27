const formatter = Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
});

function formatterNumber(value) {
  return formatter.format(value);
}

export { formatterNumber };
