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
        user_type: string;
        transactions: Transactions[];
}

export interface LogUser {
        user_ID: number;
        user_type: number;
        access_token: string;
        refresh_token: string;
}

export interface Transactions {
        user_ID: number;
        trx_type: string;
        amount: number;
        date: Date;
}

export enum Role {
        Student = 0,
        Security = 1,
        Operator = 2,
        Admin = 3
}
