const db = require('../../data/dbConfig')

module.exports = {
    advancedSearch,
    initialSearch
}

function initialSearch(filter) {
    return db
    .select('animals.*', 'shelter_locations.zipcode', 'pictures.img_url', 'animal_meta.is_male', 'breeds.breed','ages.age')
    .from('animals')
    .leftJoin('shelter_locations', 'animals.shelter_location_id', 'shelter_locations.id')
    .leftJoin('pictures', 'animals.profile_img_id', 'pictures.img_id')
    .leftJoin('animal_meta', 'animals.id', 'animal_meta.animal_id' )
    .leftJoin('ages', 'animal_meta.age_id', 'ages.id')
    .leftJoin('breeds', 'animal_meta.breed_id', 'breeds.id')
    .whereIn('animals.animal_status_id', [1, 3])
    .whereIn('shelter_locations.zipcode', filter.zips )
    .whereIn('animals.species_id', filter.species_id)
    
    
}


function advancedSearch(filter) {
   
    const query = db
    .select('animals.*', 'shelter_locations.zipcode', 'pictures.img_url', 'animal_meta.is_male', 'breeds.breed','ages.age')
    .from('animals')
    .leftJoin('shelter_locations', 'animals.shelter_location_id', 'shelter_locations.id')
    .leftJoin('pictures', 'animals.profile_img_id', 'pictures.img_id')
    .leftJoin('animal_meta', 'animals.id', 'animal_meta.animal_id' )
    .leftJoin('ages', 'animal_meta.age_id', 'ages.id')
    .leftJoin('breeds', 'animal_meta.breed_id', 'breeds.id')

    .whereIn('animals.animal_status_id', [1, 3])

    // console.log(filter)
    if(filter.species_id.length > 0) {
        query.whereIn('animals.species_id', filter.species_id)
    }

    if(Array.from(filter.is_male).length > 0) {
        query.whereIn('animal_meta.is_male', filter.is_male)
    }

    if(filter.coat_length_id.length > 0) {
        query.whereIn('animal_meta.coat_length_id', filter.coat_length_id) 
    }

    if(filter.size_id.length > 0) {
        query.whereIn('animal_meta.size_id', filter.size_id)
    }

    if(filter.age_id.length > 0) {
        query.whereIn('animal_meta.age_id', filter.age_id) 
    }

    if(filter.zips.length > 0) {
        query.whereIn('shelter_locations.zipcode', filter.zips)
    }
    
    if(filter.breed_id.length > 0) {
      query.whereIn('animal_meta.breed_id', filter.breed_id)
    }

    return query
}


