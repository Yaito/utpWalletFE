// export interface Transaction {
//         id: number;
//         trx_ID: number;
//         user: string;
//         type: string;
//         date: Date;
//         description: string;
//         amount: number;
// }

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
        trx_ID: number;
        trx_type: string;
        amount: number;
        description: string;
        date: Date;
}

export interface RegisterForm {
        username: string;
        password: string;
        usertype: number;
        first_name: string;
        last_name: string;
        personal_ID: string;
        acc_faculty: string;
        acc_career: string;
}

export enum Role {
        Student = 0,
        Security = 1,
        Operator = 2,
        Admin = 3
}
