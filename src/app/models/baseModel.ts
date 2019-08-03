export class BaseModel {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }
}
