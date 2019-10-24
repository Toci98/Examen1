import { fetchData } from './fetchdata';
import { GraphQLServer} from 'graphql-yoga';


/*const url = 'https://swapi.co/api/planets/';

const runApp = data => {


  const typeDefs = `
  type Query{
    planeta(name:String!): Planet!
    planetas(rotation_period: Int!): [Planet!]! 
  } 

  type Planet{
    name: String!
    rotation_period: Int!
    orbital_period: Int! 
    diameter: Int!
    climate: String! 
    gravity:  String!
    terrain: String!
    surface_water: String!
    residents:[String]
  }
  `
  const resolvers = {
    Query: {

      planeta: (parent, args, ctx, info) => {
        const result = data.find(obj => obj.name === args.name);

        return {                    
          name: result.name,                                  
          rotation_period: result.rotation_period,                  
          orbital_period: result.orbital_period,                  
          diameter: result.diameter,  
          climate: result.climate,  
          gravity: result.gravity,  
          terrain: result.terrain,  
          surface_water: result.surface_water,
          residents: result.residents,
        }
      },

      planetas: (parent, args, ctx, info) => {
        let filteredData = data.filter(elem => elem.rotation_period > args.rotation_period);           
        return filteredData;
      },  
    }
}

  const server = new GraphQLServer({typeDefs, resolvers})
  server.start({port: "3501"})
};
// main program
fetchData(runApp, url);*/

const url = 'https://swapi.co/api/people/';

const runApp = data => {


  const typeDefs = `
  type Query{
    person(name:String!): Person!
    names: [String!]!
    persons(page: Int, pageSize: Int): [Person!]!
    persons2(page: Int, pageSize: Int,name: String, gender: String): [Person!]!
  } 

  type Person{
    name: String!
    gender: String!
    url: String!
  }
  `
  const resolvers = {
    Query: {

      person: (parent, args, ctx, info) => {
        const result = data.find(obj => obj.name === args.name);

        return {                    
          name: result.name,
          gender: result.gender,
          url: result.url                               
        
        }
      },
      names:(parent, args, ctx, info) => {
        const namesarray = [];
      data.forEach(element => {
        namesarray.push(element.name,element.gender,element.url);
      });
      return [... new Set(namesarray)];
      
      },
      persons: (parent, args, ctx, info) => {
          const page = args.page || 1;
          const pageSize = args.pageSize || 10;

          const init = (page-1)*pageSize;
          const end = init + pageSize;

          const result = data.slice(init, end);

          const ret = result.map(obj => {
              return{
                  name: obj.name,
                  gender: obj.gender,
                  url: obj.url
              }
          })
          return ret;
      },
    
      persons2: (parent, args, ctx, info) => {
        const page = args.page || 1;
        const pageSize = args.pageSize || 10;      
        const init = (page-1)*pageSize;
        const end = init + pageSize;
        const filteredData = data.filter(elem => elem.name.includes(args.name || elem.name))
                                 .filter(elem => elem.gender.includes(args.gender || elem.gender))
                                 .slice(init, end)
                                 .map(obj => {
                                    return {
                                      name: obj.name,
                                      gender: obj.gender,
                                      url: obj.url
                                    }
                                 })                                   
        return filteredData;
      }
    }
  }
  const server = new GraphQLServer({typeDefs, resolvers})
  server.start({port: "3501"})
};
// main program
fetchData(runApp, url);