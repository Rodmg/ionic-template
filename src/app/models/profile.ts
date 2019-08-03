import { BaseModel } from "./baseModel";
import { User } from "./user";

export class Profile extends BaseModel {
  // tslint:disable-next-line:variable-name
  time_zone: string;
  locale: "en" | "es";
  userId: number;
  user?: User;

  constructor(obj?: any) {
    super(obj);
    Object.assign(this, obj);
    if (obj && obj.user) {
      this.user = new User(obj.user);
    }
  }
}
