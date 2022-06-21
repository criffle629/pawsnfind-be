const db = require('../../data/dbConfig.js')

module.exports = {
    getDonationsByUser,
    getDonationbyId,
    getDonationsByShelter,
    getAllDonations,
    addDonation,
    updateDonation,
    getDonationDashboardData
}

function getDonationDashboardData(id) {
    const donationQuery = db
    .select('donations.*', 'users.username', 'users.email', db.raw("extract(month from donations.created_at) as month"), db.raw("extract(day from donations.created_at) as day"), db.raw("extract(year from donations.created_at) as year"))
    .from('donations')
    .leftJoin('users', 'donations.user_id', 'users.id')
    .where('shelter_id', id)
    .orderBy('created_at', 'desc')
    .limit(20)

    const totalDonationQuery = db('donations').where('shelter_id', id).sum({"total": "amount"})
    
    const recentDonationQuery = db('donations').where('shelter_id', id).sum({"total" : 'amount'})
    .where(db.raw("created_at > current_date - interval '30' day"))

    const topDonationQuery = db
    .select('users.username')
    .from('donations')
    .leftJoin('users', 'donations.user_id', 'users.id')
    .sum({"total": 'donations.amount'})
    .count('users.username as number_of_donations')
    .groupBy('users.username')  
    .orderBy('total', 'desc')
    .where('donations.shelter_id', id)
    .limit(4)

    const promises = [donationQuery, totalDonationQuery, recentDonationQuery, topDonationQuery]

    return Promise.all(promises).then(results => {
        let [donations, totalDonations, recentDonations, topDonations] = results;
        return{
            donations : donations,
            totalDonations : totalDonations,
            recentDonations : recentDonations,
            topDonations : topDonations
        }
    })
}


function getAllDonations() {
    return db('donations')
}

function getDonationbyId (id) {
        return db
        .select('donations.id', 'donations.amount', 'donations.created_at', 'shelters.shelter', 'users.username')
        .from('donations')
        .leftJoin('shelters', 'donations.shelter_id', 'shelters.id')
        .leftJoin('users', 'donations.user_id', 'users.id')
        .where({ 'donations.id' : id })
        .first();
}

function getDonationsByUser(id) {
    const query = db
    .select('donations.id', 'donations.amount', 'shelters.shelter', 'users.username', db.raw("extract(month from donations.created_at) as month"), db.raw("extract(day from donations.created_at) as day"), db.raw("extract(year from donations.created_at) as year"))
    .from('donations')
    .leftJoin('shelters', 'donations.shelter_id', 'shelters.id')
    .leftJoin('users', 'donations.user_id', 'users.id')
    .where({ 'donations.user_id' : id })

    const total = db
    .select('user_id')
    .count("user_id")
    .sum({'total':'amount'})
    .from('donations')
    .groupBy('user_id')
    .where('user_id', id)

    const topDonationQuery = db
    .select('shelters.shelter')
    .from('donations')
    .leftJoin('shelters', 'donations.shelter_id', 'shelters.id')
    .sum({"total": 'donations.amount'})
    .count('shelters.shelter as number_of_donations')
    .groupBy('shelters.shelter')  
    .orderBy('total', 'desc')
    .where('donations.user_id', id)
    .limit(4)

    const promises = [query, total, topDonationQuery]

    return Promise.all(promises).then(results => {
        let [donations, total, top_donations] = results;
        if(donations) {
            return {
                donations: donations,
                total_donations: total,
                top_donations: top_donations
            }
        } else {
            return null;
        }
    })
}



function getDonationsByShelter(id) {
    return db
    .select('donations.id', 'donations.amount', 'donations.created_at', 'shelters.shelter', 'users.username')
    .from('donations')
    .leftJoin('shelters', 'donations.shelter_id', 'shelters.id')
    .leftJoin('users', 'donations.user_id', 'users.id')
    .where({ 'donations.shelter_id' : id })
}

function addDonation(donation) {
    return db('donations')
    .insert(donation, 'id')
    .then( ([id]) => getDonationbyId(id))
}

function updateDonation(id, change) {
    return db('donations')
    .where({ id })
    .update(change)
    .then(updatedDonations => updatedDonations ? getDonationbyId(id) : null)
}