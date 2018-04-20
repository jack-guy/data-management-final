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


export interface Input {
  label: string;
}

export interface TextInput extends Input {
  label: string;
  minLength?: number;
  maxLength?: number;
}

export interface BoolInput extends Input {}
export interface DateInput extends Input {
  minDate?: Date;
  maxDate?: Date;
}

export interface SelectInput extends Input {
  values: string[];
  default?: string;
}

export interface NumberInput extends Input {
  min?: number;
  max?: number;
}

export interface EvaInput extends Input {
  rdfType: string;
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
};

const schema_name_input: TextInput = {
  label: 'Name',
  maxLength: 50
};
const schema_cv_input: TextInput = {
  label: 'Resume',
  maxLength: 4096
};
const schema_gender_input: SelectInput = {
  label: 'Gender',
  values: [ 'Male', 'Female' ]
};
const schema_description_input: TextInput = {
  label: 'Description',
  maxLength: 1024
};
const schema_startDate_input: DateInput = {
  label: 'Start Date',
};
const schema_endDate_input: DateInput = {
  label: 'End Date'
};
const carnot_type_input: TextInput = {
  label: 'Type',
  maxLength: 50
};
const carnot_missionStatement_input: TextInput = {
  label: 'Mission Statement',
  maxLength: 100
};
const carnot_dob_input: DateInput = {
  label: 'Date of Birth',
  maxDate: new Date()
};
const carnot_education_input: SelectInput = {
  label: 'Education',
  values: ['Some High School', 'Diploma', 'Bachelors', 'Masters', 'Doctorate']
};
const carnot_ssnum_input: TextInput = {
  label: 'Social Security Number',
  minLength: 9,
  maxLength: 9
};
const carnot_citizen_input: BoolInput = {
  label: 'Citizen',
};
const carnot_married_input: BoolInput = {
  label: 'Married',
};
const carnot_hiredate_input: DateInput = {
  label: 'Hire Date',
};
const carnot_salary_input: NumberInput = {
  label: 'Salary',
  min: 0
};
const carnot_terminationreason_input: TextInput = {
  label: 'Termination Reason',
  maxLength: 100
};
const carnot_leavestatus_input: TextInput = {
  label: 'Leave Status',
  maxLength: 50
};
const carnot_lastday_input: DateInput = {
  label: 'Last Day',
};
const carnot_title_input: TextInput = {
  label: 'Job Title',
  maxLength: 50
};
const carnot_status_input: TextInput = {
  label: 'Assignment Status',
  maxLength: 50
};

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
};

interface ExposedType {
  name: string;
  rdfType: string;
  fields: Properties[];
  mutable: boolean;
}

const CompanyType: ExposedType = {
  name: 'Company',
  rdfType: 'carnot_Company',
  fields: [
    Properties.schema_name,
    Properties.carnot_type
  ],
  mutable: true,
};

const DepartmentType: ExposedType = {
  name: 'Department',
  rdfType: 'carnot_Department',
  fields: [
    Properties.schema_name,
    Properties.carnot_missionStatement
  ],
  mutable: true
};

const PersonType: ExposedType = {
  name: 'Person',
  rdfType: 'carnot_Person',
  fields: [
    Properties.schema_name,
    Properties.carnot_dob
  ],
  mutable: false
};

const EmployeeType: ExposedType = {
  name: 'Employee',
  rdfType: 'carnot_Employee',
  fields: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
    Properties.carnot_hiredate,
    Properties.carnot_salary,
    // department
    // manager
    // ?company
  ],
  mutable: true
};

const FormerEmployeeType: ExposedType = {
  name: 'Former Employee',
  rdfType: 'carnot_FormerEmployee',
  fields: [
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
    Properties.carnot_lastday
    // department
    // manager
  ],
  mutable: true
};

const ManagerType: ExposedType = {
  name: 'Manager',
  rdfType: 'carnot_Manager',
  fields: [
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
  ],
  mutable: true
};

const FormerManagerType: ExposedType = {
  name: 'Former Manager',
  rdfType: 'carnot_FormerManager',
  fields: [
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
  ],
  mutable: true,
};

const OutsideEmployeeType: ExposedType = {
  name: 'Outside Employee',
  rdfType: 'carnot_OutsideEmployee',
  fields: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married
  ],
  mutable: true
};

const ConsultantType: ExposedType = {
  name: 'Consultant',
  rdfType: 'carnot_Consultant',
  fields: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
  ],
  mutable: true
};

const AssignmentType: ExposedType = {
  name: 'Assignment',
  rdfType: 'carnot_Assignment',
  fields: [
    Properties.schema_name,
    Properties.carnot_status,
  ],
  mutable: true
};

const DateRangeType: ExposedType = {
  name: 'Date Range',
  rdfType: 'carnot_DateRange',
  fields: [
    Properties.schema_startDate,
    Properties.schema_endDate,
  ],
  mutable: true
};

const ProjectType: ExposedType = {
  name: 'Project',
  rdfType: 'carnot_Project',
  fields: [
    Properties.schema_name,
    Properties.schema_description
  ],
  mutable: true
};

const TaskType: ExposedType = {
  name: 'Task',
  rdfType: 'carnot_Task',
  fields: [
    Properties.schema_name,
    Properties.schema_description
  ],
  mutable: true
};

const PairingType: ExposedType = {
  name: 'Pairing',
  rdfType: 'carnot_Pairing',
  fields: [

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
      fields: exposedType.fields.map((field) => PROPERTY_TO_INPUT[field])
    };
  }));
});

app.listen(4201, '127.0.0.1', function () {
  console.log('Server listening on 4201');
});
