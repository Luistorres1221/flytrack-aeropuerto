package com.example.backend.repository;

import com.example.backend.models.Pasajero;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PasajeroRepository extends JpaRepository<Pasajero, Long> {
    Optional<Pasajero> findByEmail(String email);
    Optional<Pasajero> findByNumeroPasaporte(String numeroPasaporte);
    boolean existsByEmail(String email);
    boolean existsByNumeroPasaporte(String numeroPasaporte);
}