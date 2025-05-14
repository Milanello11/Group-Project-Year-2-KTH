package com.kth.snomos.backend;

import com.kth.snomos.backend.Controller.Controller;
import com.kth.snomos.backend.Entity.*;
import com.kth.snomos.backend.Service.FestivalService;
import com.kth.snomos.backend.Service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(Controller.class)
public class ControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private FestivalService festivalService;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void testUserExists () throws Exception {
        User user = new User();
        user.setUsername("test");
        when(userService.userExists("test")).thenReturn(true);

        mockMvc.perform(post("/api/user/save")
                .contentType("application/json")
                .content(new ObjectMapper().writeValueAsString(user)))
                .andExpect(status().isOk()).andExpect(content().string("Username-Taken"));
    }

    @Test
    public void testUserSaved () throws Exception {
        User user = new User();
        user.setUsername("test1");
        when(userService.userExists("test1")).thenReturn(false);
        when(userService.saveUser(user)).thenReturn("Success");

        mockMvc.perform(post("/api/user/save")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk()).andExpect(content().string("Success"));
    }

    @Test
    public void testUserErrorEmail () throws Exception {
        User user = new User();
        user.setUsername("test2");
        when(userService.userExists("test2")).thenReturn(false);
        when(userService.saveUser(user)).thenThrow(new IllegalArgumentException("Invalid Email"));

        mockMvc.perform(post("/api/user/save")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk()).andExpect(content().string("Error-Email"));
    }

    @Test
    public void testChangeEmailError () throws Exception {
        mockMvc.perform(put("/api/user/changeEmail/1/invalid-email"))
                .andExpect(status().isOk())
                .andExpect(content().string("Error"));
    }

    @Test
    public void testChangeEmailSuccess () throws Exception {
        mockMvc.perform(put("/api/user/changeEmail/1/good-email@hotmail.com"))
                .andExpect(status().isOk())
                .andExpect(content().string("Updated"));
    }

    @Test
    public void testBookingSuccess () throws Exception {
        long userId = 1L;
        long festivalId = 2L;
        User testUser = new User();
        Festival testFestival = new Festival();

        when(userService.findUserById(userId)).thenReturn(testUser);
        when(festivalService.findFestivalById(festivalId)).thenReturn(testFestival);
        when(festivalService.saveBooking(new Booking(testUser, testFestival))).thenReturn("Booking saved");

        mockMvc.perform(post("/api/booking/{festivalId}/{userId}",festivalId, userId))
                .andExpect(status().isOk())
                .andExpect(content().string("Booking saved"));
    }

    @Test
    public void testBookingUserNull () throws Exception {
        long userId = 1L;
        long festivalId = 2L;
        Festival testFestival = new Festival();

        when(userService.findUserById(userId)).thenReturn(null);
        when(festivalService.findFestivalById(festivalId)).thenReturn(testFestival);

        mockMvc.perform(post("/api/booking/{festivalId}/{userId}", festivalId, userId))
                .andExpect(status().isOk())
                .andExpect(content().string("Null-User"));
    }

    @Test
    public void testBookingFestivalNull () throws Exception {
        long userId = 1L;
        long festivalId = 2L;
        User testUser = new User();

        when(userService.findUserById(userId)).thenReturn(testUser);
        when(festivalService.findFestivalById(festivalId)).thenReturn(null);

        mockMvc.perform(post("/api/booking/{festivalId}/{userId}", festivalId, userId))
                .andExpect(status().isOk())
                .andExpect(content().string("Null-Festival"));
    }

    @Test
    public void testBookingFestivalFull () throws Exception {
        long userId = 1L;
        long festivalId = 2L;
        User testUser = new User();
        Festival testFestival = new Festival();

        when(userService.findUserById(userId)).thenReturn(testUser);
        when(festivalService.findFestivalById(festivalId)).thenReturn(testFestival);
        testFestival.setTicketsLeft(0);

        when(festivalService.saveBooking(new Booking(testUser, testFestival))).thenReturn("No tickets left");

        mockMvc.perform(post("/api/booking/{festivalId}/{userId}", festivalId, userId))
                .andExpect(status().isOk())
                .andExpect(content().string("No tickets left"));
    }

    @Test
    public void testArtistSaved () throws Exception {
        Artist artist = new Artist();
        artist.setArtist_name("Test Artist");

        when(festivalService.artistExists("Test Artist")).thenReturn(false);

        mockMvc.perform(post("/api/artist/save")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(artist)))
                .andExpect(status().isOk())
                .andExpect(content().string("Artist-Saved"));
    }

    @Test
    public void testArtistAlreadyExists () throws Exception {
        Artist artist = new Artist();
        artist.setArtist_name("Test Artist");

        when(festivalService.artistExists("Test Artist")).thenReturn(true);

        mockMvc.perform(post("/api/artist/save")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(artist)))
                .andExpect(status().isOk())
                .andExpect(content().string("Artist-Exists"));
    }

    @Test
    public void testAdminSuccess () throws Exception {
        Admin admin = new Admin();
        admin.setUsername("adminUser");
        admin.setEmail(new Email("test@hotmail.com"));

        when(userService.saveAdmin(admin)).thenReturn("Success");

        mockMvc.perform(post("/api/admin/save")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(admin)))
                .andExpect(status().isOk())
                .andExpect(content().string("Success"));
    }

    @Test
    public void testAdminErrorEmail () throws Exception {
        Admin admin = new Admin();
        admin.setUsername("adminUser");

        when(userService.saveAdmin(admin)).thenThrow(new IllegalArgumentException("Invalid Email"));

        mockMvc.perform(post("/api/admin/save")
                        .contentType("application/json")
                        .content(objectMapper.writeValueAsString(admin)))
                .andExpect(status().isOk())
                .andExpect(content().string("Error-Email"));
    }
}
