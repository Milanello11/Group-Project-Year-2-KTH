package com.kth.snomos.backend.Controller;

import com.kth.snomos.backend.Entity.Festival;
import com.kth.snomos.backend.Entity.User;
import com.kth.snomos.backend.Service.FestivalService;
import com.kth.snomos.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController("/api")
public class Controller {

    @Autowired
    private UserService userService;
    @Autowired
    private FestivalService festivalService;

    @PostMapping("/user/save")
    public void postUser(@RequestBody User user) {
        userService.save(user);
    }

    @GetMapping("/user/findall")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/user/findbyname/{username}")
    public User findByName(@PathVariable String username) {
        return userService.findByName(username);
    }

    @PostMapping("/festival/save")
    public void postFestival(@RequestBody Festival festival) {
        festivalService.save(festival);
    }

    @GetMapping("/festival/findall")
    public List<Festival> getAllFestivals() {
        return festivalService.findAll();
    }
}
