package lv.dave.shoppinglist.exceptions;

public class CouldNotCreateUserException extends RuntimeException {

    public CouldNotCreateUserException(String name) {
        super("Could not create user " + name);
    }

}
