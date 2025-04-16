package com.kth.snomos.backend.Repository;

import com.kth.snomos.backend.Entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepo extends JpaRepository<Booking, Long> {
}
