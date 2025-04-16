package com.kth.snomos.backend.Repository;

import com.kth.snomos.backend.Entity.Festival;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface FestivalRepo extends JpaRepository<Festival, Long> {
    @Query(value = "SELECT * FROM festival WHERE festival_date >= CURRENT_DATE ORDER BY festival_date LIMIT 10", nativeQuery = true)
    List<Festival> getTenUpComingFestivals();

    @Query(value = "SELECT * FROM festival where festival_date = ?1 AND festival_name = ?2", nativeQuery = true)
    Festival findFestivalByDateAndName(LocalDate festival_date, String festival_name);
}
