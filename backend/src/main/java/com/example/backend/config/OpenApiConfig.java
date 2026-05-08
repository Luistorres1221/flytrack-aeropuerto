package com.example.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("FlyTrack API - Gestión de Aeropuerto")
                        .description("API REST para la gestión completa de operaciones de aeropuerto")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Equipo de Desarrollo FlyTrack")
                                .email("contact@flytrack.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("Servidor de desarrollo"),
                        new Server().url("https://api.flytrack.com").description("Servidor de producción")
                ));
    }
}