export enum FinancialTransactionType {
  CustomerCreditFeePayment = 0,
  CustomerCreditAllocation = 1,
  PlanCreditAllocationCustomerCredit = 2,
  CustomerCreditWithdraw = 3,
  MerchantFeePayment = 4,
  MerchantCashout = 5,
  CreditLineProviderDeposit = 6,
}

export const transactionTypeOptions = [
  { labelKey: 'financial:customer_credit_fee_payment', value: FinancialTransactionType.CustomerCreditFeePayment },
  { labelKey: 'financial:customer_credit_allocation', value: FinancialTransactionType.CustomerCreditAllocation },
  { labelKey: 'financial:plan_credit_allocation_customer_credit', value: FinancialTransactionType.PlanCreditAllocationCustomerCredit },
  { labelKey: 'financial:customer_credit_withdraw', value: FinancialTransactionType.CustomerCreditWithdraw },
  { labelKey: 'financial:merchant_fee_payment', value: FinancialTransactionType.MerchantFeePayment },
  { labelKey: 'financial:merchant_cashout', value: FinancialTransactionType.MerchantCashout },
  { labelKey: 'financial:credit_line_provider_deposit', value: FinancialTransactionType.CreditLineProviderDeposit },
];

export const getTransactionTypeLabelKey = (type: number): string => {
  const option = transactionTypeOptions.find(opt => opt.value === type);
  return option?.labelKey || 'financial:unknown_type';
};
