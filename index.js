import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import {
  getName,
  getHostId,
  getHostName,
  getNeighbourhood,
  getLatitude,
  getLongitude,
  getRoomType,
  getPrice,
  getMinimumNights,
  getNumberOfReviews,
  getLastReview,
  getReviewsPerMonth,
  getCalculatedHostListingsCount,
  getAvailability365,
  getIds
} from './database_queries.js';
import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config'
const password = process.env.MONGO_PASSWORD;
const username = process.env.MONGO_USERNAME;
const uri = `mongodb+srv://${username}:${password}@cluster0.vvmtyfv.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function startServer() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');


    const typeDefs = `#graphql
      # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

      # This "Book" type defines the queryable fields for every book in our data source.

      type Publication {
        name: String 
        host_id: Int 
        host_name: String 
        neighbourhood: String 
        latitude: Float 
        longitude: Float 
        room_type: String 
        price: Float 
        minimum_nights: Int 
        number_of_reviews: Int 
        last_review: String
        reviews_per_month: Float 
        calculated_host_listings_count: Int 
        availability_365: Int 
      }

      # The "Query" type is special: it lists all of the available queries that
      # clients can execute, along with the return type for each. In this
      # case, the "books" query returns an array of zero or more Books (defined above).
      type Query {
        publication(id: String): Publication
        getIds(page: Int): [String]
      }
    `;

    const resolvers = {
      Query: {
        publication: (_, { id }) => {
          // Aquí utilizamos las funciones para obtener los campos específicos por ID
          const publicationData = {
            name: getName(id),
            host_id: getHostId(id),
            host_name: getHostName(id),
            neighbourhood: getNeighbourhood(id),
            latitude: getLatitude(id),
            longitude: getLongitude(id),
            room_type: getRoomType(id),
            price: getPrice(id),
            minimum_nights: getMinimumNights(id),
            number_of_reviews: getNumberOfReviews(id),
            last_review: getLastReview(id),
            reviews_per_month: getReviewsPerMonth(id),
            calculated_host_listings_count: getCalculatedHostListingsCount(id),
            availability_365: getAvailability365(id),
          };

          return publicationData;
        },
        getIds: (_, { page }) => {
          const itemsPerPage = 20;
          const skip = (page - 1) * itemsPerPage;

          const ids = getIds(skip, itemsPerPage);
          return ids;
        }
      },
    };

    const server = new ApolloServer({
      typeDefs,
      resolvers,
    });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
    });
    console.log(`🚀  Server ready at: ${url}`);

  } catch (err) {
    console.error(err);
  }
}

startServer();
