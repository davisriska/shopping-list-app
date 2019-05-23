import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {ProductList} from '../models/product-list';
import {AuthenticationService} from './authentication.service';

@Injectable({
    providedIn: 'root'
})
export class ProductListService {

    private productListsSubject = new BehaviorSubject<ProductList[]>([]);

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {

    }

    productLists() {
        return this.productListsSubject.asObservable();
    }

    loadProductLists() {
        return this.http.get(environment.baseURL + '/api/product_lists?user_id=' + this.authenticationService.user.id).pipe(
            tap((response: ProductList[]) => this.productListsSubject.next(response))
        );
    }

    storeProductList(productList: ProductList) {
        return this.http.post(environment.baseURL + '/api/product_lists/', productList).pipe(
            tap((response: any) => this.loadProductLists().subscribe())
        );
    }

    updateProductList(productList: ProductList) {
        return this.http.put(environment.baseURL + `/api/product_lists/${productList.id}`, productList).pipe(
            tap((response: any) => this.loadProductLists().subscribe())
        );
    }

    deleteProductList(id: number) {
        return this.http.delete(environment.baseURL + `/api/product_lists/${id}`).pipe(
            tap((response: any) => this.loadProductLists().subscribe())
        );
    }

}
