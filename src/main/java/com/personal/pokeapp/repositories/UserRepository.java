package com.personal.pokeapp.repositories;

import com.personal.pokeapp.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
