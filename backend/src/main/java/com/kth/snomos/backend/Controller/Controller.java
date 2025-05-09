package com.kth.snomos.backend.Controller;

import com.kth.snomos.backend.Entity.*;
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
            return userService.saveUser(user);
        }
        return "Error-Email";
    }

    @PutMapping("/user/changeEmail/{userid}/{email}")
    public String changeEmail(@PathVariable("userid") int userid, @PathVariable("email") String email) {
        if(isValidEmail(email)) {
            userService.changeUserEmail(email, userid);
            return "Updated";
        }
        return "Error";
    }

    @GetMapping("/user/findall")
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @GetMapping("/user/login/{username}/{password}")
    public long findByName(@PathVariable String username, @PathVariable String password) {
        return userService.userExists(username, password);
    }

    @GetMapping("/user/getEmail/{userId}")
    public String getEmail(@PathVariable int userId) {
        return userService.getUserEmail(userId);
    }

    @DeleteMapping("/user/delete/{userid}")
    public void deleteUser(@PathVariable int userid) {
        userService.deleteUser(userid);
    }

    ////////////////////////////////////Festival//////////////
    @PostMapping("/festival/save")
    public void postFestival(@RequestBody Festival festival) {
        festivalService.saveFestival(festival);
    }

    @PutMapping("/festival/update/description/{festivalId}")
    public void updateFestivalDescription(@PathVariable long festivalId, @RequestBody String description) {
        festivalService.updateFestivalDescription(festivalId, description);
    }

    @PutMapping("/festival/updateUrl/{festivalId}")
    public void updateFestivalUrl(@PathVariable long festivalId, @RequestBody String url) {
        festivalService.updateFestivalURL(festivalId, url);
    }

    @GetMapping("/festival/getartists/{festivalId}")
    public List<Artist> getArtistsByFestivalId(@PathVariable long festivalId) {
        return festivalService.findFestivalById(festivalId).getArtists();
    }

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

    @GetMapping("/festival/findbyartist/{artist}")
    public List<Festival> findFestivalByArtist(@PathVariable String artist) {
        return festivalService.findFestivalByArtist(artist);
    }

    //Ska tas bort!!
    @GetMapping("/festival/dateandname/{name}/{date}")
    public Festival findFestivalByDateAndName(@PathVariable LocalDate date, @PathVariable String name) {
        return festivalService.findFestivalByDateAndName(date, name);
    }

    @GetMapping("/festival/findall")
    public List<Festival> getAllFestivals() {
        return festivalService.findAllFestivals();
    }

    @GetMapping("/festival/upcoming")
    public List<Festival> getUpcomingFestivals() {
        return festivalService.getUpcomingFestivals();
    }

    @DeleteMapping("/festival/delete/{festivalId}")
    public void deleteFestival(@PathVariable long festivalId) {
        festivalService.deleteFestival(festivalId);
    }

    ////////////////////////////////////Booking///////////////
    @PostMapping("/booking/{festivalID}/{userID}")
    public String postBooking(@PathVariable long festivalID, @PathVariable long userID) {
        User user = userService.findUserById(userID);
        Festival festival = festivalService.findFestivalById(festivalID);
        return festivalService.saveBooking(new Booking(user, festival));
    }

    @GetMapping("/booking/{userId}")
    public List<Festival> getBookings(@PathVariable long userId) {
        return userService.getBookingsByUser(userId);
    }

    ////////////////////////////////////Artist////////////////
    @PostMapping("/artist/save")
    public void postArtist(@RequestBody Artist artist) {
        festivalService.saveArtist(artist);
    }

    @GetMapping("/artist/findall")
    public List<Artist> findAllArtists() {
        return festivalService.findAllArtists();
    }

    @DeleteMapping("/artist/delete/{artistName}")
    public void deleteArtist(@PathVariable String artistName) {
        festivalService.deleteArtist(artistName);
    }

    @GetMapping("/artist/getbyname/{name}")
    public Artist getArtistByName(@PathVariable String name) {
        return festivalService.findArtistByName(name);
    }

    @PutMapping("/artist/updateage/")
    public void updateArtistAge(@RequestBody Artist artist) {
        festivalService.updateArtistAge(artist.getArtist_name(),artist.getAge());
    }

    @PostMapping("/addartist/festival/{festivalName}/{festivalDate}/{artistName}")
    public void addArtistToFestival(@PathVariable String artistName, @PathVariable String festivalName, @PathVariable LocalDate festivalDate) {
        festivalService.addArtistToFestival(artistName, festivalName, festivalDate);
    }

    /// //////////////////////Admin/////////////////
    @PostMapping("/admin/save")
    public String addAdmin(@RequestBody Admin admin) {
        if(isValidEmail(admin.getEmail())) {
            userService.saveAdmin(admin);
            return "Good";
        }
        return "Bad";
    }

    @DeleteMapping("/admin/delete/{adminId}")
    public void deleteAdmin(@PathVariable long adminId) {
        userService.deleteAdmin(adminId);
    }

    @GetMapping("/admin/findByID/{adminID}")
    public Admin findAdminById(@PathVariable long adminID) {
        return userService.findAdminById(adminID);
    }

    /// //////////////////////private/////////////////
    public boolean isValidEmail(String email) {
        String pattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";
        return email.matches(pattern);
    }
}
