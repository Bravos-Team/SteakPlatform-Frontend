

export interface LoginRequest {
  username: string
  password: string
  deviceId: string
}
export  interface LoginResponse{
  name : string,
  avatar : string
}

export interface RegisterRequest{
  username : string
  email : string
  password : string
}

export interface RegisterResponse{
  message : string



}



