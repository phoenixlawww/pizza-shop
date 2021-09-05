export default function formatCurrency (value) {
  if (isNaN(value)) {
    return 0
  }

  return Number(value).toLocaleString('en')
}
