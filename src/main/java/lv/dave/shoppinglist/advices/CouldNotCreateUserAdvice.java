package lv.dave.shoppinglist.advices;

import lv.dave.shoppinglist.exceptions.CouldNotCreateUserException;
import lv.dave.shoppinglist.exceptions.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class CouldNotCreateUserAdvice {

    @ResponseBody
    @ExceptionHandler(CouldNotCreateUserException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String couldNotCreateUserHandler(CouldNotCreateUserException e) {
        return e.getMessage();
    }

}
