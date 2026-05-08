package com.example.backend.services;

import com.example.backend.models.Notificacion;
import com.example.backend.models.Pasajero;
import com.example.backend.repository.NotificacionRepository;
import com.example.backend.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class NotificacionService {

    @Autowired
    private NotificacionRepository notificacionRepository;

    @Autowired
    private PasajeroService pasajeroService;

    public List<Notificacion> getAllNotificaciones() {
        return notificacionRepository.findAll();
    }

    public Optional<Notificacion> getNotificacionById(Long id) {
        return notificacionRepository.findById(id);
    }

    public Notificacion createNotificacion(Notificacion notificacion) {
        // Verificar que pasajero existe
        pasajeroService.getPasajeroById(notificacion.getPasajero().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Pasajero no encontrado"));

        return notificacionRepository.save(notificacion);
    }

    public Notificacion updateNotificacion(Long id, Notificacion notificacionDetails) {
        Notificacion notificacion = notificacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notificación no encontrada con id: " + id));

        // Verificar que pasajero existe
        pasajeroService.getPasajeroById(notificacionDetails.getPasajero().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Pasajero no encontrado"));

        notificacion.setTitulo(notificacionDetails.getTitulo());
        notificacion.setMensaje(notificacionDetails.getMensaje());
        notificacion.setPasajero(notificacionDetails.getPasajero());
        notificacion.setTipo(notificacionDetails.getTipo());
        notificacion.setEstado(notificacionDetails.getEstado());

        return notificacionRepository.save(notificacion);
    }

    public void deleteNotificacion(Long id) {
        if (!notificacionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Notificación no encontrada con id: " + id);
        }
        notificacionRepository.deleteById(id);
    }

    public List<Notificacion> findByPasajeroId(Long pasajeroId) {
        return notificacionRepository.findByPasajeroId(pasajeroId);
    }

    public List<Notificacion> findByEstado(Notificacion.EstadoNotificacion estado) {
        return notificacionRepository.findByEstado(estado);
    }

    public List<Notificacion> findByTipo(Notificacion.TipoNotificacion tipo) {
        return notificacionRepository.findByTipo(tipo);
    }

    public List<Notificacion> findByPasajeroIdAndEstado(Long pasajeroId, Notificacion.EstadoNotificacion estado) {
        return notificacionRepository.findByPasajeroIdAndEstado(pasajeroId, estado);
    }

    public void marcarComoLeida(Long id) {
        Notificacion notificacion = notificacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Notificación no encontrada con id: " + id));
        notificacion.setEstado(Notificacion.EstadoNotificacion.LEIDA);
        notificacionRepository.save(notificacion);
    }
}