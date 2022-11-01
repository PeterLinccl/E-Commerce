package com.eccommerce.springboot.dto;

import com.eccommerce.springboot.entity.Address;
import com.eccommerce.springboot.entity.Customer;
import com.eccommerce.springboot.entity.Order;
import com.eccommerce.springboot.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {

    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;

}

