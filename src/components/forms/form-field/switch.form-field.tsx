import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  fieldName: string;
  label: string;
  isReadOnly?: boolean;
  isRequired?: boolean;
  onChange?: (value: boolean) => void;
};

const SwitchFormField = ({
  fieldName,
  label,
  isReadOnly = false,
  isRequired = false,
  onChange,
}: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <div className="flex items-center space-x-2">
          <Switch
            id={fieldName}
            disabled={isReadOnly}
            checked={field.value}
            onCheckedChange={
              onChange !== undefined
                ? (checked) => {
                    onChange(checked);
                  }
                : (checked) => {
                    field.onChange(checked);
                  }
            }
            className={cn(
              "data-[state=checked]:bg-blue-600 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              isReadOnly && "opacity-50 cursor-not-allowed",
              fieldState.error && "ring-1 ring-red-500",
            )}
          >
            <span className="sr-only">{label}</span>
            <span
              className={cn(
                "data-[state=checked]:translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition-transform   ",
                isReadOnly && "bg-gray-300",
              )}
            />
          </Switch>
          <Label htmlFor={fieldName}>
            {label}{" "}
            <span className="text-red-500">{isRequired ? "*" : ""}</span>
          </Label>
          {fieldState.error && (
            <p className="text-red-500 text-sm mt-1">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default SwitchFormField;
