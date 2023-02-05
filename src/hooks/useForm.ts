import { ChangeEvent, useCallback, useState } from 'react';

interface UseFormProps {
  initialValues?: { [name: string]: string };
  formId: string;
}

const useForm = (config: UseFormProps) => {
  const [form, setForm] = useState<{ [name: string]: string }>(
    config?.initialValues || {}
  );
  const [errors, setErrors] = useState<{
    [name: string]: boolean;
  }>({});

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    let { name, value, maxLength } = e.target;

    if (maxLength > -1 && value.length > maxLength) {
      value = value.slice(0, e.target.maxLength);
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validate = (name: string): boolean => {
    const form = document.getElementById(config.formId);
    let isValid = true;

    if (!form) {
      console.error(`useForm: Form with id ${config.formId} not found`);
      return true;
    }

    const input = form?.querySelector<HTMLInputElement>(`*[name=${name}]`);

    if (!input) {
      console.error(`useForm: Input with name ${name} not found`);
      return true;
    }

    const { minLength, value } = input;

    if (minLength > -1) {
      isValid = value.length >= minLength;
    }

    isValid = isValid && input.validity.valid;
    setErrors((prev) => ({ ...prev, [name]: !isValid }));
    return isValid;
  };

  const validateFields = (fields: string[]): boolean => {
    let isValid = true;
    fields.forEach((field) => {
      isValid = validate(field) && isValid;
    });

    return isValid;
  };

  const setValue = (name: string, value: any) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return { handleChange, form, validate, errors, setValue, validateFields };
};

export default useForm;
