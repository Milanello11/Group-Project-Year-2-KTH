package com.kth.snomos.backend.Repository;

import com.kth.snomos.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepo extends JpaRepository<User, Long> {

    @Query(value = "SELECT s FROM User s")
    List<User> getAllCustom();

    @Query(value = "SELECT * FROM festival_user where username=:val", nativeQuery = true)
    User getUserByName(@Param("val") String name);
}
