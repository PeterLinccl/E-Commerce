package com.eccommerce.springboot.dto;


import lombok.Data;
import lombok.NonNull;

//use this to send back a java object as json
@Data
public class PurchaseResponse {
    @NonNull
    private String orderTrackingNumber;



}
