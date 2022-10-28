package com.eccommerce.springboot.service;


import com.eccommerce.springboot.dao.CustomerRepository;
import com.eccommerce.springboot.dto.Purchase;
import com.eccommerce.springboot.dto.PurchaseResponse;
import com.eccommerce.springboot.entity.Customer;
import com.eccommerce.springboot.entity.Order;
import com.eccommerce.springboot.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.UUID;

@Service
public class CheckoutServiceImpl implements CheckoutService{

    private CustomerRepository customerRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository){
        this.customerRepository = customerRepository;
    }

    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {

        //retrieve the order info from dto
        Order order = purchase.getOrder();

        //generate tracking  number
        String orderTrackNumber = generateOrderTrackingNumber();
        order.setOrderTrackingNumber(orderTrackNumber);

        //populate order with orderItems
        Set<OrderItem> orderItems = purchase.getOrderItem();
        for (OrderItem item: orderItems) {
            order.add(item);
        }
        //populate order with billingAddress and shippingAddress
        order.setBillingAddress(purchase.getBillingAddress());
        order.setShippingAddress(purchase.getShippingAddress());

        //populate customer with order
        Customer customer = purchase.getCustomer();
        customer.add(order);

        //save to the database
        customerRepository.save(customer);

        //return a response
        return new PurchaseResponse(orderTrackNumber);
    }

    //create unique id
    private String generateOrderTrackingNumber() {
        //random UUID number
        return UUID.randomUUID().toString();
    }
}
