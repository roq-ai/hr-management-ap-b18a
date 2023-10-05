import { ProjectInterface } from 'interfaces/project';
import { CompanyInterface } from 'interfaces/company';
import { EmployeeInterface } from 'interfaces/employee';
import { GetQueryInterface } from 'interfaces';

export interface DepartmentInterface {
  id?: string;
  name: string;
  company_id: string;
  manager_id: string;
  budget?: number;
  location?: string;
  created_at?: any;
  updated_at?: any;
  project?: ProjectInterface[];
  company?: CompanyInterface;
  employee?: EmployeeInterface;
  _count?: {
    project?: number;
  };
}

export interface DepartmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  company_id?: string;
  manager_id?: string;
  location?: string;
}
