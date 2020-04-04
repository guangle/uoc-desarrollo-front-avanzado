import { User } from "../models/user.model";

export interface UserState {
  id: number;
  propiedad1: Date;
  users: User[];
}
