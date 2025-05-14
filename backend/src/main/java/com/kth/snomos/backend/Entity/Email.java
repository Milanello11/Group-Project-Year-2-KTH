package com.kth.snomos.backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Email {

    private static final String pattern = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$";

    @Column(name = "email")
    private String email;

    protected Email() {}

    public Email(String email) {
        if (email == null || !email.matches(pattern)) {
            throw new IllegalArgumentException("Invalid email" + email);
        }
        this.email = email.toLowerCase();
    }

    public String getEmail() {
        return email;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof Email)) {
            return false;
        }
        Email other = (Email) obj;
        return email.equals(other.email);
    }
}