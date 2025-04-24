package com.kth.snomos.backend.Controller;

import com.kth.snomos.backend.Entity.Artist;
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
    public String postUser(@RequestBody User user) {
        if(isValidEmail(user.getEmail())) {
            userService.save(user);
            return "Saved";
        }
        return "Error";
    }

    @DeleteMapping("/user/delete/{userid}")
    public void deleteUser(@PathVariable int userid) {
        userService.deleteUser(userid);
    }

    @PutMapping("/user/changeEmail/{userid}/{email}")
    public String changeEmail(@PathVariable("userid") int userid, @PathVariable("email") String email) {
        if(isValidEmail(email)) {
            userService.changeEmail(email, userid);
            return "Updated";
        }
        return "Error";
    }

    @GetMapping("/user/findall")
    public List<User> getAllUsers() {
        return userService.findAll();
    }

    @GetMapping("/user/find/{username}/{password}")
    public long findByName(@PathVariable String username, @PathVariable String password) {
        return userService.userExists(username, password);
    }

    ////////////////////////////////////Festival//////////////
    @GetMapping("/festival/findbyname/{name}")
    public List<Festival> findFestivalByName(@PathVariable String name) {
        return festivalService.findFestivalByName("%" + name + "%");
    }

    @GetMapping("/festival/findbydate/{date}")
    public List<Festival> findFestivalByDate(@PathVariable LocalDate date) {
        return festivalService.findFestivalByDate(date);
    }

    @GetMapping("/festival/findbylocation/{location}")
    public List<Festival> findFestivalByLocation(@PathVariable String location) {
        return festivalService.findFestivalByLocation("%" + location + "%");
    }

    @GetMapping("/festival/findbyartist/{artist}")
    public List<Festival> findFestivalByArtist(@PathVariable String artist) {
        return festivalService.findFestivalByArtist("%" + artist + "%");
    }

    @GetMapping("/festival/findallartistfestival/{festivalName}/{festivalDate}")
    public List<Artist> findAllArtistInFestival(@PathVariable LocalDate festivalDate, @PathVariable String festivalName) {
        return festivalService.findAllArtistInFestival(festivalDate, festivalName);
    }

    //Ska tas bort!!
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

    @PutMapping("/festival/update/description/{festivalId}")
    public void updateFestivalDescription(@PathVariable long festivalId, @RequestBody String description) {
        festivalService.updateFestivalDescription(festivalId, description);
    }

    @PostMapping("/festival/save")
    public void postFestival(@RequestBody Festival festival) {
        festivalService.save(festival);
    }

    ////////////////////////////////////Booking///////////////
    @PostMapping("/booking")
    public String postBooking(@RequestParam LocalDate date, @RequestParam String festivalName, @RequestParam long userID) {
        User user = userService.findById(userID);
        Festival festival = festivalService.findFestivalByDateAndName(date, festivalName);
        if (festival.getTicketsLeft() <= 0) {
            return "No tickets left";
        }
        festival.setTicketsLeft(festival.getTicketsLeft() - 1);
        festivalService.save(festival);
        Booking booking = new Booking();
        booking.setUser(user);
        booking.setFestival(festival);
        festivalService.saveBooking(booking);
        return "Booking saved";
    }

    @GetMapping("/booking/{userId}")
    public List<Festival> getBookings(@PathVariable long userId) {
        return userService.findBookingsByUser(userId);
    }

    ////////////////////////////////////Artist////////////////
    @PostMapping("/artist/save")
    public void postArtist(@RequestBody Artist artist) {
        festivalService.saveArtist(artist);
    }

    @PostMapping("/addartist/festival/{festivalName}/{festivalDate}/{artistName}")
    public void addArtistToFestival(@PathVariable String artistName, @PathVariable String festivalName, @PathVariable LocalDate festivalDate) {
        festivalService.addArtistToFestival(artistName, festivalName, festivalDate);
    }

    /// //////////////////////private/////////////////
    private boolean isValidEmail(String email) {
        String pattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";
        return email.matches(pattern);
    }
}
