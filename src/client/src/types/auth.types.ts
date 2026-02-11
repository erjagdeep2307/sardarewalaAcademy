
// Login Form Data 
export interface LoginData{
  readonly email:string,
  readonly password:string
}

// Login Errors
interface IValidationError{
    field:string,
    message:string
} 
export interface User {
    id?: string;
    email: string;
    role: string;
    fullName?: string;
}

// Auth Data
export interface ILoginData{
    userData:User,
    token:string
}

// Login Api Response Interface
export interface AuthApiResponse<T>{
    status:'success'|'fail'|'error';
    message:string;
    data?:T|null;
    errors?: IValidationError[]
    code?:string
}
