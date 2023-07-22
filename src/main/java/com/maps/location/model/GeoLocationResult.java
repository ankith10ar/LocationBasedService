package com.maps.location.model;

import lombok.Getter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Getter
public class GeoLocationResult {

    private final int total;
    private final List<GeoLocation> geoLocations;

    public GeoLocationResult(List<GeoLocation> geoLocations) {
        this.total = geoLocations.size();
        this.geoLocations = geoLocations;
    }
}
