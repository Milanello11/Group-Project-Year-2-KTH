package com.kth.snomos.backend.Repository;

import com.kth.snomos.backend.Entity.Artist;
import com.kth.snomos.backend.Entity.Festival;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface FestivalRepo extends JpaRepository<Festival, Long> {
    @Query(value = "SELECT * FROM festival WHERE festival_date >= CURRENT_DATE ORDER BY festival_date LIMIT 9", nativeQuery = true)
    List<Festival> getUpComingFestivals();

    @Query(value = "SELECT * FROM festival where festival_date = :date AND festival_name = :name", nativeQuery = true)
    Festival findFestivalByDateAndName(@Param("date") LocalDate date,@Param("name") String name );

    @Query(value = "SELECT * FROM festival WHERE festival_name = :name", nativeQuery = true)
    List<Festival> findFestivalByName(@Param("name") String name);

    @Query(value = "SELECT * FROM festival WHERE festival_date = :date", nativeQuery = true)
    List<Festival> findFestivalByDate(@Param("date") LocalDate festival_date);

    @Query(value = "SELECT * FROM festival WHERE festival_location = :location", nativeQuery = true)
    List<Festival> findFestivalByLocation(@Param("location") String location);

    @Query(value = "SELECT f.* FROM festival f " +
            "JOIN artist_festival af ON f.festival_id = af.festival_id " +
            "JOIN artist a ON a.artist_name = af.artist_name " +
            "WHERE a.artist_name = :artist", nativeQuery = true)
    List<Festival> findFestivalByArtist(@Param("artist") String artist);

    @Query(value = "SELECT a.* FROM artist a JOIN artist_festival af on a.artist_name = af.artist_name " +
            "JOIN festival f on f.festival_id = af.festival_id WHERE f.festival_date = :date AND f.festival_name = :name", nativeQuery = true)
    List<Artist> findAllArtistInFestival(@Param("date") LocalDate date, @Param("name") String name);
}
