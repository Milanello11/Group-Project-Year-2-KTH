package com.kth.snomos.backend.Repository;

import com.kth.snomos.backend.Entity.Festival;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FestivalRepo extends JpaRepository<Festival, Long> {
}
