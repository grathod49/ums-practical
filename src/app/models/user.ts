export interface User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    isAdmin: boolean;
}

export interface UserListResponse {    
    data: User[]   
}