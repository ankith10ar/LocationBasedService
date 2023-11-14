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
public class GeoLocation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long geoId;

    @Column(columnDefinition = "geometry(Point, 4326)")
    private Point geo;

    @OneToOne(optional = false, fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "business_id", referencedColumnName = "id", nullable = false, unique = true)
    private Business business;

    public GeoLocation(Point point, Business business) {
        this.geo = point;
        this.business = business;
    }

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
