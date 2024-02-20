
const formatPrice = (value, quantity = 1, n = 2, x = 3, s = '.', c = ',') => {
  let re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    totalValue = value * quantity,
    num = totalValue.toFixed(Math.max(0, n));

  return (
    'R$ ' +
    (c ? num.replace('.', c) : num).replace(
      new RegExp(re, 'g'),
      '$&' + (s || ','),
    )
  );
};

export default formatPrice;
