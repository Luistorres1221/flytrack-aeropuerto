package com.example.backend.controller;

import com.example.backend.models.Notificacion;
import com.example.backend.services.NotificacionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notificaciones")
@CrossOrigin(origins = "*")
public class NotificacionController {

    @Autowired
    private NotificacionService notificacionService;

    @GetMapping
    public ResponseEntity<List<Notificacion>> getAllNotificaciones() {
        List<Notificacion> notificaciones = notificacionService.getAllNotificaciones();
        return ResponseEntity.ok(notificaciones);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Notificacion> getNotificacionById(@PathVariable Long id) {
        return notificacionService.getNotificacionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Notificacion> createNotificacion(@Valid @RequestBody Notificacion notificacion) {
        Notificacion createdNotificacion = notificacionService.createNotificacion(notificacion);
        return ResponseEntity.ok(createdNotificacion);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Notificacion> updateNotificacion(@PathVariable Long id, @Valid @RequestBody Notificacion notificacionDetails) {
        try {
            Notificacion updatedNotificacion = notificacionService.updateNotificacion(id, notificacionDetails);
            return ResponseEntity.ok(updatedNotificacion);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotificacion(@PathVariable Long id) {
        try {
            notificacionService.deleteNotificacion(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/pasajero/{pasajeroId}")
    public ResponseEntity<List<Notificacion>> getNotificacionesByPasajero(@PathVariable Long pasajeroId) {
        List<Notificacion> notificaciones = notificacionService.findByPasajeroId(pasajeroId);
        return ResponseEntity.ok(notificaciones);
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<List<Notificacion>> getNotificacionesByEstado(@PathVariable Notificacion.EstadoNotificacion estado) {
        List<Notificacion> notificaciones = notificacionService.findByEstado(estado);
        return ResponseEntity.ok(notificaciones);
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<Notificacion>> getNotificacionesByTipo(@PathVariable Notificacion.TipoNotificacion tipo) {
        List<Notificacion> notificaciones = notificacionService.findByTipo(tipo);
        return ResponseEntity.ok(notificaciones);
    }

    @GetMapping("/pasajero/{pasajeroId}/estado/{estado}")
    public ResponseEntity<List<Notificacion>> getNotificacionesByPasajeroAndEstado(
            @PathVariable Long pasajeroId,
            @PathVariable Notificacion.EstadoNotificacion estado) {
        List<Notificacion> notificaciones = notificacionService.findByPasajeroIdAndEstado(pasajeroId, estado);
        return ResponseEntity.ok(notificaciones);
    }

    @PutMapping("/{id}/marcar-leida")
    public ResponseEntity<Void> marcarNotificacionComoLeida(@PathVariable Long id) {
        try {
            notificacionService.marcarComoLeida(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}