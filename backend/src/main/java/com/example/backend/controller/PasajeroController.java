package com.example.backend.controller;

import com.example.backend.models.Pasajero;
import com.example.backend.services.PasajeroService;
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
@RequestMapping("/api/pasajeros")
@CrossOrigin(origins = "*")
@Tag(name = "Pasajeros", description = "Gestión de pasajeros del aeropuerto")
public class PasajeroController {

    @Autowired
    private PasajeroService pasajeroService;

    @GetMapping
    @Operation(summary = "Obtener todos los pasajeros", description = "Retorna una lista de todos los pasajeros registrados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de pasajeros obtenida exitosamente")
    })
    public ResponseEntity<List<Pasajero>> getAllPasajeros() {
        List<Pasajero> pasajeros = pasajeroService.getAllPasajeros();
        return ResponseEntity.ok(pasajeros);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener pasajero por ID", description = "Retorna un pasajero específico por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pasajero encontrado"),
            @ApiResponse(responseCode = "404", description = "Pasajero no encontrado")
    })
    public ResponseEntity<Pasajero> getPasajeroById(
            @Parameter(description = "ID del pasajero") @PathVariable Long id) {
        return pasajeroService.getPasajeroById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Crear nuevo pasajero", description = "Registra un nuevo pasajero en el sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pasajero creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "409", description = "Ya existe un pasajero con ese email o pasaporte")
    })
    public ResponseEntity<Pasajero> createPasajero(
            @Valid @RequestBody Pasajero pasajero) {
        Pasajero createdPasajero = pasajeroService.createPasajero(pasajero);
        return ResponseEntity.ok(createdPasajero);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar pasajero", description = "Actualiza la información de un pasajero existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pasajero actualizado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Pasajero no encontrado"),
            @ApiResponse(responseCode = "409", description = "Ya existe otro pasajero con ese email o pasaporte")
    })
    public ResponseEntity<Pasajero> updatePasajero(
            @Parameter(description = "ID del pasajero") @PathVariable Long id,
            @Valid @RequestBody Pasajero pasajeroDetails) {
        try {
            Pasajero updatedPasajero = pasajeroService.updatePasajero(id, pasajeroDetails);
            return ResponseEntity.ok(updatedPasajero);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar pasajero", description = "Elimina un pasajero del sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Pasajero eliminado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Pasajero no encontrado")
    })
    public ResponseEntity<Void> deletePasajero(
            @Parameter(description = "ID del pasajero") @PathVariable Long id) {
        try {
            pasajeroService.deletePasajero(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/email/{email}")
    @Operation(summary = "Buscar pasajero por email", description = "Encuentra un pasajero usando su dirección de email")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pasajero encontrado"),
            @ApiResponse(responseCode = "404", description = "Pasajero no encontrado")
    })
    public ResponseEntity<Pasajero> getPasajeroByEmail(
            @Parameter(description = "Email del pasajero") @PathVariable String email) {
        return pasajeroService.findByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/pasaporte/{numeroPasaporte}")
    @Operation(summary = "Buscar pasajero por pasaporte", description = "Encuentra un pasajero usando su número de pasaporte")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Pasajero encontrado"),
            @ApiResponse(responseCode = "404", description = "Pasajero no encontrado")
    })
    public ResponseEntity<Pasajero> getPasajeroByNumeroPasaporte(
            @Parameter(description = "Número de pasaporte del pasajero") @PathVariable String numeroPasaporte) {
        return pasajeroService.findByNumeroPasaporte(numeroPasaporte)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}