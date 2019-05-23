package lv.dave.shoppinglist.exceptions;

public class ProductListNotFoundException extends RuntimeException {

    public ProductListNotFoundException(Long id) {
        super("Could not find product list " + id);
    }

}
