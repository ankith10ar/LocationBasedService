package com.maps.location.service;

import com.maps.location.model.Business;
import com.maps.location.model.GeoLocation;
import com.maps.location.repository.BusinessRepository;
import com.maps.location.repository.GeoLocationRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GeoLocationService {

    @Autowired
    private BusinessRepository businessRepository;

    @Autowired
    private GeoLocationRepository geoLocationRepository;

    public void fillGeoLocationData() {
        List<Business> businesses = businessRepository.findAll();
        GeometryFactory geometryFactory = new GeometryFactory();
        List<GeoLocation> geoLocations = businesses.stream()
                .map(business -> new GeoLocation(geometryFactory.createPoint(new Coordinate(business.getLatitude(), business.getLongitude())), business))
                .collect(Collectors.toList());
        geoLocationRepository.saveAllAndFlush(geoLocations);
    }

    public List<GeoLocation> findAll() {
        return geoLocationRepository.findAll();
    }


    public List<GeoLocation> findAround(double lat, double lon, double distance) {
        GeometryFactory geometryFactory = new GeometryFactory();
        Point point = geometryFactory.createPoint(new Coordinate(lat, lon));
        return geoLocationRepository.findNearWithinDistance(point, distance);
    }

    public List<GeoLocation> findWithType(String type) {
        return geoLocationRepository.findLocationsWithType(type);
    }

    public List<GeoLocation> findWithTypeAround(double lat, double lon, String type, double distance) {
        GeometryFactory geometryFactory = new GeometryFactory();
        Point point = geometryFactory.createPoint(new Coordinate(lat, lon));
        return geoLocationRepository.findLocationsWithTypeWithinDistance(point, type, distance);
    }

    public List<GeoLocation> findByText(String text) {
        return geoLocationRepository.findLocationsWithText(text);
    }
}
