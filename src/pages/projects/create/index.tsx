import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createProject } from 'apiSdk/projects';
import { projectValidationSchema } from 'validationSchema/projects';
import { CompanyInterface } from 'interfaces/company';
import { DepartmentInterface } from 'interfaces/department';
import { EmployeeInterface } from 'interfaces/employee';
import { getCompanies } from 'apiSdk/companies';
import { getDepartments } from 'apiSdk/departments';
import { getEmployees } from 'apiSdk/employees';
import { ProjectInterface } from 'interfaces/project';

function ProjectCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ProjectInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createProject(values);
      resetForm();
      router.push('/projects');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ProjectInterface>({
    initialValues: {
      name: '',
      start_date: new Date(new Date().toDateString()),
      end_date: new Date(new Date().toDateString()),
      budget: 0,
      company_id: (router.query.company_id as string) ?? null,
      department_id: (router.query.department_id as string) ?? null,
      manager_id: (router.query.manager_id as string) ?? null,
    },
    validationSchema: projectValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Projects',
              link: '/projects',
            },
            {
              label: 'Create Project',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Project
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="start_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Start Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.start_date ? new Date(formik.values?.start_date) : null}
              onChange={(value: Date) => formik.setFieldValue('start_date', value)}
            />
          </FormControl>
          <FormControl id="end_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              End Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.end_date ? new Date(formik.values?.end_date) : null}
              onChange={(value: Date) => formik.setFieldValue('end_date', value)}
            />
          </FormControl>

          <NumberInput
            label="Budget"
            formControlProps={{
              id: 'budget',
              isInvalid: !!formik.errors?.budget,
            }}
            name="budget"
            error={formik.errors?.budget}
            value={formik.values?.budget}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('budget', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            labelField={'name'}
          />
          <AsyncSelect<DepartmentInterface>
            formik={formik}
            name={'department_id'}
            label={'Select Department'}
            placeholder={'Select Department'}
            fetcher={getDepartments}
            labelField={'name'}
          />
          <AsyncSelect<EmployeeInterface>
            formik={formik}
            name={'manager_id'}
            label={'Select Employee'}
            placeholder={'Select Employee'}
            fetcher={getEmployees}
            labelField={'first_name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/projects')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'project',
    operation: AccessOperationEnum.CREATE,
  }),
)(ProjectCreatePage);
