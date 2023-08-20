package com.maps.location.repository;

import com.maps.location.model.GeoLocation;
import com.maps.location.model.GeoLocationId;
import org.locationtech.jts.geom.Point;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeoLocationRepository extends JpaRepository<GeoLocation, GeoLocationId> {

    @Query(value="SELECT * from geolocation where ST_DistanceSphere(geolocation.geo, :p) < :distance", nativeQuery = true)
    List<GeoLocation> findNearWithinDistance(Point p, double distance);

    @Query(value="SELECT * from geolocation join business on geolocation.business_id = business.id where business.type = :type", nativeQuery = true)
    List<GeoLocation> findLocationsWithType(String type);

    @Query(value="SELECT * from geolocation join business on geolocation.business_id = business.id where business.type = :type AND ST_DistanceSphere(geolocation.geo, :p) < :distance", nativeQuery = true)
    List<GeoLocation> findLocationsWithTypeWithinDistance(Point p, String type, double distance);

    @Query(value="SELECT * from geolocation join business on geolocation.business_id = business.id where business.name ILIKE %:text% OR business.address ILIKE %:text%", nativeQuery = true)
    List<GeoLocation> findLocationsWithText(String text);
}
