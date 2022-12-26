import {Category} from "./category";
import {Supplier} from "./supplier";
import {Status} from "./status";

export interface Product {
  id:string,
  name:string,
  category:Category,
  supplier:Supplier,
  price:number,
  description:string,
  status:Status,
  publicationDate:string,
  attachments:string[]
}
