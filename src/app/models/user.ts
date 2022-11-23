export interface User {
    id: number;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    roleId: string;
}

export interface UserListResponse {    
    data: User[]   
}