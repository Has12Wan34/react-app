export interface Users {
    key: string;
    prefix: string;
    fname: string;
    lname: string;
    passport: string | undefined;
    phonenumber: string;
    cardnumber: string;
    salary: number | null;
    gender: string;
    nationality: string;
    birthdate: string;
};

export interface userInitialStateType {
    users: Users[] | undefined | [];
    user: Users | null;
    status: string | null | undefined;
    error: string | null | undefined;
};
