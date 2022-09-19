const { ApolloError } = require('apollo-server-errors');
const { dogs, users } = require('./storage');

module.exports = Object.freeze({
    resolvers: {
        Query: {
            getAllUsers: () => {
                return users;
            },
            getUser: (_, { id }) => {
                let user = users.filter(user => user.id === id)
                return user ? user[0] : new ApolloError(`Could not find user`);
            },
            getAllDogs: () => {
                return dogs;
            },
            getDog: (_, { name }) => {
                // Check to see if the inputted name matches a dog in our data
                let dog = dogs.filter( dog => dog.name === name );
                console.log(dog);
                if (dog.length > 0) {
                    // If we have a dog, return it to the user!
                    return dog[0];
                } else {
                    // If we don't have a dog, return an error saying there is no dog with that name
                    return new ApolloError('No dog with the name ' + name, 'DOG_DOESNT_EXIST');
                }
            }
        },
        Mutation: {
            createUser:(_, { input }) => {
                const id = Date.now()
                const user = { id, ...input }
                users.push(user)
                return user
            }
        }
    }
})