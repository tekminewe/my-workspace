export const formatCurrency = ({
  amount,
  locale = "en-US",
  currency = "MYR",
}: {
  amount: number;
  locale: string;
  currency: string;
}) => {
  return amount.toLocaleString(locale, {
    style: "currency",
    currency: currency,
  });
};
