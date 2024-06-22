export const formatAmount: (value: string) => string = (value: string) => {
  // Remove any non-numeric characters except the decimal point
  const numbersOnly = value.replace(/[^\d.]/g, '');
  console.log(numbersOnly, 'numbersOnly');

  // Split the number into integer and decimal parts
  let [integerPart, decimalPart] = numbersOnly.split('.');

  // Check if the input contains a decimal point
  const containsDecimal = numbersOnly.includes('.');

  // Format the integer part with commas
  if (integerPart) {
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // Limit the decimal part to two digits, if it exists
  if (decimalPart !== undefined) {
    decimalPart = decimalPart.slice(0, 2);
  }

  // Combine parts back together
  let formattedValue = containsDecimal
    ? `${integerPart}.${decimalPart !== undefined ? decimalPart : ''}`
    : integerPart;

  // Return both formatted value for display and raw value for further use
  return formattedValue;
  //   }
};
