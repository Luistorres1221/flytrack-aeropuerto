package com.example.backend.repository;

import com.example.backend.models.Equipaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EquipajeRepository extends JpaRepository<Equipaje, Long> {
    Optional<Equipaje> findByCodigoEquipaje(String codigoEquipaje);
    List<Equipaje> findByPasajeroId(Long pasajeroId);
    List<Equipaje> findByVueloId(Long vueloId);
    List<Equipaje> findByEstado(Equipaje.EstadoEquipaje estado);
    boolean existsByCodigoEquipaje(String codigoEquipaje);
}