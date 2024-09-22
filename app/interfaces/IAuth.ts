// app/services/IAuth.ts

export interface LoginRequest {
    cpf: string;
    password: string;
  }
  
  export interface LoginResponse {
    message: string;
    token: string;
    role: string; 
  }
  