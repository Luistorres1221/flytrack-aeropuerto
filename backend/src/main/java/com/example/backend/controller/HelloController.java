package com.example.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@Tag(name = "General", description = "Endpoints generales de la API")
public class HelloController {

    @GetMapping("/hello")
    @Operation(summary = "Saludo de bienvenida", description = "Retorna un mensaje de bienvenida de la API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Mensaje de bienvenida retornado exitosamente")
    })
    public String hello() {
        return "Hola desde el backend Spring Boot";
    }
}
