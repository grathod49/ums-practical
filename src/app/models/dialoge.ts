import { User } from "./user";

export interface DialogData {
    text: string;
    data?: User | null;
  }