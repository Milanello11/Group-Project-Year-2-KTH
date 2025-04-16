package com.kth.snomos.backend.Controller;

import com.kth.snomos.backend.Entity.Booking;
import com.kth.snomos.backend.Entity.BookingRequest;
import com.kth.snomos.backend.Entity.Festival;
import com.kth.snomos.backend.Entity.User;
import com.kth.snomos.backend.Service.FestivalService;
import com.kth.snomos.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
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

    @PostMapping("/booking")
    public void postBooking(@RequestBody BookingRequest bookingRequest) {
        System.out.println("User ID: " + bookingRequest.getUserId());
        System.out.println("Festival ID: " + bookingRequest.getFestivalId());
        User user = userService.findById(bookingRequest.getUserId());
        Festival festival = festivalService.findFestivalById(bookingRequest.getFestivalId());
        festival.setTicketsLeft(festival.getTicketsLeft() - 1);
        festivalService.save(festival);
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setFestival(festival);
        festivalService.saveBooking(booking);
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
