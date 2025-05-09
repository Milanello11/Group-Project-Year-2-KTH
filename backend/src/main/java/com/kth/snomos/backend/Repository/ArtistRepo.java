package com.kth.snomos.backend.Repository;

import com.kth.snomos.backend.Entity.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ArtistRepo extends JpaRepository<Artist, String> {
    @Query(value = "SELECT * FROM artist a JOIN artist_festival af ON a.artist_name = af.artist_name " +
            "WHERE af.festival_id = :festivalId", nativeQuery = true)
    List<Artist> getAllArtistsFromFestival(@Param("festivalId")long festivalId);
}
