package com.eccommerce.springboot.service;


import com.eccommerce.springboot.dao.CustomerRepository;
import com.eccommerce.springboot.dto.Purchase;
import com.eccommerce.springboot.dto.PurchaseResponse;
import org.springframework.stereotype.Service;

@Service
public interface CheckoutService{

    PurchaseResponse placeOrder(Purchase purchase);

}
