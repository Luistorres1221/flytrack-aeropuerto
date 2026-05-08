package com.example.backend.repository;

import com.example.backend.models.Vuelo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VueloRepository extends JpaRepository<Vuelo, Long> {
    Optional<Vuelo> findByCodigoVuelo(String codigoVuelo);
    List<Vuelo> findByOrigenAndDestino(String origen, String destino);
    List<Vuelo> findByEstado(Vuelo.EstadoVuelo estado);
    boolean existsByCodigoVuelo(String codigoVuelo);
}