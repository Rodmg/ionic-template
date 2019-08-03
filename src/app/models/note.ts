import { BaseModel } from "./baseModel";
import { User } from "./user";

export class Note extends BaseModel {
  title: string;
  content: string;
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
