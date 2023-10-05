import { CompanyInterface } from 'interfaces/company';
import { DepartmentInterface } from 'interfaces/department';
import { EmployeeInterface } from 'interfaces/employee';
import { GetQueryInterface } from 'interfaces';

export interface ProjectInterface {
  id?: string;
  name: string;
  start_date: any;
  end_date?: any;
  budget?: number;
  company_id: string;
  department_id: string;
  manager_id: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  department?: DepartmentInterface;
  employee?: EmployeeInterface;
  _count?: {};
}

export interface ProjectGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  company_id?: string;
  department_id?: string;
  manager_id?: string;
}
