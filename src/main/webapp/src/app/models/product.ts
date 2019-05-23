import {ProductList} from './product-list';

export class Product {

    public id: number;
    public name: string;
    public amount: number;

    public productList: ProductList;

    constructor(productList: ProductList) {
        this.productList = productList;
    }

}
