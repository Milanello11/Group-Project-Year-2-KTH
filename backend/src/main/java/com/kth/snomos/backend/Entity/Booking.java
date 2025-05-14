package com.kth.snomos.backend.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Booking")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BOOKING_ID")
    private Long bookingId;

    @ManyToOne
    @JoinColumn(name = "USERID", nullable = false)
    @JsonBackReference (value = "booking-user")
    private User user;

    @ManyToOne
    @JoinColumn(name = "FESTIVALID", nullable = false)
    @JsonBackReference(value = "booking-festival")
    private Festival festival;

    public Booking(User user, Festival festival) {
        this.user = user;
        this.festival = festival;
    }
}
