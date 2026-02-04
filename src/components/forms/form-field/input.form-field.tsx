import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  fieldName: string;
  label: string;
  isReadOnly?: boolean;
  isRequired?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
};

const InputFormField = ({
  fieldName,
  label,
  isReadOnly = false,
  isRequired = false,
  value,
  onChange,
  type = "text",
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <>
          <Label htmlFor={fieldName}>{label}</Label>
          <Input
            id={fieldName}
            type={type}
            readOnly={isReadOnly}
            required={isRequired}
            value={value && field.value}
            onChange={
              onChange !== undefined
                ? (x) => {
                    onChange(x.target.value);
                  }
                : (x) => {
                    field.onChange(x.target.value);
                  }
            }
            className={cn({ "border-red-500": fieldState.error })}
          />
          {fieldState.error && (
            <p className="text-red-500 text-sm mt-1">
              {fieldState.error.message}
            </p>
          )}
        </>
      )}
    />
  );
};

export default InputFormField;
