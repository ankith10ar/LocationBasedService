package com.maps.location.model;

import lombok.*;
import org.locationtech.jts.geom.Point;

import java.io.Serializable;

@AllArgsConstructor
@EqualsAndHashCode
@NoArgsConstructor
@Setter
@Getter
public class GeoLocationId implements Serializable {

    private Point geo;
    private Business business;

}
