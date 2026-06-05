import { zodResolver } from "@hookform/resolvers/zod";

import {
  useForm,
  type FieldValues,
  type DefaultValues,
  type SubmitHandler,
} from "react-hook-form";

import { toast } from "sonner";
import RenderInputField, { type FieldConfig } from "./RenderInputField";
import FieldWrapper from "./FieldWrapper";
import SubmitButton, { type SubmitButtonProps } from "./SubmitButton";
import type { ErrorAxios, SuccessfulResponse } from "@/types/axios";
import type { AxiosResponse } from "axios";
import type { ZodType } from "zod";

export type FormCol = "full" | "half" | "third" | "fourth";

export interface FormProps<T extends FieldValues, R> {
  inputs: FieldConfig<T>[];
  schema: ZodType<T, T>;
  defaultValues?: DefaultValues<T>;
  submitButton: SubmitButtonProps;
  service: (data: T) => Promise<AxiosResponse<SuccessfulResponse<R>>>;
  onSuccess?: (data: SuccessfulResponse<R>) => void;
}

export default function Form<T extends FieldValues, R>({
  inputs,
  schema,
  defaultValues,
  submitButton,
  service,
  onSuccess,
}: FormProps<T, R>) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<T> = async (data) => {
    try {
      const response = await service(data);
      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      const err = error as ErrorAxios;
      const errorMessage = err.response?.data?.message || "حدث خطأ غير متوقع";
      console.log(errorMessage)
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 grid-cols-12">
        {inputs.map((input) => (
          <FieldWrapper
            key={String(input.name)}
            htmlFor={String(input.name)}
            error={errors[input.name]?.message as string | undefined}
            label={input.label}
            col={input.col}
          >
            <RenderInputField
              config={input}
              control={control}
              register={register}
            />
          </FieldWrapper>
        ))}
      </div>
      <SubmitButton isSubmitting={isSubmitting} {...submitButton} />
    </form>
  );
}