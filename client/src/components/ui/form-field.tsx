import { Control, FieldValues, Path } from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "./form";
import { Input, InputPassword } from "./input";
import { Textarea } from "./textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";

interface Props<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues = TFieldValues,
> {
    control: Control<TFieldValues, TContext, TTransformedValues>;
    nameField: Path<TFieldValues>;
    label: string;
    selectValues?: Array<any>;
}

type FormFieldInputProps<TFieldValues extends FieldValues = FieldValues> =
    Props<TFieldValues> &
        Omit<
            React.ComponentPropsWithoutRef<"input">,
            "value" | "onChange" | "onBlur" | "name"
        >;

export const FormFieldInput = <TFieldValues extends FieldValues>({
    control,
    nameField,
    label,
    ...inputProps
}: FormFieldInputProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={nameField as Path<TFieldValues>}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            {...inputProps}
                            value={field.value || ""}
                            onChange={(e) =>
                                field.onChange(
                                    inputProps.type == "number"
                                        ? Number(e.target.value)
                                        : e.target.value,
                                )
                            }
                            onBlur={field.onBlur}
                            disabled={field.disabled}
                            ref={field.ref}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export const FormFieldInputPassword = <TFieldValues extends FieldValues>({
    control,
    nameField,
    label,

    ...inputProps
}: FormFieldInputProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={nameField as Path<TFieldValues>}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <InputPassword
                            {...inputProps}
                            type="password"
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

type FormFieldTextAreaProps<TFieldValues extends FieldValues = FieldValues> =
    Props<TFieldValues> & React.ComponentPropsWithoutRef<"textarea">;

export const FormFieldTextarea = <TFieldValues extends FieldValues>({
    nameField,
    label,
    control,
    ...textareaProps
}: FormFieldTextAreaProps<TFieldValues>) => (
    <FormField
        control={control}
        name={nameField as Path<TFieldValues>}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Textarea
                        {...textareaProps}
                        value={field.value || ""}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                        ref={field.ref}
                    />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
);

type FormFieldSelectProps<TFieldValues extends FieldValues = FieldValues> =
    Props<TFieldValues> &
        React.ComponentPropsWithoutRef<"select"> & {
            placeholder: string;
            selectComponent?: React.ReactNode;
        };

export const FormFieldSelect = <TFieldValues extends FieldValues>({
    nameField,
    control,
    label,
    selectValues,
    placeholder,
    selectComponent,
    ...selectProps
}: FormFieldSelectProps<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={nameField as Path<TFieldValues>}
            render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor={nameField}>{label}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                            <SelectTrigger id={nameField}>
                                <SelectValue
                                    {...selectProps}
                                    placeholder={placeholder}
                                />
                            </SelectTrigger>
                        </FormControl>
                        {selectComponent ? (
                            <>{selectComponent}</>
                        ) : (
                            <SelectContent>
                                {selectValues?.map((status) => (
                                    <SelectItem key={status} value={status}>
                                        {status.charAt(0).toUpperCase() +
                                            status.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        )}
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
