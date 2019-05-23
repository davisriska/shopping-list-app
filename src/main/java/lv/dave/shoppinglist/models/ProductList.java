package lv.dave.shoppinglist.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class ProductList {

    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @JsonManagedReference
    @OneToMany(mappedBy = "productList", cascade = CascadeType.ALL)
    private List<Product> products = new ArrayList<>();

    @ManyToOne
    @JoinColumn
    @JsonBackReference
    private User user;

    public ProductList() {

    }

    public ProductList(String name, User user) {
        this.name = name;
        this.user = user;
    }

}
