package com.maps.location.service;

import com.maps.location.model.Business;
import com.maps.location.repository.BusinessRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessService {

    @Autowired
    private BusinessRepository businessRepository;

    public List<Business> getAll() {
        return businessRepository.findAll();
    }
}
