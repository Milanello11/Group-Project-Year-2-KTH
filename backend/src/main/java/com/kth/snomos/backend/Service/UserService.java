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
        return userRepo.getAllCustom();
    }

    public User findByName(String name) {
        return userRepo.getUserByName(name);
    }

    public User findById(Long id) {
        return userRepo.findById(id).orElseThrow();
    }

}
