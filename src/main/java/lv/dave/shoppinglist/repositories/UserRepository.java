package lv.dave.shoppinglist.repositories;

import lv.dave.shoppinglist.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByName(String name);

}
