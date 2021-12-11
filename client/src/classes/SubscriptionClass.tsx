import User from "./User";

export default interface SubscriptionClass {
  name: string;
  price: number;
  user: User;
  recurrence: string;
  createdAt: Date;
  updatedAt: Date;
  objectId: string;
  customerid: string;
}
