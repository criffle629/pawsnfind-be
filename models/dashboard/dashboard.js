const db = require('../../data/dbConfig')

module.exports = {
    getDashboard,
    getUserDashboard,
    getAnimalCount,
    getAnimals,
    getDonationsByMonth,
    getApplicationsByMonth,
    getFollowerCounts,
    getRecentApplications,
    getDonations30Days,
    getApplication30Days
}


/////////get complete USER DASHBOARD data by user id//////////

function getUserDashboard(id) {
    const recentApplication60 = db
    .select('applications.*', 'animals.name as animal_name', 'application_status.application_status', 'shelters.shelter', db.raw("extract(month from applications.created_at) as month"), db.raw("extract(day from applications.created_at) as day"), db.raw("extract(year from applications.created_at) as year"))
    .from('applications')
    .leftJoin('animals', 'applications.animal_id', 'animals.id')
    .leftJoin('application_status', 'applications.application_status_id', 'application_status.id')
    .leftJoin('shelters', 'applications.shelter_id', 'shelters.id')
    .where('applications.user_id', id)
    .where(db.raw("applications.created_at > current_date - interval '60' day"))
    .orderBy('applications.id','desc')
    .limit(5)

    const monthlyDonation = db
    .select(db.raw("extract(month from created_at) as month"), db.raw("extract(year from created_at) as year"))
    .count('* as number of donations')
    .sum({"total" : 'amount'})
    .from('donations')
    .groupBy('month')
    .groupBy('year')
    .where('donations.user_id', id)
    .orderBy([{column: 'year', order: 'desc'} , {column : 'month', order: 'desc'}])

    const animalFollowCount = db('animal_follows').count('* as totalAnimalFollows').where('user_id', id)
    
    const shelterFollowCount = db('shelter_follows').count('* as totalShelterFollows').where('user_id', id)

    const applicationCount = db('applications').count('* as totalApplications').where('user_id', id)

    const totalDonation = db('donations').sum({"total":"amount"}).where('donations.user_id', id)

    const promises = [recentApplication60, monthlyDonation, animalFollowCount, shelterFollowCount, applicationCount, totalDonation]

    return Promise.all(promises).then(results => {
        let [recentApplication60, monthlyDonation, animalFollowCount, shelterFollowCount, applicationCount, totalDonation] = results;

        return {
            recentApplication : recentApplication60,
            monthlyDonation : monthlyDonation,
            animalFollows : animalFollowCount,
            shelterFollows : shelterFollowCount,
            applicationCount : applicationCount, 
            totalDonation : totalDonation
        }
    })
}




///////// END OF GETTING USER DASHBOARD DATA //////////



/////////get complete SHELTER DASHBOARD data by shelter id//////////

//aggregate data, aggregate donation based on date, aggregate application based on month, most current applications, list of available animals

function getDashboard(id) {
    const query = db
    .select('shelters.shelter', 'shelters.is_upgraded', 'shelters.EIN', 'shelters.shelter_location_id', 'shelters.shelter_contact_id', 'shelter_locations.nickname as shelter_location', 'shelter_contacts.name as shelter_contact')
    .from('shelters')
    .leftJoin('shelter_locations', 'shelters.shelter_location_id', 'shelter_locations.id')
    .leftJoin('shelter_contacts', 'shelters.shelter_contact_id', 'shelter_contacts.id')
    .where('shelters.id', id)
    
    const promises = [query, getAnimalCount(id), getDonations30Days(id), getApplication30Days(id), getFollowerCounts(id), getDonationsByMonth(id), getApplicationsByMonth(id), getRecentApplications(id), getAnimals(id)]
    return Promise.all(promises).then(results => {
        let [shelter, animalCount, donation30, application30, followerCount, monthlyDonation, monthlyApplication, recentApplication, animal3] = results;

        return {
            shelter_info : shelter,
            animal_count : animalCount,
            donation_30 : donation30,
            application_30 : application30,
            follower_count : followerCount,
            monthly_donation : monthlyDonation,
            monthly_application : monthlyApplication,
            recent_application : recentApplication,
            animal_3 : animal3
        }
    })
}

//get 3 animals by shelter id
function getAnimals(id) {
   return db
   .select('animals.*', "pictures.img_url")
   .from('animals')
   .leftJoin('pictures', 'animals.profile_img_id', 'pictures.img_id')
   .where('animals.shelter_id', id)
   .whereIn('animals.animal_status_id', [1,2,3])
   .orderBy('animals.id','desc')
   .limit(3)
}

//get species count (animals currently under care) by shelter id
function getAnimalCount(id) {
    return db
    .select('species.species')
    .count('animals.name')
    .from('animals')
    .innerJoin('species', 'animals.species_id', 'species.id')
    .groupBy('species.species')
    .where('shelter_id', id)
    .whereIn('animal_status_id', [1,2,3]) 
}

//get # of donations to a specific shelter by the month
function getDonationsByMonth(id) {
    return db
    .select(db.raw("extract(month from created_at) as month"), db.raw("extract(year from created_at) as year"))
    .count('* as number of donations')
    .sum({"total" : 'amount'})
    .from('donations')
    .groupBy('month')
    .groupBy('year')
    .where('donations.shelter_id', id)
    .orderBy([{column: 'year', order: 'desc'} , {column : 'month', order: 'desc'}])
}

//get total donations for the last 30 days
function getDonations30Days(id) {
    return db
    .select('shelter_id')
    .sum({"total" : 'amount'})
    .from('donations')
    .groupBy('shelter_id')
    .where('shelter_id', id)
    .where(db.raw("created_at > current_date - interval '30' day"))
}

//get total applications for the last 30 days
function getApplication30Days(id) {
    return db
    .select('shelter_id')
    .count('*')
    .from('applications')
    .groupBy('shelter_id')
    .where('shelter_id', id)
    .where(db.raw("created_at > current_date - interval '30' day"))
}

//get # of applications to a specific shelter by the months
function getApplicationsByMonth(id) {

    return db
    .select(db.raw("extract(month from created_at) as month"), db.raw("extract(year from created_at) as year"))
    .count('* as total')
    .from('applications')
    .groupBy('month')   
    .groupBy('year') 
    .where('applications.shelter_id', id)
    .orderBy([{column: 'year', order: 'desc'} , {column : 'month', order: 'desc'}]) 
}

//get follower counts
function getFollowerCounts(id) {
    return db('shelter_follows')
    .where('shelter_id', id)
    .count()
}

//get most 5 recent applications
function getRecentApplications(id) {
    return db
    .select('applications.*', 'animals.name as animal_name', 'application_status.application_status', 'users.username as applicant_username', db.raw("extract(month from applications.created_at) as month"), db.raw("extract(day from applications.created_at) as day"), db.raw("extract(year from applications.created_at) as year"))
    .from('applications')
    .leftJoin('animals', 'applications.animal_id', 'animals.id')
    .leftJoin('application_status', 'applications.application_status_id', 'application_status.id')
    .leftJoin('users', 'applications.user_id', 'users.id')
    .where('applications.shelter_id', id)
    .orderBy('applications.id','desc')
    .limit(5)
}

///////// END OF GETTING SHELTER DASHBOARD DATA //////////


