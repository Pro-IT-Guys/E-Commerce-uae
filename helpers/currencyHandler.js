export function convertCurrency(from, to, amount) {
  const rateAEDtoUSD = 0.27

  try {
    if (from === to) {
      return `${amount?.toString()} AED`
    }

    if (from === 'AED' && to === 'USD') {
      const result = amount * rateAEDtoUSD
      return `$ ${result?.toFixed(2)?.toString()}`
    }

    if (from === 'USD' && to === 'AED') {
      const result = amount / rateAEDtoUSD
      return `${result?.toFixed(2)?.toString()} AED`
    }
  } catch (error) {
    throw new Error('Unsupported currency conversion.')
  }
}

export function convertCurrencyForCalculation(from, to, amount) {
  const rateAEDtoUSD = 0.27

  try {
    if (from === to) {
      return Number(amount)
    }

    if (from === 'AED' && to === 'USD') {
      const result = amount * rateAEDtoUSD
      return Number(result?.toFixed(2)?.toString())
    }

    if (from === 'USD' && to === 'AED') {
      const result = amount / rateAEDtoUSD
      return Number(result?.toFixed(2)?.toString())
    }
  } catch (error) {
    throw new Error('Unsupported currency conversion.')
  }
}
