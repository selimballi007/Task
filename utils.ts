export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-MZ", {
        style: "currency",
        currency: "MZN", // Mozambik Metikali
        minimumFractionDigits: 2,
    }).format(value);
};