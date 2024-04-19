export const formatPrice = (number: number) => {
    return new Intl.NumberFormat().format(number)
}