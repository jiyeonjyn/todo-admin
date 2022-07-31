export type RequestSignUpDto = {
  userId: string;
  userPw: string;
  userName: string;
  userBirth: string;
  userEmail: string;
};

export type RequestSignInDto = {
  userId: string;
  userPw: string;
};

export type ResponseSignInDto = {
  userId: string;
  accessToken: string;
  refreshToken: string;
};

export type UserData = {
  id: number;
  userid: string;
  username: string;
  userbirth: string;
  useremail: string;
};

export type ResponseUsersDto = UserData[];
