import { Size } from "@/types";
import * as React from "react";
import { FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface SizesManagerProps {
    sizes: Size[];
    addSize: () => void;
    removeSize: (index: number) => void;
    newSize: Size;
    setNewSize: React.Dispatch<React.SetStateAction<Size>>;
}

export default function SizesManager({
    sizes,
    addSize,
    removeSize,
    newSize,
    setNewSize,
}: SizesManagerProps) {
    return (
        <div className="space-y-2">
            <FormLabel>Talles/Variantes</FormLabel>
            <div className="flex gap-2">
                <Input
                    placeholder="Nombre del talle"
                    value={newSize.name}
                    onChange={(e) =>
                        setNewSize({
                            ...newSize,
                            name: e.target.value,
                        })
                    }
                />
                <Input
                    type="number"
                    placeholder="Stock"
                    value={newSize.stock}
                    onChange={(e) =>
                        setNewSize({
                            ...newSize,
                            stock: Number(e.target.value) || 0,
                        })
                    }
                />
                <Button type="button" onClick={addSize}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
            {sizes.map((size, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between bg-muted p-2 rounded"
                >
                    <span>
                        {size.name} - Stock: {size.stock}
                    </span>
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSize(index)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ))}
        </div>
    );
}
