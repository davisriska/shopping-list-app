package lv.dave.shoppinglist.repositories;

import lv.dave.shoppinglist.models.ProductList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductListRepository extends JpaRepository<ProductList, Long> {

}
