package com.kth.snomos.backend.Entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "Festival")
@NoArgsConstructor
@AllArgsConstructor
public class Festival {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long festivalId;

    private String festivalName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate festivalDate;

    private String festivalLocation;

    private int ticketsLeft;
}
