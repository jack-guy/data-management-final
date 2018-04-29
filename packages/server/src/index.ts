import { Connection, query, db } from 'stardog';


export abstract class Input {
  abstract inputType: string;
  abstract schema: string;
  label: string;
  constructor (props) {
    Object.assign(this, props);
  }
}

export class TextInput extends Input {
  inputType = 'text';
  schema = 'xsd:string';
  label: string;
  minLength?: number;
  maxLength?: number;
}

export class TextareaInput extends TextInput {
  inputType = 'textarea';
  schema = 'xsd:string';
}

export class BoolInput extends Input {
  inputType = 'bool';
  schema = 'xsd:boolean';
}

export class DateInput extends Input {
  inputType = 'date';
  schema = 'xsd:date';
  minDate?: Date;
  maxDate?: Date;
}

export class SelectInput extends Input {
  inputType = 'select';
  schema = 'xsd:string';
  values: string[];
  default?: string;
}

export class NumberInput extends Input {
  inputType = 'number';
  schema = 'xsd:integer';
  min?: number;
  max?: number;
}

export class EvaInput extends Input {
  inputType = 'eva';
  schema: string;
  listField: string;
}

export class MevaInput extends Input {
  inputType = 'meva';
  schema: string;
  listField: string;
}

enum Properties {
  schema_name = 'schema_name',
  schema_cv = 'schema_cv',
  schema_gender = 'schema_gender',
  schema_description = 'schema_description',
  schema_startDate = 'schema_startDate',
  schema_endDate = 'schema_endDate',
  carnot_type = 'carnot_type',
  carnot_missionStatement = 'carnot_missionStatement',
  carnot_dob = 'carnot_dob',
  carnot_education = 'carnot_education',
  carnot_ssnum = 'carnot_ssnum',
  carnot_citizen = 'carnot_citizen',
  carnot_married = 'carnot_married',
  carnot_hiredate = 'carnot_hiredate',
  carnot_salary = 'carnot_salary',
  carnot_terminationreason = 'carnot_terminationreason',
  carnot_leavestatus = 'carnot_leavestatus',
  carnot_lastday = 'carnot_lastday',
  carnot_title = 'carnot_title',
  carnot_status = 'carnot_status',
  carnot_employeeManager = 'carnot_employeeManager',
  carnot_employeeCompany = 'carnot_employeeCompany',
  carnot_employeeDepartment = 'carnot_employeeDepartment',
  carnot_companyEmployees = 'carnot_companyEmployees',
  carnot_pairAssignment = 'carnot_pairAssignment',
  carnot_assignmentPairs = 'carnot_assignmentPairs',
  carnot_departmentManager = 'carnot_departmentManager',
  carnot_departmentEmployees = 'carnot_departmentEmployees',
  carnot_outsideEmployeeCompany = 'carnot_outsideEmployeeCompany',
  carnot_consultantCompany = 'carnot_consultantCompany',
  carnot_dateRangePairs = 'carnot_dateRangePairs',
  carnot_assignmentEmployees = 'carnot_assignmentEmployees',
  carnot_pairProject = 'carnot_pairProject',
  carnot_pairDateRange = 'carnot_pairDateRange',
  carnot_taskProjects = 'carnot_taskProjects',
  carnot_projectTasks = 'carnot_projectTasks',
  carnot_employeeAssignment = 'carnot_employeeAssignment',
};

const schema_name_input = new TextInput({
  label: 'Name',
  maxLength: 50,
});
const schema_cv_input = new TextareaInput({
  label: 'Resume',
  maxLength: 4096,
});
const schema_gender_input = new SelectInput({
  label: 'Gender',
  values: [ 'Male', 'Female' ],
});
const schema_description_input = new TextareaInput({
  label: 'Description',
  maxLength: 1024,
});
const schema_startDate_input = new DateInput({
  label: 'Start Date',
});
const schema_endDate_input = new DateInput({
  label: 'End Date',
});
const carnot_type_input = new TextInput({
  label: 'Type',
  maxLength: 50,
});
const carnot_missionStatement_input = new TextareaInput({
  label: 'Mission Statement',
  maxLength: 100,
});
const carnot_dob_input = new DateInput({
  label: 'Date of Birth',
  maxDate: new Date(),
});
const carnot_education_input = new SelectInput({
  label: 'Education',
  values: ['Some High School', 'Diploma', 'Bachelors', 'Masters', 'Doctorate'],
});
const carnot_ssnum_input = new TextInput({
  label: 'Social Security Number',
  minLength: 9,
  maxLength: 9,
});
const carnot_citizen_input = new BoolInput({
  label: 'Citizen',
});
const carnot_married_input = new BoolInput({
  label: 'Married',
});
const carnot_hiredate_input = new DateInput({
  label: 'Hire Date',
});
const carnot_salary_input = new NumberInput({
  label: 'Salary',
  min: 0
});
const carnot_terminationreason_input = new TextareaInput({
  label: 'Termination Reason',
  maxLength: 100
});
const carnot_leavestatus_input = new TextInput({
  label: 'Leave Status',
  maxLength: 50
});
const carnot_lastday_input = new DateInput({
  label: 'Last Day',
});
const carnot_title_input = new TextInput({
  label: 'Job Title',
  maxLength: 50
});
const carnot_status_input = new TextInput({
  label: 'Assignment Status',
  maxLength: 50
});
const carnot_manager_input = new EvaInput({
  label: 'Manager',
  schema: 'carnot_Manager',
  listField: 'schema_name'
});
const carnot_company_input = new EvaInput({
  label: 'Company',
  schema: 'carnot_Company',
  listField: 'schema_name'
});
const carnot_department_input = new EvaInput({
  label: 'Department',
  schema: 'carnot_Department',
  listField: 'schema_name'
});
const carnot_employees_input = new MevaInput({
  label: 'Employees',
  schema: 'carnot_Employee',
  listField: 'schema_name'
});
const carnot_pairing_input = new EvaInput({
  label: 'Pairing',
  schema: 'carnot_Pairing',
  listField: 'schema_name'
});
const carnot_pairs_input = new MevaInput({
  label: 'Pairings',
  schema: 'carnot_Pairing',
  listField: 'schema_name'
})
const carnot_project_input = new EvaInput({
  label: 'Project',
  schema: 'carnot_Project',
  listField: 'schema_name'
});
const carnot_date_range_input = new EvaInput({
  label: 'Date Range',
  schema: 'carnot_DateRange',
  listField: 'schema_startDate'
});
const carnot_tasks_input = new MevaInput({
  label: 'Tasks',
  schema: 'carnot_Task',
  listField: 'schema_name'
});
const carnot_projects_input = new MevaInput({
  label: 'Projects',
  schema: 'carnot_Project',
  listField: 'schema_name'
});
const carnot_assignment_input = new EvaInput({
  label: 'Assignment',
  schema: 'carnot_Assignment',
  listField: 'schema_name',
})
const carnot_assignments_input = new MevaInput({
  label: 'Assignments',
  schema: 'carnot_Assignment',
  listField: 'schema_name',
})

type PropertyToInput = { [P in Properties]: Input };
const PROPERTY_TO_INPUT: PropertyToInput = {
  [Properties.schema_name]: schema_name_input,
  [Properties.schema_cv]: schema_cv_input,
  [Properties.schema_gender]: schema_gender_input,
  [Properties.schema_description]: schema_description_input,
  [Properties.schema_startDate]: schema_startDate_input,
  [Properties.schema_endDate]: schema_endDate_input,
  [Properties.carnot_type]: carnot_type_input,
  [Properties.carnot_missionStatement]: carnot_missionStatement_input,
  [Properties.carnot_dob]: carnot_dob_input,
  [Properties.carnot_education]: carnot_education_input,
  [Properties.carnot_ssnum]: carnot_ssnum_input,
  [Properties.carnot_citizen]: carnot_citizen_input,
  [Properties.carnot_married]: carnot_married_input,
  [Properties.carnot_hiredate]: carnot_hiredate_input,
  [Properties.carnot_salary]: carnot_salary_input,
  [Properties.carnot_terminationreason]: carnot_terminationreason_input,
  [Properties.carnot_leavestatus]: carnot_leavestatus_input,
  [Properties.carnot_lastday]: carnot_lastday_input,
  [Properties.carnot_title]: carnot_title_input,
  [Properties.carnot_status]: carnot_status_input,
  [Properties.carnot_employeeManager]: carnot_manager_input,
  [Properties.carnot_employeeCompany]: carnot_company_input,
  [Properties.carnot_employeeDepartment]: carnot_department_input,
  [Properties.carnot_departmentManager]: carnot_manager_input,
  [Properties.carnot_companyEmployees]: carnot_employees_input,
  [Properties.carnot_pairAssignment]: carnot_pairing_input,
  [Properties.carnot_assignmentPairs]: carnot_assignments_input,
  [Properties.carnot_departmentEmployees]: carnot_employees_input,
  [Properties.carnot_outsideEmployeeCompany]: carnot_company_input,
  [Properties.carnot_consultantCompany]: carnot_company_input,
  [Properties.carnot_dateRangePairs]: carnot_pairs_input,
  [Properties.carnot_assignmentEmployees]: carnot_employees_input,
  [Properties.carnot_pairProject]: carnot_project_input,
  [Properties.carnot_pairDateRange]: carnot_date_range_input,
  [Properties.carnot_taskProjects]: carnot_projects_input,
  [Properties.carnot_projectTasks]: carnot_tasks_input,
  [Properties.carnot_employeeAssignment]: carnot_assignment_input,
};

interface ExposedType {
  name: string;
  rdfType: string;
  identifier: Properties[],
  inputs: Properties[];
  columns: Properties[];
  defaultColumns: Properties[];
  mutable: boolean;
}

const CompanyType: ExposedType = {
  name: 'Company',
  rdfType: 'carnot_Company',
  identifier: [ Properties.schema_name ],
  columns: [
    Properties.schema_name,
    Properties.carnot_type,
    Properties.carnot_companyEmployees
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.carnot_type,
    Properties.carnot_companyEmployees
  ],
  inputs: [
    Properties.schema_name,
    Properties.carnot_type
  ],
  mutable: true,
};

const DepartmentType: ExposedType = {
  name: 'Department',
  rdfType: 'carnot_Department',
  identifier: [ Properties.schema_name ],
  columns: [
    Properties.schema_name,
    Properties.carnot_missionStatement,
    Properties.carnot_departmentManager,
    Properties.carnot_departmentEmployees,
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.carnot_missionStatement,
    Properties.carnot_departmentManager,
    Properties.carnot_departmentEmployees,
  ],
  inputs: [
    Properties.schema_name,
    Properties.carnot_missionStatement,
    Properties.carnot_departmentManager,
  ],
  mutable: true
};

const PersonType: ExposedType = {
  name: 'Person',
  rdfType: 'schema_Person',
  identifier: [ Properties.schema_name ],
  columns: [
    Properties.schema_name,
    Properties.carnot_dob
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.carnot_dob
  ],
  inputs: [
    Properties.schema_name,
    Properties.carnot_dob    
  ],
  mutable: false
};

const EmployeeType: ExposedType = {
  name: 'Employee',
  rdfType: 'carnot_Employee',
  identifier: [ Properties.schema_name ],
  columns: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
    Properties.carnot_hiredate,
    Properties.carnot_salary,
    Properties.carnot_employeeDepartment,
    Properties.carnot_employeeCompany,
    Properties.carnot_employeeAssignment,
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.carnot_hiredate,
    Properties.carnot_salary,
    Properties.carnot_employeeDepartment,
    Properties.carnot_employeeAssignment,
  ],
  inputs: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
    Properties.carnot_hiredate,
    Properties.carnot_salary,
    Properties.carnot_employeeDepartment,
    Properties.carnot_employeeCompany,
    Properties.carnot_employeeAssignment,
  ],
  mutable: true
};

const FormerEmployeeType: ExposedType = {
  name: 'Former Employee',
  rdfType: 'carnot_FormerEmployee',
  identifier: [ Properties.schema_name ],
  columns: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
    Properties.carnot_hiredate,
    Properties.carnot_salary,
    Properties.carnot_terminationreason,
    Properties.carnot_leavestatus,
    Properties.carnot_lastday,
    Properties.carnot_employeeDepartment,
    Properties.carnot_employeeCompany,
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_ssnum,
    Properties.carnot_hiredate,
    Properties.carnot_terminationreason,
    Properties.carnot_leavestatus,
    Properties.carnot_lastday,
    Properties.carnot_employeeDepartment,
  ],
  inputs: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
    Properties.carnot_hiredate,
    Properties.carnot_salary,
    Properties.carnot_terminationreason,
    Properties.carnot_leavestatus,
    Properties.carnot_lastday,
    Properties.carnot_employeeDepartment,
    Properties.carnot_employeeCompany,
  ],
  mutable: true
};

const ManagerType: ExposedType = {
  name: 'Manager',
  rdfType: 'carnot_Manager',
  identifier: [ Properties.schema_name ],
  columns: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
    Properties.carnot_hiredate,
    Properties.carnot_salary,
    Properties.carnot_title,
    Properties.carnot_employeeDepartment,
    Properties.carnot_employeeCompany,
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
    Properties.carnot_hiredate,
    Properties.carnot_salary,
    Properties.carnot_title,
    Properties.carnot_employeeDepartment,
  ],
  inputs: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
    Properties.carnot_hiredate,
    Properties.carnot_salary,
    Properties.carnot_title,
    Properties.carnot_employeeDepartment,
    Properties.carnot_employeeCompany,
  ],
  mutable: true
};

const FormerManagerType: ExposedType = {
  name: 'Former Manager',
  rdfType: 'carnot_FormerManager',
  identifier: [ Properties.schema_name ],
  columns: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
    Properties.carnot_hiredate,
    Properties.carnot_salary,
    Properties.carnot_title,
    Properties.carnot_employeeDepartment,
    Properties.carnot_employeeCompany,
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
    Properties.carnot_hiredate,
    Properties.carnot_salary,
    Properties.carnot_title,
    Properties.carnot_employeeDepartment,
    Properties.carnot_employeeCompany,
  ],
  inputs: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
    Properties.carnot_hiredate,
    Properties.carnot_salary,
    Properties.carnot_title,
    Properties.carnot_employeeDepartment,
    Properties.carnot_employeeCompany,
  ],
  mutable: true,
};

const OutsideEmployeeType: ExposedType = {
  name: 'Outside Employee',
  rdfType: 'carnot_OutsideEmployee',
  identifier: [ Properties.schema_name ],
  columns: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
    Properties.carnot_outsideEmployeeCompany
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
    Properties.carnot_outsideEmployeeCompany
  ],
  inputs: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
    Properties.carnot_outsideEmployeeCompany
  ],
  mutable: true
};

const ConsultantType: ExposedType = {
  name: 'Consultant',
  rdfType: 'carnot_Consultant',
  identifier: [ Properties.schema_name ],
  columns: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
    Properties.schema_cv,
    Properties.carnot_consultantCompany,
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
    Properties.carnot_consultantCompany,
  ],
  inputs: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
    Properties.schema_cv,
    Properties.carnot_consultantCompany,
  ],
  mutable: true
};

const AssignmentType: ExposedType = {
  name: 'Assignment',
  rdfType: 'carnot_Assignment',
  identifier: [ Properties.schema_name ],
  columns: [
    Properties.schema_name,
    Properties.carnot_status,
    Properties.carnot_pairAssignment,
    // Properties.carnot_assignmentEmployees,
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.carnot_status,
    Properties.carnot_pairAssignment,
    // Properties.carnot_assignmentEmployees,
  ],
  inputs: [
    Properties.schema_name,
    Properties.carnot_status,
    Properties.carnot_pairAssignment,
  ],
  mutable: true
};

const DateRangeType: ExposedType = {
  name: 'Date Range',
  rdfType: 'carnot_DateRange',
  identifier: [ Properties.schema_startDate, Properties.schema_endDate ],
  columns: [
    Properties.schema_startDate,
    Properties.schema_endDate,
    Properties.carnot_dateRangePairs,
  ],
  defaultColumns: [
    Properties.schema_startDate,
    Properties.schema_endDate,
    Properties.carnot_dateRangePairs,
  ],
  inputs: [
    Properties.schema_startDate,
    Properties.schema_endDate,
  ],
  mutable: true
};

const ProjectType: ExposedType = {
  name: 'Project',
  rdfType: 'carnot_Project',
  identifier: [ Properties.schema_name ],
  columns: [
    Properties.schema_name,
    Properties.schema_description,
    Properties.carnot_projectTasks,
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.schema_description,
    Properties.carnot_projectTasks,
  ],
  inputs: [
    Properties.schema_name,
    Properties.schema_description
  ],
  mutable: true
};

const TaskType: ExposedType = {
  name: 'Task',
  rdfType: 'carnot_Task',
  identifier: [ Properties.schema_name ],
  columns: [
    Properties.schema_name,
    Properties.schema_description,
    Properties.carnot_taskProjects,
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.schema_description,
    Properties.carnot_taskProjects,
  ],
  inputs: [
    Properties.schema_name,
    Properties.schema_description
  ],
  mutable: true
};

const PairingType: ExposedType = {
  name: 'Pairing',
  rdfType: 'carnot_Pairing',
  identifier: [ Properties.schema_name ],
  columns: [
    Properties.schema_name,
    Properties.carnot_assignmentPairs,
    Properties.carnot_pairProject,
    Properties.carnot_pairDateRange,
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.carnot_assignmentPairs,
    Properties.carnot_pairProject,
    Properties.carnot_pairDateRange,
  ],
  inputs: [
    Properties.schema_name,
    Properties.carnot_pairProject,
    Properties.carnot_pairDateRange,
  ],
  mutable: true
};


const EXPOSED_TYPES: ExposedType[] = [
  CompanyType,
  DepartmentType,
  PersonType,
  EmployeeType,
  FormerEmployeeType,
  ManagerType,
  FormerManagerType,
  OutsideEmployeeType,
  ConsultantType,
  AssignmentType,
  DateRangeType,
  ProjectType,
  TaskType,
  PairingType
];

import * as express from 'express';
const app = express();

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get('/types', (req, res) => {
  res.json(EXPOSED_TYPES.map((exposedType) => {
    return {
      ...exposedType,
      columns: exposedType.columns.map((col) => ({
        ...PROPERTY_TO_INPUT[col],
        rdfField: col,
      })),
      defaultColumns: exposedType.defaultColumns,
      inputs: exposedType.inputs.map((input) => ({
        ...PROPERTY_TO_INPUT[input],
        rdfField: input,
      })),
    };
  }));
});



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
//     ?i a :Employee .
//   }
//   `,
//   'application/ld-results+json' as any,
//   { limit: 10, offset: 0 }
// ).then(({ body }) => {
//   console.log(body);
// }).catch((e) => {
//   console.log('ERROR', e);
// })


// http://Carnot.org/Consultant/http://Carnot.org/Consultant1
/*
. carnot:Consultant2
rdf:type carnot:Consultant ;
schema:name "Annie"^^xsd:string ;
carnot:dob "1995-02-03"^^xsd:date ;
carnot:education "Bachelors"^^xsd:string ;
carnot:ssnum "555-65-4233"^^xsd:string ;
schema:gender "Female"^^xsd:string ;
carnot:citizen "true"^^xsd:boolean ;
schema:cv "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse et nisl nec lacus ultricies malesuada."^^xsd:string ;
carnot:married "true"^^xsd:boolean ;
*/

const prefixes = {
  "carnot": "http://Carnot.org/",
  "schema":  "http://schema.org/",
  "xsd": "http://www.w3.org/2001/XMLSchema#",
};

const normalizeToPrefix = (x: string) => {
  return `${x.split('_')[0]}:${x.split('_')[1]}`;
};

const normalizeToIRI = (x: string) => {
  return `${prefixes[x.split('_')[0]]}${x.split('_')[1]}`;
};

/*
  type: 'carnot_Consultant',
  {
    iriPath: 'Consultant3',
    data: [{
      'schema': 'xsd:date',
      'value': '123123',
      'field': 'carnot:dob'
    }]
  }
*/
async function dataToIri(data) {
  const input = PROPERTY_TO_INPUT[data.field];
  const test = await query.execute(
    connection,
    'companyDB',
    `
    prefix schema: <http://schema.org/>
    prefix carnot: <http://Carnot.org/>

    select distinct ?s
    where {
      ?s a ${normalizeToPrefix(input.schema)} .
      ?s ${normalizeToPrefix(input.listField)} "${data.value}"
    }
    `,
    'application/sparql-results+json' as any
  );
  const iri = test.body.results.bindings[0].s.value;
  return iri;
};

async function identifierMapToIri(rdfType, identifierMap) {
  const sparqlQuery = `
  prefix schema: <http://schema.org/>
  prefix carnot: <http://Carnot.org/>

  select distinct ?s
  where {
    ?s a ${rdfType} .
    ${Object.entries(identifierMap).map(([field, value]) => {
      return `?s ${normalizeToPrefix(field)} "${value}"`
    }).join('\n')}
  }
  `;
  console.log('sparql', sparqlQuery);
  const test = await query.execute(
    connection,
    'companyDB',
    sparqlQuery,
    'application/sparql-results+json' as any
  );
  console.log(test.body.results);
  const iri = test.body.results.bindings[0].s.value;
  return iri;
};

app.use(express.json());
app.get('/graphql',)
app.post('/create/:rdfType', async (req, res) => {
  const rdfType = normalizeToPrefix(req.params['rdfType']);
  const iriPath = req.body.iriPath;
  const data = req.body.data;

  try {
    const evaData = await Promise.all(data.map(async (x) => {
      if (PROPERTY_TO_INPUT[x.field] instanceof EvaInput) {
        return {
          ...x,
          value: await dataToIri(x),
          schema: normalizeToPrefix(x.schema),
          eva: true,
        };
      }
      return { ...x };
    }));
    const jsonLdData = {
      "@context": { ...prefixes },
      "@id": `carnot:${iriPath}`,
      "@type": rdfType,
      ...evaData.reduce((prev, val: any) => {
        if (val.eva) {
          return {
            ...prev,
            [normalizeToPrefix(val.field)]: {
              "@id": val.value,
              "@type": val.schema
            }
          }
        }
        return {
          ...prev,
          [normalizeToPrefix(val.field)]: {
            '@value': val.value,
            '@type': val.schema
          }
        };
      }, {})
    };
    console.log('jsonLd', jsonLdData);
  
    const putRes = await db.graph.doPut(
      connection,
      'companyDB',
      JSON.stringify(jsonLdData),
      `${normalizeToIRI(rdfType)}http://Carnot.org/${iriPath}`
      // `http://Carnot.org/Consultant/http://Carnot.org/Consultant3`,
    );

    if (!putRes.ok) {
      return res.status(400).json({
        'success': false,
        ...putRes.body
      });
    }
  
    return res.json({
      'success': true
    }).send();
  } catch (e) {
    return res.status(400).json({
      'success': false,
      'message': 'Invalid data'
    });
  }
});

app.post('/delete/:rdfType', async (req, res) => {
  const rdfType = normalizeToPrefix(req.params['rdfType']);
  const identifierMap = req.body;
  const iri = await identifierMapToIri(rdfType, identifierMap);
  const result = await db.graph.doDelete(connection, 'companyDB', iri);

  return res.json({
    'success': true
  }).send();
});

app.listen(4201, '127.0.0.1', function () {
  console.log('Server listening on 4201');
});
