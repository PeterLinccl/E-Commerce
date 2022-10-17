package com.eccommerce.springboot.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "country")
@Getter
@Setter
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  int id ;

    @Column(name = "code")
    private  String code;

    @Column(name = "name")
    private  String name;

    //one to many
    @OneToMany(mappedBy = "country")
    private 


}
