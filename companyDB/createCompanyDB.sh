stardog-admin db drop -n companyDB

echo ""
stardog-admin db create -o reasoning.sameas=FULL -n companyDB ./all-layers.ttl
stardog-admin db offline --timeout 0 companyDB #take the database offline
stardog-admin metadata set -o icv.enabled=true companyDB #enable ICV
stardog-admin db online companyDB #put the database online

echo ""
echo "Adding DDL"
stardog data add companyDB 1\ addToSchemaOrg.n3

echo ""
echo "Adding rules"
stardog data add companyDB 2\ addRules.ttl

echo ""
echo "Adding constraints"
stardog-admin icv add companyDB 3\ addConstraints.ttl

echo ""
echo "Adding instances"
stardog data add companyDB 4\ addInstances.n3

echo ""
echo "Adding EVAs"
stardog query companyDB    5\ addEVAs.sparql

echo ""
echo "Adding EVAs again"
stardog query companyDB    5\ addEVAs.sparql

echo ""
echo "Run some queries"
stardog query --reasoning companyDB    6\ runQuery1.sparql
stardog query --reasoning companyDB    6\ runQuery2.sparql

echo ""