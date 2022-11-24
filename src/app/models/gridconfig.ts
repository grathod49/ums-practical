import { User } from "./user";

export interface ColumnConfig {
    key: string;
    value: string;    
}

export interface GridConfig {
    operation: GridOperation;
    columnConfig: ColumnConfig[];
    data: User[]
}

export interface GridOperation {    
    add?: boolean;
    view?: boolean;
    edit?: boolean;    
    delete?: boolean;    
}