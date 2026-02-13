import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  fieldName: string;
  label: string;
  isReadOnly?: boolean;
  isRequired?: boolean;
  value?: string;
  options: { label: string; value: string }[];
  onChange?: (value: string) => void;
};

const SelectFormField = ({
  fieldName,
  label,
  isReadOnly = false,
  isRequired = false,
  onChange,
  options = [],
  value,
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <>
          <Select
            defaultValue={value}
            onValueChange={
              onChange !== undefined
                ? (value) => {
                    onChange(value);
                  }
                : (value) => {
                    field.onChange(value);
                  }
            }
          >
            <SelectTrigger>
              <SelectValue
                className={cn({ "border-red-500": fieldState.error })}
                placeholder={label}
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  {label}{" "}
                  <span className="text-red-500">{isRequired ? "*" : ""}</span>
                </SelectLabel>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={isReadOnly}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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

export default SelectFormField;
