const CurrencyUtils = {
  formatCurrency(value: number | undefined, currencyType: string) {
    if (value === undefined || value === null) return 0
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
