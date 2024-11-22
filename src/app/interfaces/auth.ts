export interface RegisterPostData {
  fullname:string;
  email:string;
  password:string;
}

export interface User extends RegisterPostData {
  id:string;
}
export interface AddPostData{
  pname:string;
  price:string;
}
export interface Product extends AddPostData {
  id:string;
}
