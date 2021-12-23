var express = require("express");
var data = require("./db.json");
var graphql = require("graphql");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
const path = require("path");
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} = graphql;
var { graphqlHTTP } = require("express-graphql");

const carType = new GraphQLObjectType({
  name: "Cars",
  fields: () => ({
    id: { type: GraphQLInt },
    model: { type: GraphQLInt },
    name: { type: GraphQLString },
    image: { type: GraphQLString },
    price: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQuertType",
  fields: {
    getAllCarsList: {
      type: new GraphQLList(carType),
      args: { id: { type: GraphQLInt } },
      resolve(parent, args) {
        return data;
      },
    },
  },
});
const MutationQuery = new GraphQLObjectType({
  name: "mutation",
  fields: {
    createCars: {
      type: carType,
      args: {
        model: { type: GraphQLInt },
        name: { type: GraphQLString },
        image: { type: GraphQLString },
        price: { type: GraphQLString },
      },
      resolve(parent, args) {
        data.push({
          id: data.length + 1,
          model: args.model,
          name: args.name,
          image: args.image,
          price: args.price,
        });
        return args;
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: MutationQuery,
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
// __dirname = path.resolve();

// const PORT = process.env.PORT || 4000;
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "/react-gql/build")));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "react-gql", "build", "index.html"));
//   });
// }

app.listen(4000, () => {
  console.log("server running");
});
