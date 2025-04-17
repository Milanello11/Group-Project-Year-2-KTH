package com.kth.snomos.backend.Entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Table(name = "Artist")
@NoArgsConstructor
@AllArgsConstructor
public class Artist {

    @Id
    private String artist_name;

    private int age;

    @ManyToMany(mappedBy = "artists")
    @JsonIgnore
    private List<Festival> festivals;
}
