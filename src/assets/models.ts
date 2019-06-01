export interface University {
        careers: Career;
        faculties: Faculty;
        user_type: RoleType;
}

export interface Career {
        career_ID: string;
        career: string;
}

export interface RoleType {
        ID: number;
        user_type: string;
}

export interface Faculty {
        fac_id: string;
        fac_description: string;
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
        trx_ID: number;
        trx_type: string;
        amount: number;
        description: string;
        date: Date;
}

export interface accountForm {
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
