package com.kth.snomos.backend;

import com.kth.snomos.backend.Entity.Email;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

public class EmailTest {

    @Test
    public void testValidEmail() {
        Email email = new Email("isse_a@hotmail.com");
        assertEquals("isse_a@hotmail.com", email.getEmail());
    }

    @Test
    public void testInvalidEmail() {
        assertThrows(IllegalArgumentException.class, () -> new Email("eliapa"));
        assertThrows(IllegalArgumentException.class, () -> new Email("johkarkth.com"));
        assertThrows(IllegalArgumentException.class, () -> new Email("masuch@kth"));
        assertThrows(IllegalArgumentException.class, () -> new Email(null));
    }

    @Test
    public void testUpperLowerCaseEmail() {
        Email email = new Email("isse_a@hotmail.com");
        Email email1 = new Email("Isse_A@Hotmail.com");
        assertEquals(email, email1);
    }
}