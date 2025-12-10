export interface TradeHistoryModel {
    id: string;
    userId: number;
    companyId: number;
    tradeDate: Date;
    isBuy: boolean;
    isSell: boolean;
    quantity: number;
    price: number;
    totalAmount: number;
    fees: number;
    profitLoss?: number;
    profitLossPercent?: number;
}