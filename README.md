# Stardog CompanyDB

## Prereqs
1. Node 8+ is installed
2. Yarn is installed
3. Stardog 5 is installed and running

## Running
1. Clone the repo, cd into it
2. `yarn data:add` (builds companyDB ontology and adds sample entities to Stardog)
3. `yarn` (installs lerna)
4. `yarn lerna bootstrap` (installs dependencies for packages)
5. `yarn run start` (spawns server and client web application)
6. Navigate to localhost:4200 in your browser

## How it works
Stardog provides an HTTP API and a Node.js client library that provides a way to read and manipulate its graph data. An Angular application uses a GraphQL endpoint in Stardog's API to read in semantic data and display it in linked tabular format.

Meanwhile, an Express server runs in the background providing mappings between the Stardog databases's RDF ontology and Angular - allowing the web app to label and display the queried GraphQL data correctly. This also enables dynamic forms where each field on an entity is mapped to an appropriate input.

Unfortunately, Stardog's GraphQL implementation is incomplete. In order to create documents, a dedicated endpoint in the Express server takes POST data from the Anguar form and places it in a new IRI using json-ld and another Stardog API call.

Lastly, while the web application has buttons for deleting / updating individual entities, this functionality is not functioning. This is due to a bug encountered in Stardog where data inserted through json-ld in it's HTTP API is unable to be queried via SparQL.

## Adding Types

Currently, the CompanyDB forms and pages are all defined in code. This was to simplify development. There isn't much involved in adding new things, however.

Each page is defined in a variable called `__Type` which is of `ExposedType`. There the page `name` and `rdfType` are defined - as well as the `columns` can be viewed in the table, the `defaultColumns` that are visible by default, and the `inputs` that are asked for when creating an instance of the type.

Each of the values in `columns`, `defaultColumns`, and `inputs` belongs to the `Properties` enum which specifies each rdf field (e.g. `carnot:employeeCompany`). Each property should be mapped to an `input` in the `PROPERTY_TO_INPUT` map which will determine how it is displayed in the table and in a form.

As you can see, this would be relatively easy to turn into a GUI application so creators of Star Dog web applications don't need to know code.

## Future Work
- Support multi-valued attributes in forms
- Support update / deletion
- Better form validation / error messages
- Create a GUI for creating your own Stardog-based applications