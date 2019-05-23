package lv.dave.shoppinglist.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Product {

    private @Id
    @GeneratedValue
    Long id;

    private String name;
    private int amount;

    @JsonBackReference
    @ManyToOne
    @JoinColumn
    private ProductList productList;

    public Product() {

    }

    public Product(String name, int amount, ProductList productList) {
        this.name = name;
        this.amount = amount;
        this.productList = productList;
    }

}
