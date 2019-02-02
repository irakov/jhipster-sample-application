package io.github.jhipster.application.service;

import io.github.jhipster.application.domain.Region;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Region.
 */
public interface RegionService {

    /**
     * Save a region.
     *
     * @param region the entity to save
     * @return the persisted entity
     */
    Region save(Region region);

    /**
     * Get all the regions.
     *
     * @return the list of entities
     */
    List<Region> findAll();


    /**
     * Get the "id" region.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<Region> findOne(Long id);

    /**
     * Delete the "id" region.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
