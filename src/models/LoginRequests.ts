// models/LoginRequests.ts
export interface LoginRequests {
    phoneNo: string;
    password: string;
}
enum RolesType {
    STUDENT = 'STUDENT',
    ADMIN = 'ADMIN',
    TEACHER = 'TEACHER',
}
export interface LoginResponse {
    id: number;
    username: string;
    email: string;
    token: string;
    roles: RolesType;
    createdAt: string;
    updatedAt: string;
}

export interface RegisterRequests {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterResponse {
    id: number;
    username: string;
    email: string;
    token: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface UsersLists{
    id: number;
    fullname: string;
    username: string;
    email: string;
    phoneNo:string;
    role: string;
    createdAt: string;
    updatedAt: string;
}