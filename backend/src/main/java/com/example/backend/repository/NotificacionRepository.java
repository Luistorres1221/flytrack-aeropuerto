package com.example.backend.repository;

import com.example.backend.models.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {
    List<Notificacion> findByPasajeroId(Long pasajeroId);
    List<Notificacion> findByEstado(Notificacion.EstadoNotificacion estado);
    List<Notificacion> findByTipo(Notificacion.TipoNotificacion tipo);
    List<Notificacion> findByPasajeroIdAndEstado(Long pasajeroId, Notificacion.EstadoNotificacion estado);
}