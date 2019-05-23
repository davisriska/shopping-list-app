package lv.dave.shoppinglist.controllers;


import lv.dave.shoppinglist.exceptions.ProductListNotFoundException;
import lv.dave.shoppinglist.exceptions.UserNotFoundException;
import lv.dave.shoppinglist.models.ProductList;
import lv.dave.shoppinglist.repositories.ProductListRepository;
import lv.dave.shoppinglist.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/product_lists")
public class ProductListController {

    private ProductListRepository productListRepository;
    private UserRepository userRepository;

    public ProductListController(ProductListRepository productListRepository, UserRepository userRepository) {
        this.productListRepository = productListRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("")
    public List<ProductList> index(@RequestParam(name = "user_id") Long userId) {
        return this.userRepository.findById(userId).orElseThrow(() -> new UserNotFoundException(userId)).getProductLists();
    }

    @PostMapping("")
    public ProductList store(@RequestBody ProductList productList) {
        return this.productListRepository.save(productList);
    }

    @GetMapping("/{id}")
    public ProductList show(@PathVariable Long id) {
        return this.productListRepository.findById(id).orElseThrow(() -> new ProductListNotFoundException(id));
    }

    @PutMapping("/{id}")
    public ProductList update(@RequestBody ProductList newProductList, @PathVariable Long id) {
        return this.productListRepository.findById(id).map(product -> {
            product.setName(newProductList.getName());

            return this.productListRepository.save(product);
        }).orElseThrow(() -> new ProductListNotFoundException(id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        this.productListRepository.deleteById(id);
    }

}
