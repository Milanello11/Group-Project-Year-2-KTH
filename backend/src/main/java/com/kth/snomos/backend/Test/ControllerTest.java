package com.kth.snomos.backend.Test;
import com.kth.snomos.backend.Controller.Controller;
import com.kth.snomos.backend.Entity.Booking;
import com.kth.snomos.backend.Entity.User;

import java.util.ArrayList;
import java.util.List;

public class ControllerTest {
    public static void main(String[] args) {
        List<Booking> bookings = new ArrayList<>();
        User user = new User();

        System.out.println(user);
        user.setEmail("test@test.com");
        user.setPassword("password");
        user.setUsername("test");
        System.out.println(user);

        Controller controller = new Controller();
        String s1 = "eliapa@kth.se";
        String s2 = "elias";

        System.out.println(controller.isValidEmail(s1));
        System.out.println(controller.isValidEmail(s2));
    }

}
