export interface Model {
    id?: number; 
    title: string;
    amount: number;
    category: string;
    payment: string;
    status: boolean;
    date: string;           // ISO format : 'YYYY-MM-DD'
    notes?: string;
    receipt?: string;

}
