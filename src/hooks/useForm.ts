import { ChangeEvent, useCallback, useState } from 'react';

interface UseFormProps {
  fields: {
    [name: string]: {
      required?: boolean;
      pattern?: RegExp;
      min?: number;
    };
  };
  initialValues?: { [name: string]: string };
}

const useForm = (config: UseFormProps) => {
  const [form, setForm] = useState<{ [name: string]: string }>(
    config.initialValues || {}
  );
  const [errors, setErrors] = useState<{
    [name: string]: boolean;
  }>({});

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validate = (name: string): boolean => {
    let isValid = true;

    if (config.fields[name].pattern) {
      isValid = Boolean(config.fields[name].pattern?.test(form[name]));
    }

    if (config.fields[name].required) {
      isValid = Boolean(form[name]);
    }

    if (config.fields[name].min) {
      isValid =
        Boolean(form[name]?.length) &&
        form[name].length >= (config.fields[name].min || 0);
    }

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
