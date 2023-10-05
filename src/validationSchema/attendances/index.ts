import * as yup from 'yup';

export const attendanceValidationSchema = yup.object().shape({
  date: yup.date().required(),
  time_in: yup.date().required(),
  time_out: yup.date().nullable(),
  hours_worked: yup.number().integer().nullable(),
  overtime: yup.number().integer().nullable(),
  status: yup.string().nullable(),
  employee_id: yup.string().nullable().required(),
});
