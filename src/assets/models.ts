export interface Transaction {
        id: number;
        user: string;
        type: string;
        date: Date;
        debit: number;
        credit: number;
}

export interface AccountDetail {
        accountID: number;
        fname: string;
        lname: string;
        personalID: string;
        faculty: string;
        career: string;
        balance: number;
}
