import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Product} from '../models/product';
import {environment} from '../../environments/environment';
import {ProductList} from '../models/product-list';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private productsSubject = new BehaviorSubject<Product[]>([]);

    constructor(private http: HttpClient) {

    }

    products() {
        return this.productsSubject.asObservable();
    }

    loadProducts(productList: ProductList) {
        return this.http.get(environment.baseURL + '/api/products?product_list_id=' + productList.id).pipe(
            tap((response: Product[]) => this.productsSubject.next(response))
        );
    }

    storeProduct(product: Product) {
        return this.http.post(environment.baseURL + '/api/products', product).pipe(
            tap((response: Product) => this.loadProducts(product.productList).subscribe())
        );
    }

    updateProduct(product: Product) {
        return this.http.put(environment.baseURL + `/api/products/${product.id}`, product).pipe(
            tap((response: Product) => this.loadProducts(product.productList).subscribe())
        );
    }

    deleteProduct(product: Product) {
        return this.http.delete(environment.baseURL + `/api/products/${product.id}`).pipe(
            tap((response: any) => this.loadProducts(product.productList).subscribe())
        );
    }

}
