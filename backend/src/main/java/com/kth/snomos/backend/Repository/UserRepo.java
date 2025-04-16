package com.kth.snomos.backend.Repository;

import com.kth.snomos.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepo extends JpaRepository<User, Long> {

    @Query(value = "SELECT s FROM User s")
    List<User> getAllCustom();

    @Query(value = "SELECT * FROM festival_user where username = :val1 AND password = :val2", nativeQuery = true)
    User userExists(@Param("val1") String name, @Param("val2") String password);
}
