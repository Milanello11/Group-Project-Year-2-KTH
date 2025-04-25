package com.kth.snomos.backend.Repository;

import com.kth.snomos.backend.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepo extends JpaRepository<Admin, Long> {

}
