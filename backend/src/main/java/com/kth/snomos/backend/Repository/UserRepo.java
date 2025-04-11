package com.kth.snomos.backend.Repository;

import com.kth.snomos.backend.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer> {
}
