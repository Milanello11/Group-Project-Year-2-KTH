package com.kth.snomos.backend.Repository;

import com.kth.snomos.backend.Entity.Festival;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface FestivalRepo extends JpaRepository<Festival, Long> {
    @Query(value = "SELECT * FROM festival WHERE festival_date >= CURRENT_DATE ORDER BY festival_date LIMIT 9", nativeQuery = true)
    List<Festival> getUpComingFestivals();

    @Query(value = "SELECT * FROM festival where festival_date = :val1 AND festival_name = :val2", nativeQuery = true)
    Festival findFestivalByDateAndName(@Param("val1") LocalDate date,@Param("val2") String name );

    @Query(value = "SELECT * FROM festival WHERE festival_name = :val", nativeQuery = true)
    List<Festival> findFestivalByName(@Param("val") String name);

    @Query(value = "SELECT * FROM festival WHERE festival_date = :val", nativeQuery = true)
    List<Festival> findFestivalByDate(@Param("val")LocalDate festival_date);

    @Query(value = "SELECT * FROM festival WHERE festival_location = :val", nativeQuery = true)
    List<Festival> findFestivalByLocation(@Param("val")String location);

}
