package com.kth.snomos.backend.Entity;


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
    private String name;

    private int age;
}
