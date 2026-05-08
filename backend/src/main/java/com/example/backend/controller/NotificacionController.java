package com.example.backend.controller;

import com.example.backend.models.Notificacion;
import com.example.backend.services.NotificacionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notificaciones")
@CrossOrigin(origins = "*")
@Tag(name = "Notificaciones", description = "Gestión de notificaciones del aeropuerto")
public class NotificacionController {

    @Autowired
    private NotificacionService notificacionService;

    @GetMapping
    @Operation(summary = "Obtener todas las notificaciones", description = "Retorna una lista de todas las notificaciones registradas")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de notificaciones obtenida exitosamente")
    })
    public ResponseEntity<List<Notificacion>> getAllNotificaciones() {
        List<Notificacion> notificaciones = notificacionService.getAllNotificaciones();
        return ResponseEntity.ok(notificaciones);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener notificación por ID", description = "Retorna una notificación específica por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Notificación encontrada"),
            @ApiResponse(responseCode = "404", description = "Notificación no encontrada")
    })
    public ResponseEntity<Notificacion> getNotificacionById(
            @Parameter(description = "ID de la notificación") @PathVariable Long id) {
        return notificacionService.getNotificacionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Crear nueva notificación", description = "Registra una nueva notificación en el sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Notificación creada exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "404", description = "Pasajero no encontrado")
    })
    public ResponseEntity<Notificacion> createNotificacion(
            @Valid @RequestBody Notificacion notificacion) {
        Notificacion createdNotificacion = notificacionService.createNotificacion(notificacion);
        return ResponseEntity.ok(createdNotificacion);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar notificación", description = "Actualiza la información de una notificación existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Notificación actualizada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Notificación o pasajero no encontrado")
    })
    public ResponseEntity<Notificacion> updateNotificacion(
            @Parameter(description = "ID de la notificación") @PathVariable Long id,
            @Valid @RequestBody Notificacion notificacionDetails) {
        try {
            Notificacion updatedNotificacion = notificacionService.updateNotificacion(id, notificacionDetails);
            return ResponseEntity.ok(updatedNotificacion);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar notificación", description = "Elimina una notificación del sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Notificación eliminada exitosamente"),
            @ApiResponse(responseCode = "404", description = "Notificación no encontrada")
    })
    public ResponseEntity<Void> deleteNotificacion(
            @Parameter(description = "ID de la notificación") @PathVariable Long id) {
        try {
            notificacionService.deleteNotificacion(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/pasajero/{pasajeroId}")
    @Operation(summary = "Obtener notificaciones por pasajero", description = "Retorna todas las notificaciones de un pasajero específico")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de notificaciones obtenida exitosamente")
    })
    public ResponseEntity<List<Notificacion>> getNotificacionesByPasajero(
            @Parameter(description = "ID del pasajero") @PathVariable Long pasajeroId) {
        List<Notificacion> notificaciones = notificacionService.findByPasajeroId(pasajeroId);
        return ResponseEntity.ok(notificaciones);
    }

    @GetMapping("/estado/{estado}")
    @Operation(summary = "Buscar notificaciones por estado", description = "Encuentra notificaciones filtradas por su estado actual")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de notificaciones encontrada")
    })
    public ResponseEntity<List<Notificacion>> getNotificacionesByEstado(
            @Parameter(description = "Estado de la notificación") @PathVariable Notificacion.EstadoNotificacion estado) {
        List<Notificacion> notificaciones = notificacionService.findByEstado(estado);
        return ResponseEntity.ok(notificaciones);
    }

    @GetMapping("/tipo/{tipo}")
    @Operation(summary = "Buscar notificaciones por tipo", description = "Encuentra notificaciones filtradas por su tipo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de notificaciones encontrada")
    })
    public ResponseEntity<List<Notificacion>> getNotificacionesByTipo(
            @Parameter(description = "Tipo de notificación") @PathVariable Notificacion.TipoNotificacion tipo) {
        List<Notificacion> notificaciones = notificacionService.findByTipo(tipo);
        return ResponseEntity.ok(notificaciones);
    }

    @GetMapping("/pasajero/{pasajeroId}/estado/{estado}")
    @Operation(summary = "Buscar notificaciones por pasajero y estado", description = "Encuentra notificaciones de un pasajero filtradas por estado")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de notificaciones encontrada")
    })
    public ResponseEntity<List<Notificacion>> getNotificacionesByPasajeroAndEstado(
            @Parameter(description = "ID del pasajero") @PathVariable Long pasajeroId,
            @Parameter(description = "Estado de la notificación") @PathVariable Notificacion.EstadoNotificacion estado) {
        List<Notificacion> notificaciones = notificacionService.findByPasajeroIdAndEstado(pasajeroId, estado);
        return ResponseEntity.ok(notificaciones);
    }

    @PutMapping("/{id}/marcar-leida")
    @Operation(summary = "Marcar notificación como leída", description = "Cambia el estado de una notificación a 'LEIDA'")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Notificación marcada como leída"),
            @ApiResponse(responseCode = "404", description = "Notificación no encontrada")
    })
    public ResponseEntity<Void> marcarNotificacionComoLeida(
            @Parameter(description = "ID de la notificación") @PathVariable Long id) {
        try {
            notificacionService.marcarComoLeida(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}