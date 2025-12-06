export interface ExpenseModel {
    id: any;
    userId: number;
    categoryId: number;
    subCategoryId?: number;
    amount: number;
    date: Date;
    note?: string;
    createdAt?: Date;
    updatedAt?: Date;
}