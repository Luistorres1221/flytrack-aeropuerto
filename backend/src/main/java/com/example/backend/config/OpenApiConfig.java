package com.example.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    /**
     * URL pública opcional (p. ej. https://tu-api.onrender.com). Si está vacía, Swagger usa el host actual.
     */
    @Value("${app.openapi.public-url:}")
    private String publicUrl;

    @Bean
    public OpenAPI customOpenAPI() {
        Server server = (publicUrl != null && !publicUrl.isBlank())
                ? new Server().url(publicUrl.replaceAll("/$", "")).description("Público")
                : new Server().url("/").description("Host actual");

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
                .servers(List.of(server));
    }
}