export interface Transaction {
        id: number;
        user: string;
        type: string;
        date: Date;
        debit: number;
        credit: number;
}

export interface User {
        acc_ID: number;
        first_name: string;
        last_name: string;
        personal_ID: string;
        account_faculty: string;
        account_career: string;
        acc_balance: number;
}
