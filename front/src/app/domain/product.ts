import {Category} from "./category";
import {Supplier} from "./supplier";

export interface Product {
  id:string,
  name:string,
  category:Category,
  supplier:Supplier,
  price:number,
  description:string,
  status:string,
  publicationDate:string,
  attachments:string[]
}
