package lv.dave.shoppinglist.controllers;


import lv.dave.shoppinglist.exceptions.ProductListNotFoundException;
import lv.dave.shoppinglist.exceptions.ProductNotFoundException;
import lv.dave.shoppinglist.models.Product;
import lv.dave.shoppinglist.repositories.ProductListRepository;
import lv.dave.shoppinglist.repositories.ProductRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private ProductRepository productRepository;
    private ProductListRepository productListRepository;

    public ProductController(ProductRepository productRepository, ProductListRepository productListRepository) {
        this.productRepository = productRepository;
        this.productListRepository = productListRepository;
    }

    @GetMapping("")
    public List<Product> index(@RequestParam(name = "product_list_id") Long productListId) {
        return this.productListRepository.findById(productListId).orElseThrow(() -> new ProductListNotFoundException(productListId)).getProducts();
    }

    @PostMapping("")
    public Product store(@RequestBody Product product) {
        return this.productRepository.save(product);
    }

    @GetMapping("/{id}")
    public Product show(@PathVariable Long id) {
        return this.productRepository.findById(id).orElseThrow(() -> new ProductNotFoundException(id));
    }

    @PutMapping("/{id}")
    public Product update(@RequestBody Product newProduct, @PathVariable Long id) {
        return this.productRepository.findById(id).map(product -> {
            product.setName(newProduct.getName());
            product.setAmount(newProduct.getAmount());

            return this.productRepository.save(product);
        }).orElseThrow(() -> new ProductNotFoundException(id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        this.productRepository.deleteById(id);
    }

}
