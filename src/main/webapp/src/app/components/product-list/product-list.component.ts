import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ProductListService} from '../../services/product-list.service';
import {ProductList} from '../../models/product-list';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/product';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
            state('expanded', style({height: '*'})),
            transition('expanded <=> collapsed', animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class ProductListComponent implements OnInit {

    productListForm: ProductList;
    productForm: Product;

    selectedProductList: ProductList;
    productLists: ProductList[];

    columnsToDisplay = ['id', 'name', 'amount'];
    dataSource: MatTableDataSource<Product>;
    expandedElement: Product | null;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private productListService: ProductListService,
                private productService: ProductService,
                private authenticationService: AuthenticationService) {

    }

    ngOnInit() {
        this.createNewProductListForm();
        this.createNewProductForm();

        this.productListService.productLists().subscribe((value) => {
            this.productLists = value;
        });
        this.productListService.loadProductLists().subscribe();

        this.productService.products().subscribe((value) => {
            this.dataSource = new MatTableDataSource(value);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });

        this.dataSource = new MatTableDataSource([]);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    createNewProductListForm() {
        this.productListForm = new ProductList(this.authenticationService.user);
    }

    createNewProductForm() {
        this.productForm = new Product(this.selectedProductList);
    }

    onCreateProductList() {
        this.productListService.storeProductList(this.productListForm).subscribe(() => {
            this.createNewProductListForm();
        });
    }

    onCreateProduct() {
        this.productService.storeProduct(this.productForm).subscribe(() => {
            this.createNewProductForm();
        });
    }

    selectedProductListChange(productList: ProductList) {
        this.productService.loadProducts(productList).subscribe();
        this.createNewProductForm();
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    updateProduct(product: Product) {
        product.productList = this.selectedProductList;
        this.productService.storeProduct(product).subscribe();
    }

    deleteProduct(product: Product) {
        product.productList = this.selectedProductList;
        this.productService.deleteProduct(product).subscribe();
    }

}
