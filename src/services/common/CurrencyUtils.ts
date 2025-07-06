import { z } from 'zod'

const CurrencyUtils = {
  formatCurrency(value: number, currencyType: string) {
    const dotIndexOf = value
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
      .indexOf('.')
    return (
      currencyType +
      value
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
        .slice(0, dotIndexOf)
    )
  },
  calculatPriceAfterSale(price: number, salePercent: number) {
    return price - (price * salePercent) / 100
  },
}
export default CurrencyUtils
