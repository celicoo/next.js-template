"use client";

import type { JSX } from "react";

import { FormProvider, useController } from "react-hook-form";

import { Input, type InputProps } from "~/components/input";

export const Form = FormProvider;
export { Controller as FormField } from "react-hook-form";

export type FormInputProps = Omit<InputProps, "name"> & {
  name: string;
};

export function FormInput(props: FormInputProps): JSX.Element {
  const { fieldState, formState } = useController(props);

  return (
    <Input
      disabled={formState.isLoading || formState.isSubmitting}
      aria-disabled={formState.isLoading || formState.isSubmitting}
      aria-invalid={fieldState.invalid}
      className={"mb-2"}
      {...props}
    />
  );
}
