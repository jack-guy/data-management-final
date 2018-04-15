import { Connection, query } from 'stardog';

const connection = new Connection({
  username: 'admin',
  password: 'admin',
  endpoint: 'http://localhost:5820'
});

// const res = query.execute(
//   connection,
//   'companyDB',
//   `
//   prefix schema: <http://schema.org/>
//   prefix : <http://Carnot.org/>

//   SELECT * WHERE {
//     ?i a :Pairing .
//     ?i ?p ?o
//   }
//   order by ?i ?p
//   `,
//   'application/sparql-results+json' as any,
//   // 'application/rdf+xml',
//   // 'application/ld+json',
//   { limit: 10, offset: 0 }
// ).then(({ body }) => {
//   console.log(body.results.bindings);
// }).catch((e) => {
//   console.log('ERROR', e);
// })

const test = query.graphql.execute(
  connection,
  'companyDB',
  `
  query withPrefixes @prefix(carnot: "http://Carnot.org/") {
    carnot_Employee {
      carnot_id
      schema_name @optional
    }
  }
  `,
  { '@reasoning': true },
  { limit: 10, offset: 0 }
).then(({ body }) => {
  console.log(body);
})
