import { useState, useRef, useEffect } from "react";
import { Clock, Trash2, X } from "lucide-react";
import { getLocalStorage } from "@/utilities";
import { Button } from "@/components/ui/button";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectValue: (value: string) => void;
}

const SearchModal = ({ isOpen, onClose, onSelectValue }: SearchModalProps) => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  //efecto para obtner el historial de busqueda desde localStorage cuando el mosal isOpen
  useEffect(() => {
    //Cargar historial de busqueda desde localStorage
    const loadHistory = () => {
      const history =
        (getLocalStorage("searchHistory") as string[]) || ([] as string[]);
      setSearchHistory(history);
    };

    if (isOpen) {
      loadHistory();
    }
  }, [isOpen]);

  //Efecto para cerrar el modal al hacer click fuera de el
  useEffect(() => {
    // Cerrar modal al hacer clic fuera de él
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const clearHistory = () => {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
  };

  const removeHistoryItem = (index: number) => {
    const newHistory = [...searchHistory];
    newHistory.splice(index, 1);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    setSearchHistory(newHistory);
  };

  if (!isOpen) return null;
  return (
    <div
      className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 max-h-[400px] overflow-auto"
      ref={modalRef}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Búsquedas recientes</h3>
          {searchHistory.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              className="h-8 px-2 text-xs cursor-pointer"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Borrar todo
            </Button>
          )}
        </div>

        {searchHistory.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">
            No hay búsquedas recientes
          </p>
        ) : (
          <ul className="space-y-1">
            {searchHistory.map((value, index) => (
              <li
                key={index}
                className="flex items-center justify-between group"
              >
                <button
                  className="cursor-pointer flex items-center py-2 px-1 text-sm w-full hover:bg-muted rounded"
                  onClick={() => onSelectValue(value)}
                >
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  {value}
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 cursor-pointer"
                  onClick={() => removeHistoryItem(index)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Eliminar</span>
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
