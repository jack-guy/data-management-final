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


export abstract class Input {
  abstract input: string;
  label: string;
  constructor (props) {
    Object.assign(this, props);
  }
}

export class TextInput extends Input {
  input = 'text';
  label: string;
  minLength?: number;
  maxLength?: number;
}

export class TextareaInput extends TextInput {
  input = 'textarea';
}

export class BoolInput extends Input {
  input = 'bool';
}

export class DateInput extends Input {
  input = 'date';
  minDate?: Date;
  maxDate?: Date;
}

export class SelectInput extends Input {
  input = 'select';
  values: string[];
  default?: string;
}

export class NumberInput extends Input {
  input = 'number';
  min?: number;
  max?: number;
}

export class EvaInput extends Input {
  input = 'eva';
  rdfType: string;
  listField: string;
}

export class MevaInput extends Input {
  input = 'meva';
  rdfType: string;
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
};

const schema_name_input = new TextInput({
  label: 'Name',
  maxLength: 50
});
const schema_cv_input = new TextareaInput({
  label: 'Resume',
  maxLength: 4096
});
const schema_gender_input = new SelectInput({
  label: 'Gender',
  values: [ 'Male', 'Female' ]
});
const schema_description_input = new TextareaInput({
  label: 'Description',
  maxLength: 1024
});
const schema_startDate_input = new DateInput({
  label: 'Start Date',
});
const schema_endDate_input = new DateInput({
  label: 'End Date'
});
const carnot_type_input = new TextInput({
  label: 'Type',
  maxLength: 50
});
const carnot_missionStatement_input = new TextareaInput({
  label: 'Mission Statement',
  maxLength: 100
});
const carnot_dob_input = new DateInput({
  label: 'Date of Birth',
  maxDate: new Date()
});
const carnot_education_input = new SelectInput({
  label: 'Education',
  values: ['Some High School', 'Diploma', 'Bachelors', 'Masters', 'Doctorate']
});
const carnot_ssnum_input = new TextInput({
  label: 'Social Security Number',
  minLength: 9,
  maxLength: 9
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
  rdfType: 'carnot_Manager',
  listField: 'schema_name'
});
const carnot_company_input = new EvaInput({
  label: 'Company',
  rdfType: 'carnot_Company',
  listField: 'schema_name'
});
const carnot_department_input = new EvaInput({
  label: 'Department',
  rdfType: 'carnot_Department',
  listField: 'schema_name'
});
const carnot_employees_input = new MevaInput({
  label: 'Employees',
  rdfType: 'carnot_Employee',
  listField: 'schema_name'
});

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
  [Properties.carnot_companyEmployees]: carnot_employees_input,
};

interface ExposedType {
  name: string;
  rdfType: string;
  inputs: Properties[];
  columns: Properties[];
  defaultColumns: Properties[];
  mutable: boolean;
}

const CompanyType: ExposedType = {
  name: 'Company',
  rdfType: 'carnot_Company',
  columns: [
    Properties.schema_name,
    Properties.carnot_type,
    Properties.carnot_companyEmployees
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.carnot_type    
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
  columns: [
    Properties.schema_name,
    Properties.carnot_missionStatement
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.carnot_missionStatement
  ],
  inputs: [
    Properties.schema_name,
    Properties.carnot_missionStatement
  ],
  mutable: true
};

const PersonType: ExposedType = {
  name: 'Person',
  rdfType: 'schema_Person',
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
    Properties.carnot_employeeCompany,
    Properties.carnot_employeeDepartment,
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.carnot_hiredate,
    Properties.carnot_salary,
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
    Properties.carnot_employeeDepartment,
  ],
  mutable: true
};

const FormerEmployeeType: ExposedType = {
  name: 'Former Employee',
  rdfType: 'carnot_FormerEmployee',
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
  ],
  mutable: true
};

const ManagerType: ExposedType = {
  name: 'Manager',
  rdfType: 'carnot_Manager',
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
  ],
  mutable: true
};

const FormerManagerType: ExposedType = {
  name: 'Former Manager',
  rdfType: 'carnot_FormerManager',
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
  ],
  mutable: true,
};

const OutsideEmployeeType: ExposedType = {
  name: 'Outside Employee',
  rdfType: 'carnot_OutsideEmployee',
  columns: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married
  ],
  inputs: [
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
  columns: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.carnot_dob,
    Properties.carnot_education,
    Properties.carnot_ssnum,
    Properties.schema_gender,
    Properties.carnot_citizen,
    Properties.carnot_married,
  ],
  inputs: [
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
  columns: [
    Properties.schema_name,
    Properties.carnot_status,
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.carnot_status,
  ],
  inputs: [
    Properties.schema_name,
    Properties.carnot_status,
  ],
  mutable: true
};

const DateRangeType: ExposedType = {
  name: 'Date Range',
  rdfType: 'carnot_DateRange',
  columns: [
    Properties.schema_startDate,
    Properties.schema_endDate,
  ],
  defaultColumns: [
    Properties.schema_startDate,
    Properties.schema_endDate,
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
  columns: [
    Properties.schema_name,
    Properties.schema_description
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.schema_description
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
  columns: [
    Properties.schema_name,
    Properties.schema_description
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.schema_description
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
  columns: [
    Properties.schema_name,
    Properties.schema_description
  ],
  defaultColumns: [
    Properties.schema_name,
    Properties.schema_description
  ],
  inputs: [
    Properties.schema_name,
    Properties.schema_description
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

app.listen(4201, '127.0.0.1', function () {
  console.log('Server listening on 4201');
});
