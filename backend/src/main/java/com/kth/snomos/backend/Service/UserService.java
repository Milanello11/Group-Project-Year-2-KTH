package com.kth.snomos.backend.Service;

import com.kth.snomos.backend.Entity.User;
import com.kth.snomos.backend.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User save(User user) {
        return userRepo.save(user);
    }

}
