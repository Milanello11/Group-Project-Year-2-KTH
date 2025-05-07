package com.kth.snomos.backend.Service;

import com.kth.snomos.backend.Entity.Artist;
import com.kth.snomos.backend.Entity.Booking;
import com.kth.snomos.backend.Entity.Festival;
import com.kth.snomos.backend.Repository.ArtistRepo;
import com.kth.snomos.backend.Repository.BookingRepo;
import com.kth.snomos.backend.Repository.FestivalRepo;
import jakarta.transaction.Transactional;
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

    public List<Festival> findAllFestivals() {
        return festivalRepo.findAll();
    }

    public List<Festival> findFestivalByName(String name) {
        return festivalRepo.findFestivalByName(name);
    }

    public List<Festival> findFestivalByDate(LocalDate date) {
        return festivalRepo.findFestivalByDate(date);
    }

    public List<Festival> findFestivalByLocation(String location) {
        return festivalRepo.findFestivalByLocation(location);
    }

    public List<Festival> findFestivalByArtist(String artist) {
        return festivalRepo.findFestivalByArtist(artist);
    }

    public List<Festival> getUpcomingFestivals() {
        return festivalRepo.getUpComingFestivals();
    }

    public Festival findFestivalById(Long id) {
        return festivalRepo.findById(id).orElseThrow();
    }

    public Festival findFestivalByDateAndName(LocalDate date, String name) {
        return festivalRepo.findFestivalByDateAndName(date, name);
    }

    public List<String> getArtistsFromFestival(Long festivalId) {
        return artistRepo.getAllArtistsFromFestival(festivalId);
    }

    public void saveFestival(Festival festival) {
        festivalRepo.save(festival);
    }

    public void saveArtist(Artist artist) {
        artistRepo.save(artist);
    }

    public void deleteFestival(long festivalId) {
        festivalRepo.deleteById(festivalId);
    }

    public void deleteArtist(String artistName) {
        artistRepo.deleteById(artistName);
    }

    public void addArtistToFestival(String artistName, String festivalName, LocalDate festivalDate) {
        Festival festival = festivalRepo.findFestivalByDateAndName(festivalDate, festivalName);
        Artist artist = artistRepo.findById(artistName).orElseThrow();

        festival.getArtists().add(artist);
        artist.getFestivals().add(festival);
        festivalRepo.save(festival);
    }

    @Transactional
    public void updateFestivalDescription(Long festivalId, String description) {
        festivalRepo.updateFestivalDescription(festivalId, description);
    }

    @Transactional
    public void updateFestivalURL(Long festivalId, String url) {
        festivalRepo.updateFestivalURL(festivalId, url);
    }

    public String saveBooking (Booking booking) {
        if (booking.getFestival().getTicketsLeft() <= 0) {
            return "No tickets left";
        }
        booking.getFestival().setTicketsLeft(booking.getFestival().getTicketsLeft() - 1);
        saveFestival(booking.getFestival());
        bookingRepo.save(booking);
        return "Booking saved";
    }
}
