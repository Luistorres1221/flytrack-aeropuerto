package com.example.backend.model;

import com.example.backend.models.Aerolinea;
import com.example.backend.models.Vuelo;
import com.example.backend.models.Vuelo.EstadoVuelo;
import org.junit.jupiter.api.Test;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import java.time.LocalDateTime;
import java.util.Set;
import jakarta.validation.ConstraintViolation;

import static org.junit.jupiter.api.Assertions.*;

class VueloTest {

    private final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    private final Validator validator = factory.getValidator();

    @Test
    void testVueloCreation() {
        Vuelo vuelo = new Vuelo();
        vuelo.setCodigoVuelo("ABC123");
        vuelo.setOrigen("Madrid");
        vuelo.setDestino("Barcelona");
        vuelo.setFechaSalida(LocalDateTime.now());
        vuelo.setFechaLlegada(LocalDateTime.now().plusHours(2));
        vuelo.setEstado(EstadoVuelo.PROGRAMADO);
        vuelo.setPuerta("A1");
        vuelo.setTerminal("T1");
        vuelo.setHoraAbordaje(LocalDateTime.now().plusMinutes(30));
        vuelo.setCapacidad(150);

        Aerolinea aerolinea = new Aerolinea();
        aerolinea.setId(1L);
        aerolinea.setNombre("Iberia");
        aerolinea.setCodigoIata("IB");
        aerolinea.setPais("España");
        vuelo.setAerolinea(aerolinea);

        assertEquals("ABC123", vuelo.getCodigoVuelo());
        assertEquals("Madrid", vuelo.getOrigen());
        assertEquals("Barcelona", vuelo.getDestino());
        assertEquals(EstadoVuelo.PROGRAMADO, vuelo.getEstado());
        assertEquals("A1", vuelo.getPuerta());
        assertEquals("T1", vuelo.getTerminal());
        assertEquals(aerolinea, vuelo.getAerolinea());
    }

    @Test
    void testVueloValidation() {
        Vuelo vuelo = new Vuelo();
        // Dejar campos requeridos vacíos para probar validaciones

        Set<ConstraintViolation<Vuelo>> violations = validator.validate(vuelo);

        assertFalse(violations.isEmpty());
        // Verificar que hay violaciones para campos requeridos
        assertTrue(violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals("codigoVuelo")));
        assertTrue(violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals("origen")));
        assertTrue(violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals("destino")));
        assertTrue(violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals("estado")));
    }

    @Test
    void testVueloValid() {
        Vuelo vuelo = new Vuelo();
        vuelo.setCodigoVuelo("ABC123");
        vuelo.setOrigen("Madrid");
        vuelo.setDestino("Barcelona");
        vuelo.setFechaSalida(LocalDateTime.now());
        vuelo.setFechaLlegada(LocalDateTime.now().plusHours(2));
        vuelo.setEstado(EstadoVuelo.PROGRAMADO);
        vuelo.setPuerta("A1");
        vuelo.setTerminal("T1");
        vuelo.setHoraAbordaje(LocalDateTime.now().plusMinutes(30));
        vuelo.setCapacidad(150);

        Aerolinea aerolinea = new Aerolinea();
        aerolinea.setId(1L);
        aerolinea.setNombre("Iberia");
        aerolinea.setCodigoIata("IB");
        aerolinea.setPais("España");
        vuelo.setAerolinea(aerolinea);

        Set<ConstraintViolation<Vuelo>> violations = validator.validate(vuelo);

        assertTrue(violations.isEmpty());
    }
}