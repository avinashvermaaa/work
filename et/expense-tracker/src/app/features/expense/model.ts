export interface Model {
    // id: string | number; 
    id: number; 
    title: string;
    amount: number;
    category: string;
    payment: string;
    status: string;
    date: string;           
    notes: string;
    receipt: string;
    userEmail?: string;  
}
