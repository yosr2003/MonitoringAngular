import { Roles } from "src/app/roles";

export interface loginResponse{
    accessToken : string;
    type : string;
    id : number;
    firstname : string;
    firstLogin:string;    
    email :string;
    roles : Roles [] ;
}