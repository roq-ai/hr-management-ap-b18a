import { EmployeeInterface } from 'interfaces/employee';
import { GetQueryInterface } from 'interfaces';

export interface AttendanceInterface {
  id?: string;
  employee_id: string;
  date: any;
  time_in: any;
  time_out?: any;
  hours_worked?: number;
  overtime?: number;
  status?: string;
  created_at?: any;
  updated_at?: any;

  employee?: EmployeeInterface;
  _count?: {};
}

export interface AttendanceGetQueryInterface extends GetQueryInterface {
  id?: string;
  employee_id?: string;
  status?: string;
}
