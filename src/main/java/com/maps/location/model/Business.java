package com.maps.location.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.Hibernate;

import java.util.Objects;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Business {

    @Id
    private Long id;
    private String name;
    private String address;
    @Enumerated(EnumType.STRING)
    private Type type;
    private String contact;
    private String email;
    private Double latitude;
    private Double longitude;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Business business = (Business) o;
        return id != null && Objects.equals(id, business.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
