package com.eccommerce.springboot.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "state")
@Data
public class State {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "code")
    private String name;

    @ManyToOne
    @JoinColumn(name = "country_id")
    private String Country;


}
