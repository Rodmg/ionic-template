import { BaseModel } from "./baseModel";
import { Profile } from "./profile";

export class LoginUser {
  token: string;
  expires: number;
  // tslint:disable-next-line:variable-name
  refresh_token: {
    token: string;
    expires: number;
    expires_in: number;
  };
  user: User;
  profile: Profile;
}

export class User extends BaseModel {
  name: string;
  email: string;
  password?: string;
  role: "user" | "admin";
  active?: boolean;
  profile?: Profile;

  constructor(obj?: any) {
    super(obj);
    Object.assign(this, obj);
    if (obj && obj.profile) {
      this.profile = new Profile(obj.profile);
    }
  }
}
