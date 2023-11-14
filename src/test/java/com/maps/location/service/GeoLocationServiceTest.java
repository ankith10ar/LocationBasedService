package com.maps.location.service;

import com.maps.location.repository.GeoLocationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.locationtech.jts.geom.Point;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;

import static org.mockito.Mockito.*;

class GeoLocationServiceTest {

    @Mock
    private GeoLocationRepository geoLocationRepository;
    @InjectMocks
    private GeoLocationService geoLocationService;

    @BeforeEach
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void getGeoLocationData() {
        when(geoLocationRepository.findAll()).thenReturn(Collections.emptyList());
        geoLocationService.findAll();
        verify(geoLocationRepository, times(1)).findAll();
    }

    @Test
    public void findAround() {
        when(geoLocationRepository.findNearWithinDistance(any(Point.class), eq(Double.valueOf(10)))).thenReturn(Collections.emptyList());
        geoLocationService.findAround(10, 10, 10);
        verify(geoLocationRepository, times(1)).findNearWithinDistance(any(Point.class), eq(Double.valueOf(10)));
    }

    @Test
    public void findWithType() {
        when(geoLocationRepository.findLocationsWithType("Hospital")).thenReturn(Collections.emptyList());
        geoLocationService.findWithType("Hospital");
        verify(geoLocationRepository, times(1)).findLocationsWithType("Hospital");
    }

    @Test
    public void findWithTypeAround() {
        when(geoLocationRepository.findLocationsWithTypeWithinDistance(any(Point.class), eq("Hospital"), eq(Double.valueOf(10)))).thenReturn(Collections.emptyList());
        geoLocationService.findWithTypeAround(10, 10, "Hospital", 10);
        verify(geoLocationRepository, times(1)).findLocationsWithTypeWithinDistance(any(Point.class), eq("Hospital"), eq(Double.valueOf(10)));
    }

    @Test
    public void findWithText() {
        when(geoLocationRepository.findLocationsWithText("Manipal")).thenReturn(Collections.emptyList());
        geoLocationService.findByText("Manipal");
        verify(geoLocationRepository, times(1)).findLocationsWithText("Manipal");
    }
}