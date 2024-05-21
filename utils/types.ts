export interface Expense {
  category: string;
  amount: string;
  description: string;
  date: Date;
}

export interface BudgetModel {
  name: string;
  date: string;
  month: string;
  income: string;
  expense: Expense[];
}
