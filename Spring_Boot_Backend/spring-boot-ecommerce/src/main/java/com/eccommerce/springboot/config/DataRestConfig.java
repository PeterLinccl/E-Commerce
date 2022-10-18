package com.eccommerce.springboot.config;

import com.eccommerce.springboot.dao.CountryRepository;
import com.eccommerce.springboot.dao.StateRepository;
import com.eccommerce.springboot.entity.Product;
import com.eccommerce.springboot.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.core.mapping.ExposureConfigurer;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {


    private EntityManager entityManager;

    @Autowired //autowired jpa entity manager
    public DataRestConfig(EntityManager theEntityManager){
        entityManager = theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        HttpMethod[] theUnsupportedActions = {HttpMethod.POST, HttpMethod.PUT,HttpMethod.DELETE,HttpMethod.PATCH};

        //DISABLE POST PUT DELETE
        diableHttpMethod(config.getExposureConfiguration().forDomainType(Product.class), theUnsupportedActions);

        //DISABLE POST PUT DELETE
        diableHttpMethod(config.getExposureConfiguration().forDomainType(ProductCategory.class), theUnsupportedActions);

        //diable post put delete country
        diableHttpMethod(config.getExposureConfiguration().forDomainType(CountryRepository.class),theUnsupportedActions);

        //diable post put delete state
        diableHttpMethod(config.getExposureConfiguration().forDomainType(StateRepository.class),theUnsupportedActions);

        //call an internal helper method
        exposeIds(config);
    }

    private static void diableHttpMethod(ExposureConfigurer config, HttpMethod[] theUnsupportedActions) {
        config
                .withItemExposure(((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions)))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
    }

    private void exposeIds(RepositoryRestConfiguration config){
        // expose entity id, to get list of product categories by id
        //  and master/detail view... get a product by id...

        //get a list of enitity classes from the entity manger
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        //create array for entity type
        List<Class> entityClasses = new ArrayList<>();

        // get the enity types for the entities
        for(EntityType tempEntityType : entities){
            entityClasses.add(tempEntityType.getJavaType());
        }

        // exposes the enitity ids for the array of entity/domain types
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

    }

}

