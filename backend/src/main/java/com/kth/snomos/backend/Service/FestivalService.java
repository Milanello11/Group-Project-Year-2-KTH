package com.kth.snomos.backend.Service;

import com.kth.snomos.backend.Entity.Booking;
import com.kth.snomos.backend.Entity.Festival;
import com.kth.snomos.backend.Repository.ArtistRepo;
import com.kth.snomos.backend.Repository.BookingRepo;
import com.kth.snomos.backend.Repository.FestivalRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class FestivalService {

    @Autowired
    private FestivalRepo festivalRepo;
    @Autowired
    private BookingRepo bookingRepo;
    @Autowired
    private ArtistRepo artistRepo;

    public List<Festival> findAll() {
        return festivalRepo.findAll();
    }

    public void save(Festival festival) {
        festivalRepo.save(festival);
    }

    public Festival findFestivalById(Long id) {
        return festivalRepo.findById(id).orElseThrow();
    }

    public void saveBooking (Booking booking) {
        bookingRepo.save(booking);
    }

    public List<Festival> getTenUpcomingFestivals() {
        return festivalRepo.getTenUpComingFestivals();
    }

    public Festival findFestivalByDateAndName(LocalDate date, String name) {
        return festivalRepo.findFestivalByDateAndName(date, name);
    }
}
