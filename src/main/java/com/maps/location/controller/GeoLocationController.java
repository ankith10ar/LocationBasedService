package com.maps.location.controller;

import com.maps.location.model.GeoLocation;
import com.maps.location.model.GeoLocationResult;
import com.maps.location.service.GeoLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/geolocation")
public class GeoLocationController {

    @Autowired
    private GeoLocationService service;

    @GetMapping("get-all")
    public GeoLocationResult getAllLocations() {
        return new GeoLocationResult(service.findAll());
    }

    @GetMapping("{lat}/{lon}/{distance}")
    public GeoLocationResult getCityNear(
            @PathVariable double lat,
            @PathVariable double lon,
            @PathVariable double distance){
        return new GeoLocationResult(service.findAround(lat, lon, distance));
    }
}
