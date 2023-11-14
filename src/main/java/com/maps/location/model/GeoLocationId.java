package com.maps.location.model;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.*;
import org.locationtech.jts.geom.Point;

import java.io.Serializable;

@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
@Setter
@Getter
//@Embeddable
public class GeoLocationId implements Serializable {

    private Point geo;
//    @OneToOne
//    @JoinColumn(name = "business_id")
    private Business business;

}
