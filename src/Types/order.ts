export type Order = {
  id: string;
  orderNumber: string;
  orderType: string;
  startDate: string;
  endDate: string;
  campaignStartDate: string;
  spendAsOfDate: string;
  orderAmount: number;
  budgetSpent: number;
  contractType: string;
  dailyPacing: number;
  cbu: number;
  accountId: string;
  ioId: string;
};
