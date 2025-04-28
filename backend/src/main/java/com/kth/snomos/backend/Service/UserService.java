package com.kth.snomos.backend.Service;

import com.kth.snomos.backend.Entity.Festival;
import com.kth.snomos.backend.Entity.User;
import com.kth.snomos.backend.Repository.UserRepo;
import jakarta.transaction.Transactional;
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

    @Transactional
    public void deleteUser(int id){
        userRepo.deleteUser(id);
    }

    public List<User> findAll() {
        return userRepo.getAllUsers();
    }

    public User findById(Long id) {
        return userRepo.findById(id).orElseThrow();
    }

    public long userExists(String name, String password) {
        int i = 0;
        if(userRepo.userExists(name)){
            User user = userRepo.rightPassword(name,password);
            return user == null ? 0 : user.getUserId();
        }
        return -1;
    }

    public String getEmail(int userId){
        return userRepo.getEmail(userId);
    }

    public List<Festival> getBookingsByUser (Long id) {
        return userRepo.findBookingsByUser(id);
    }

    @Transactional
    public void changeEmail(String email, int id) {
        userRepo.updateEmail(email, id);
    }
}
