export interface IParams {
  room: string;
  name: string;
}

export interface IMessage {
  user: IUser;
  message: string;
  time: string;
}

export interface IUser {
  name: string;
  isAdmin: boolean;
}