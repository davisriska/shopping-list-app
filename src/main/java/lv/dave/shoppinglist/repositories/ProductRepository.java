package lv.dave.shoppinglist.repositories;

import lv.dave.shoppinglist.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
