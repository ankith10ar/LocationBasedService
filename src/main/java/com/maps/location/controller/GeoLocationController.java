package com.maps.location.controller;

import com.maps.location.model.GeoLocationResult;
import com.maps.location.service.GeoLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public GeoLocationResult getLocationNear(
            @PathVariable double lat,
            @PathVariable double lon,
            @PathVariable double distance){
        return new GeoLocationResult(service.findAround(lat, lon, distance));
    }

    @GetMapping("{type}")
    public GeoLocationResult getLocationOfType(
            @PathVariable String type){
        return new GeoLocationResult(service.findWithType(type));
    }

    @GetMapping("{lat}/{lon}/{type}/{distance}")
    public GeoLocationResult getLocationOfTypeNear(
            @PathVariable String type,
            @PathVariable double lat,
            @PathVariable double lon,
            @PathVariable double distance){
        return new GeoLocationResult(service.findWithTypeAround(lat, lon, type, distance));
    }

    @GetMapping("search/{text}")
    public GeoLocationResult getLocationByText(
            @PathVariable String text) {
        return new GeoLocationResult(service.findByText(text));
    }
}
