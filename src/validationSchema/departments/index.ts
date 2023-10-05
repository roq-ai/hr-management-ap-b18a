import * as yup from 'yup';

export const departmentValidationSchema = yup.object().shape({
  name: yup.string().required(),
  budget: yup.number().integer().nullable(),
  location: yup.string().nullable(),
  company_id: yup.string().nullable().required(),
  manager_id: yup.string().nullable().required(),
});
