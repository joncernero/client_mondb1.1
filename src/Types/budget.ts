export type Budget = {
  id: string;
  year: string;
  month: string;
  startDate: string;
  endDate: string;
  spendAsOf: string;
  budgetAmount: number;
  spendAmount: number;
  projectedSpend: number;
  credits: number;
  dailyPacing: number;
  actualPacing: number;
  rollOver: number;
  buPercentage: number;
  accountId: string;
  orderId: string;
};
