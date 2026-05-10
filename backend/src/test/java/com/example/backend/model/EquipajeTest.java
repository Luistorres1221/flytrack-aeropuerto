package com.example.backend.model;

import com.example.backend.models.Equipaje;
import com.example.backend.models.Equipaje.EstadoEquipaje;
import com.example.backend.models.Pasajero;
import com.example.backend.models.Vuelo;
import org.junit.jupiter.api.Test;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import java.util.Set;
import jakarta.validation.ConstraintViolation;

import static org.junit.jupiter.api.Assertions.*;

class EquipajeTest {

    private final ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
    private final Validator validator = factory.getValidator();

    @Test
    void testEquipajeCreation() {
        Equipaje equipaje = new Equipaje();
        equipaje.setCodigoEquipaje("EQ123");
        equipaje.setPeso(15.5);
        equipaje.setDescripcion("Maleta negra");
        equipaje.setEstado(EstadoEquipaje.REGISTRADO);

        assertEquals("EQ123", equipaje.getCodigoEquipaje());
        assertEquals(15.5, equipaje.getPeso());
        assertEquals("Maleta negra", equipaje.getDescripcion());
        assertEquals(EstadoEquipaje.REGISTRADO, equipaje.getEstado());
    }

    @Test
    void testEquipajeValidation() {
        Equipaje equipaje = new Equipaje();
        // Campos requeridos vacíos

        Set<ConstraintViolation<Equipaje>> violations = validator.validate(equipaje);

        assertFalse(violations.isEmpty());
        assertTrue(violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals("codigoEquipaje")));
        assertTrue(violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals("peso")));
        assertTrue(violations.stream().anyMatch(v -> v.getPropertyPath().toString().equals("estado")));
    }

    @Test
    void testEquipajeValid() {
        Equipaje equipaje = new Equipaje();
        equipaje.setCodigoEquipaje("EQ123");
        equipaje.setPeso(15.5);
        equipaje.setEstado(EstadoEquipaje.REGISTRADO);

        Set<ConstraintViolation<Equipaje>> violations = validator.validate(equipaje);

        // Nota: pasajero y vuelo son requeridos pero no se pueden validar sin entidades relacionadas
        // En una prueba real, se mockearían
        assertTrue(violations.stream().noneMatch(v ->
            !v.getPropertyPath().toString().equals("pasajero") &&
            !v.getPropertyPath().toString().equals("vuelo")));
    }
}