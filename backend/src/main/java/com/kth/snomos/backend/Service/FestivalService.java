package com.kth.snomos.backend.Service;

import com.kth.snomos.backend.Entity.Festival;
import com.kth.snomos.backend.Repository.FestivalRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FestivalService {

    @Autowired
    private FestivalRepo festivalRepo;

    public List<Festival> findAll() {
        return festivalRepo.findAll();
    }

    public void save(Festival festival) {
        festivalRepo.save(festival);
    }
}
