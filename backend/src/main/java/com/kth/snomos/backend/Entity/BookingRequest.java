package com.kth.snomos.backend.Entity;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {
    private Long userId;
    private Long festivalId;
}
