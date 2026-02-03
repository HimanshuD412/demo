package com.arogyam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.arogyam.entities.Login;

public interface LoginRepository extends JpaRepository<Login, String> {

    Login findByUsername(String username);
    
    void deleteByUsername(String username);
    
    void deleteByEmployee_Eid(String eid);


}
