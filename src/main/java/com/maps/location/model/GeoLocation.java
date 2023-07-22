package com.maps.location.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.Hibernate;
import org.locationtech.jts.geom.Point;

import java.util.Objects;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
@AllArgsConstructor
@Entity(name = "geolocation")
@IdClass(GeoLocationId.class)
public class GeoLocation {

    @Id
    @Column(columnDefinition = "geometry(Point, 4326)")
    private Point geo;
    @Id
    @OneToOne(optional = false)
    @JoinColumn(name = "business_id", nullable = false)
    private Business business;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        GeoLocation that = (GeoLocation) o;
        return geo != null && Objects.equals(geo, that.geo);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
