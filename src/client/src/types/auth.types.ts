
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

// Auth Data
export interface ILoginData{
    user:{
        id:string;
        email:string;
        role:string;
        fullName?:string;
    },
    accessToken:string
}

// Login Api Response Interface
export interface AuthApiResponse<T>{
    status:'success'|'fail'|'error';
    message:string;
    data:T|null;
    errors?: IValidationError[]
    code?:string
}
