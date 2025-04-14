package com.kth.snomos.backend.Service;

import com.kth.snomos.backend.Entity.User;
import com.kth.snomos.backend.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public void save(User user) {
        userRepo.save(user);
    }

    public List<User> findAll() {
        return userRepo.findAll();
    }

}
