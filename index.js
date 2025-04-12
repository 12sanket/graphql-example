import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { games, reviews, authors } from "./_db.js";

const resolvers = {
  Query: {
    games() {
      return games;
    },
    game(_, args) {
      return games.find((game) => game.id === args.id);
    },
    reviews() {
      return reviews;
    },
    review(_, args, context) {
      return reviews.find((review) => review.id === args.id);
    },
    authors() {
      return authors;
    },
    author(_, args) {
      return authors.find((author) => author.id === args.id);
    },
  },
  Game: {
    reviews(parent) {
      return reviews.filter((eachReview) => eachReview.gameId === parent.id);
    },
  },
  Mutation: {
    addGame(_, args) {
      let newGame = {
        ...args.game,
        id: Math.floor(Math.random() * 10_000).toString(),
      };
      games.push(newGame);
      return games;
    },
    deleteGame(_, args) {
      let newArr = games.filter((game) => game.id != args.id);
      return newArr;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log("Server Up on port 4000");
