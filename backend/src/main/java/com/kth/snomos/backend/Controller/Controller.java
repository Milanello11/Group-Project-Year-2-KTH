package com.kth.snomos.backend.Controller;

import com.kth.snomos.backend.Entity.Booking;
import com.kth.snomos.backend.Entity.Festival;
import com.kth.snomos.backend.Entity.User;
import com.kth.snomos.backend.Service.FestivalService;
import com.kth.snomos.backend.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api")
public class Controller {

    @Autowired
    private UserService userService;
    @Autowired
    private FestivalService festivalService;

    ////////////////////////////////////User//////////////////
    @PostMapping("/user/save")
    public void postUser(@RequestBody User user) {
        userService.save(user);
    }

    @GetMapping("/user/findall")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/user/findbyname/{username}/{password}")
    public long findByName(@PathVariable String username, @PathVariable String password) {
        return userService.userExists(username, password);
    }

    ////////////////////////////////////Festival//////////////
    @GetMapping("/festival/findbyname/{name}")
    public List<Festival> findFestivalByName(@PathVariable String name) {
        return festivalService.findFestivalByName(name);
    }

    @GetMapping("/festival/findbydate/{date}")
    public List<Festival> findFestivalByDate(@PathVariable LocalDate date) {
        return festivalService.findFestivalByDate(date);
    }

    @GetMapping("/festival/findbylocation/{location}")
    public List<Festival> findFestivalByLocation(@PathVariable String location) {
        return festivalService.findFestivalByLocation(location);
    }

    @GetMapping("/festival/dateandname/{name}/{date}")
    public Festival findFestivalByDateAndName(@PathVariable LocalDate date, @PathVariable String name) {
        return festivalService.findFestivalByDateAndName(date, name);
    }

    @GetMapping("/festival/findall")
    public List<Festival> getAllFestivals() {
        return festivalService.findAll();
    }

    @GetMapping("/festival/upcoming")
    public List<Festival> getUpcomingFestivals() {
        return festivalService.getUpcomingFestivals();
    }

    @PostMapping("/festival/save")
    public void postFestival(@RequestBody Festival festival) {
        festivalService.save(festival);
    }

    ////////////////////////////////////Booking///////////////
    @PostMapping("/booking")
    public void postBooking(@RequestParam LocalDate date, @RequestParam String festivalName, @RequestParam long userID) {
        User user = userService.findById(userID);
        Festival festival = festivalService.findFestivalByDateAndName(date, festivalName);
        if (festival.getTicketsLeft() <= 0) {
            return;
        }
        festival.setTicketsLeft(festival.getTicketsLeft() - 1);
        festivalService.save(festival);
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setFestival(festival);
        festivalService.saveBooking(booking);
    }

    ////////////////////////////////////Artist////////////////
}
