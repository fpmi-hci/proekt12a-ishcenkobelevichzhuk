import {Component, OnInit} from '@angular/core';
import {ProductService} from "../service/product.service";
import {Product} from "../domain/product";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  products: Product[]
  isSearchCriteria: boolean = false;
  selectedProduct?: Product

  constructor(private productService: ProductService) {
    this.products = []
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts(): void {
    this.productService.getProducts()
      //.then(res: => )
      .subscribe(prods => this.products = prods)
    // this.products = [{
    //   id: "ffdfd",
    //   name: "sasaa",
    //   category: "sasas",
    //   supplier: "dkl",
    //   price: 24,
    //   description: "fdf",
    //   status: "fdfd",
    //   publicationDate: "fdfd",
    //   attachments: []
    // },
    //   {
    //     id: "ffdfdsaasas",
    //     name: "sasaa",
    //     category: "sasas",
    //     supplier: "dkl",
    //     price: 24,
    //     description: "fdf",
    //     status: "fdfd",
    //     publicationDate: "fdfd",
    //     attachments: []
    //   }]
  }

  onSearchByCriteria(): void {
    this.isSearchCriteria = true;
  }

  onSelect(product: Product): void {
    this.selectedProduct = product
  }
}
