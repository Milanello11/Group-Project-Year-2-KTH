package com.kth.snomos.backend.Controller;

import com.kth.snomos.backend.Entity.User;
import com.kth.snomos.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
public class Controller {

    @Autowired
    private UserService userService;

    @PostMapping("/save")
    public User postUser(@RequestBody User user) {
        return userService.save(user);
    }
}
