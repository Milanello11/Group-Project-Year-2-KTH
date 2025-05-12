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
        return festivalRepo.getAllUpcomingFestivals();
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

    public List<Artist> findAllArtists(){
        return artistRepo.findAll();
    }

    public Festival findFestivalById(Long id) {
        return festivalRepo.findById(id).orElseThrow();
    }


    public Artist findArtistByName(String name) {
        return artistRepo.existsByNameLike(name) ? artistRepo.findArtistByName(name) : null;
    }

    public boolean artistExists(String name) {
        return artistRepo.existsByName(name);
    }

    public void saveFestival(Festival festival) {
        festivalRepo.save(festival);
    }

    public void saveArtist(Artist artist) {
        artistRepo.save(artist);
    }

    public void addArtistsToFestival(long festivalId, List<Artist> artistList) {
        Festival festival = festivalRepo.findById(festivalId).orElseThrow();
        for (Artist specificArtist : artistList) {
            Artist currentArtist = artistRepo.findById(specificArtist.getArtist_name()).orElseThrow();
            festival.getArtists().add(currentArtist);
            currentArtist.getFestivals().add(festival);
            festivalRepo.save(festival);
        }
    }

    @Transactional
    public void deleteFestival(long festivalId) {
        festivalRepo.deleteById(festivalId);
    }

    @Transactional
    public void deleteArtist(String artistName) {
        artistRepo.deleteArtistByName(artistName);
    }

    @Transactional
    public void updateFestivalDescription(Long festivalId, String description) {
        festivalRepo.updateFestivalDescription(festivalId, description);
    }

    @Transactional
    public void updateFestivalURL(Long festivalId, String url) {
        festivalRepo.updateFestivalURL(festivalId, url);
    }

    @Transactional
    public void updateArtistAge(String ArtistName, int age){
        artistRepo.updateArtistAge(ArtistName, age);
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
