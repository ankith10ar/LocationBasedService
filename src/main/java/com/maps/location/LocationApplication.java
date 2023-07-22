package com.maps.location;

import com.maps.location.model.GeoLocation;
import com.maps.location.service.GeoLocationService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class LocationApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(LocationApplication.class, args);
		context.getBean(GeoLocationService.class).fillGeoLocationData();
	}

}
