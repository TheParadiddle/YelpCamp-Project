const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp_camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '65f083ef2a09bc6a5f168db1',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos nisi adipisci perferendis, molestias quasi a qui debitis, ipsum pariatur dolore mollitia numquam assumenda nemo culpa, perspiciatis repellat ullam id aut?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [ -85.480783, 32.609857 ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/divflkwsl/image/upload/v1710959721/YelpCamp/gcq9bbrda3zsvbtihs05.jpg',
                    filename: 'YelpCamp/gcq9bbrda3zsvbtihs05'
                },
                {
                    url: 'https://res.cloudinary.com/divflkwsl/image/upload/v1710959721/YelpCamp/nh8pjy6oplaqtx1cd09z.jpg',
                    filename: 'YelpCamp/nh8pjy6oplaqtx1cd09z'
                },
                {
                    url: 'https://res.cloudinary.com/divflkwsl/image/upload/v1710959721/YelpCamp/kab6tpwanyy2trrt7r5z.jpg',
                    filename: 'YelpCamp/kab6tpwanyy2trrt7r5z'
                },
                {
                    url: 'https://res.cloudinary.com/divflkwsl/image/upload/v1710959721/YelpCamp/ypfvrc0tugymnzvmbf24.jpg',
                    filename: 'YelpCamp/ypfvrc0tugymnzvmbf24'
                },
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})