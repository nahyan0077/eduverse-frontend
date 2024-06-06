export interface DisplayUser {
    _id?: string,
    email?: string,
    firstName?: string,
    lastName?: string,
    userName?: string,
    avatar?: string,
    phone?: string,
    address?: string,
    social?: string,
    role?: string,
    profession?: string,
    qualification?: string,
    isGAuth?: boolean,
    cv?:string,
    isVerified?: boolean,
    isBlocked?: boolean,
    createdAt?: string;
}