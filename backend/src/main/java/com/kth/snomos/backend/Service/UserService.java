package com.kth.snomos.backend.Service;

import com.kth.snomos.backend.Entity.Admin;
import com.kth.snomos.backend.Entity.Festival;
import com.kth.snomos.backend.Entity.User;
import com.kth.snomos.backend.Repository.AdminRepo;
import com.kth.snomos.backend.Repository.UserRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AdminRepo adminRepo;

    public String saveUser(User user) {
        if(userRepo.userExists(user.getUsername())) {
            return "Error-Username";
        }
        userRepo.save(user);
        return "Success";
    }

    public void saveAdmin(Admin admin) {
        adminRepo.save(admin);
    }

    @Transactional
    public void deleteUser(int id){
        userRepo.deleteUser(id);
    }

    @Transactional
    public void deleteAdmin(long id){adminRepo.deleteById(id);}

    public List<User> findAllUsers() {
        return userRepo.getAllUsers();
    }

    public User findUserById(Long id) {
        return userRepo.findById(id).orElseThrow();
    }

    public Admin findAdminById(long id) {
        return adminRepo.findById(id).orElseThrow();
    }

    public long userExists(String name, String password) {
        if(userRepo.userExists(name)){
            User user = userRepo.rightPassword(name,password);
            return user == null ? 0 : user.getUserId();
        }
        return -1;
    }

    public String getUserEmail(int userId){
        return userRepo.getEmail(userId);
    }

    public List<Festival> getBookingsByUser (Long id) {
        return userRepo.findBookingsByUser(id);
    }

    @Transactional
    public void changeUserEmail(String email, int id) {
        userRepo.updateEmail(email, id);
    }
}
