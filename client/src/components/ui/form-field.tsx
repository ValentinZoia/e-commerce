import { Control, FieldValues, Path } from "react-hook-form";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "./form";
import { Input } from "./input";
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
    name: string;
    label: string;
    type?: string;
    placeholder?: string;
    selectValues?: Array<any>;
}

export const FormFieldInput = <TFieldValues extends FieldValues>({
    control,
    name,
    label,
    placeholder,
    type,
}: Props<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name as Path<TFieldValues>}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input
                            type={type}
                            placeholder={placeholder}
                            value={field.value || ""}
                            onChange={(e) =>
                                field.onChange(
                                    type == "number"
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

export const FormFieldTextarea = <TFieldValues extends FieldValues>({
    name,
    label,
    placeholder,
    control,
}: Props<TFieldValues>) => (
    <FormField
        control={control}
        name={name as Path<TFieldValues>}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Textarea
                        placeholder={placeholder}
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

export const FormFieldSelect = <TFieldValues extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    selectValues,
}: Props<TFieldValues>) => {
    return (
        <FormField
            control={control}
            name={name as Path<TFieldValues>}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder={placeholder} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {selectValues?.map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status.charAt(0).toUpperCase() +
                                        status.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
