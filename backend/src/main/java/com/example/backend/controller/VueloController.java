package com.example.backend.controller;

import com.example.backend.models.Vuelo;
import com.example.backend.services.VueloService;
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
@RequestMapping("/api/vuelos")
@Tag(name = "Vuelos", description = "Gestión de vuelos del aeropuerto")
public class VueloController {

    @Autowired
    private VueloService vueloService;

    @GetMapping
    @Operation(summary = "Obtener todos los vuelos", description = "Retorna una lista de todos los vuelos registrados")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de vuelos obtenida exitosamente")
    })
    public ResponseEntity<List<Vuelo>> getAllVuelos() {
        List<Vuelo> vuelos = vueloService.getAllVuelos();
        return ResponseEntity.ok(vuelos);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener vuelo por ID", description = "Retorna un vuelo específico por su ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vuelo encontrado"),
            @ApiResponse(responseCode = "404", description = "Vuelo no encontrado")
    })
    public ResponseEntity<Vuelo> getVueloById(
            @Parameter(description = "ID del vuelo") @PathVariable Long id) {
        return vueloService.getVueloById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Operation(summary = "Crear nuevo vuelo", description = "Registra un nuevo vuelo en el sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vuelo creado exitosamente"),
            @ApiResponse(responseCode = "400", description = "Datos inválidos"),
            @ApiResponse(responseCode = "409", description = "Ya existe un vuelo con ese código")
    })
    public ResponseEntity<Vuelo> createVuelo(
            @Valid @RequestBody Vuelo vuelo) {
        Vuelo createdVuelo = vueloService.createVuelo(vuelo);
        return ResponseEntity.ok(createdVuelo);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar vuelo", description = "Actualiza la información de un vuelo existente")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vuelo actualizado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Vuelo no encontrado"),
            @ApiResponse(responseCode = "409", description = "Ya existe otro vuelo con ese código")
    })
    public ResponseEntity<Vuelo> updateVuelo(
            @Parameter(description = "ID del vuelo") @PathVariable Long id,
            @Valid @RequestBody Vuelo vueloDetails) {
        try {
            Vuelo updatedVuelo = vueloService.updateVuelo(id, vueloDetails);
            return ResponseEntity.ok(updatedVuelo);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar vuelo", description = "Elimina un vuelo del sistema")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Vuelo eliminado exitosamente"),
            @ApiResponse(responseCode = "404", description = "Vuelo no encontrado")
    })
    public ResponseEntity<Void> deleteVuelo(
            @Parameter(description = "ID del vuelo") @PathVariable Long id) {
        try {
            vueloService.deleteVuelo(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/codigo/{codigoVuelo}")
    @Operation(summary = "Buscar vuelo por código", description = "Encuentra un vuelo usando su código de vuelo")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Vuelo encontrado"),
            @ApiResponse(responseCode = "404", description = "Vuelo no encontrado")
    })
    public ResponseEntity<Vuelo> getVueloByCodigo(
            @Parameter(description = "Código del vuelo") @PathVariable String codigoVuelo) {
        return vueloService.findByCodigoVuelo(codigoVuelo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    @Operation(summary = "Buscar vuelos por ruta", description = "Encuentra vuelos disponibles entre origen y destino")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de vuelos encontrados")
    })
    public ResponseEntity<List<Vuelo>> buscarVuelos(
            @Parameter(description = "Ciudad de origen") @RequestParam String origen,
            @Parameter(description = "Ciudad de destino") @RequestParam String destino) {
        List<Vuelo> vuelos = vueloService.findByOrigenAndDestino(origen, destino);
        return ResponseEntity.ok(vuelos);
    }

    @GetMapping("/estado/{estado}")
    @Operation(summary = "Buscar vuelos por estado", description = "Encuentra vuelos filtrados por su estado actual")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Lista de vuelos encontrados")
    })
    public ResponseEntity<List<Vuelo>> getVuelosByEstado(
            @Parameter(description = "Estado del vuelo") @PathVariable Vuelo.EstadoVuelo estado) {
        List<Vuelo> vuelos = vueloService.findByEstado(estado);
        return ResponseEntity.ok(vuelos);
    }
}