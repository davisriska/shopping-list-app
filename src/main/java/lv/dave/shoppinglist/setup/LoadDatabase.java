package lv.dave.shoppinglist.setup;

import lombok.extern.slf4j.Slf4j;
import lv.dave.shoppinglist.models.Product;
import lv.dave.shoppinglist.models.ProductList;
import lv.dave.shoppinglist.models.User;
import lv.dave.shoppinglist.repositories.ProductListRepository;
import lv.dave.shoppinglist.repositories.ProductRepository;
import lv.dave.shoppinglist.repositories.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class LoadDatabase {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, ProductListRepository productListRepository, ProductRepository productRepository) {
        return args -> {
            User dave = new User("Dave");
            User caps = new User("Caps");

            log.info("Preloading " + userRepository.save(dave));
            log.info("Preloading " + userRepository.save(caps));

            ProductList davesProductList = new ProductList("My list", dave);
            ProductList capsProductList = new ProductList("My list", caps);

            log.info("Preloading " + productListRepository.save(davesProductList));
            log.info("Preloading " + productListRepository.save(capsProductList));

            Product bread = new Product("Bread", 1, davesProductList);
            Product orangeJuice = new Product("Orange juice", 3, capsProductList);

            log.info("Preloading " + productRepository.save(bread));
            log.info("Preloading " + productRepository.save(orangeJuice));
        };
    }

}
