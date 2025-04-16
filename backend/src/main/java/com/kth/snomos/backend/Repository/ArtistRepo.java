package com.kth.snomos.backend.Repository;

import com.kth.snomos.backend.Entity.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepo extends JpaRepository<Artist, String> {

}
