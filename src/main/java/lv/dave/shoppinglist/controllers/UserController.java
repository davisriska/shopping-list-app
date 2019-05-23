package lv.dave.shoppinglist.controllers;

import lv.dave.shoppinglist.exceptions.CouldNotCreateUserException;
import lv.dave.shoppinglist.exceptions.UserNotFoundException;
import lv.dave.shoppinglist.models.User;
import lv.dave.shoppinglist.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public List<User> index() {
        return this.userRepository.findAll();
    }

    @PostMapping("/")
    public User store(@RequestBody User user) {
        return this.userRepository.save(user);
    }

    @GetMapping("/{id}")
    public User show(@PathVariable Long id) {
        return this.userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
    }

    @PutMapping("/{id}")
    public User update(@RequestBody User newUser, @PathVariable Long id) {
        return this.userRepository.findById(id).map(user -> {
            user.setName(newUser.getName());

            return this.userRepository.save(user);
        }).orElseThrow(() -> new UserNotFoundException(id));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        this.userRepository.deleteById(id);
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return this.userRepository.findByName(user.getName()).orElseThrow(() -> new UserNotFoundException(user.getName()));
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        try {
            return this.userRepository.save(user);
        } catch (Exception e) {
            throw new CouldNotCreateUserException(user.getName());
        }
    }

}
