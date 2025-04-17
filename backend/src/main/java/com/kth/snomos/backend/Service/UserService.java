package com.kth.snomos.backend.Service;

import com.kth.snomos.backend.Entity.Booking;
import com.kth.snomos.backend.Entity.Festival;
import com.kth.snomos.backend.Entity.User;
import com.kth.snomos.backend.Repository.BookingRepo;
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

    public long userExists(String name, String password) {
        User user = userRepo.userExists(name , password);
        return user == null ? -1 : user.getUserid();
    }

    public User findById(Long id) {
        return userRepo.findById(id).orElseThrow();
    }

    public List<Festival> findBookingsByUser (Long id) {
        return userRepo.findBookingsByUser(id);
    }

}
