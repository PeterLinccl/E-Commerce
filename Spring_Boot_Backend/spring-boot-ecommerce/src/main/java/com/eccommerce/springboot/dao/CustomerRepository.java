package com.eccommerce.springboot.dao;


import com.eccommerce.springboot.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {



}
