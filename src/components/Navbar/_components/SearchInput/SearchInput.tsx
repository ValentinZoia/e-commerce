import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getLocalStorage, setLocalStorage } from "@/utilities";
import { SearchModal } from "../SearchModal";

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      // Guardar el historial
      saveToHistory(searchValue);

      //Redirigir a pagina de resultados
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);

      //Cerrar el modal
      setIsModalOpen(false);
    }
  };

  const saveToHistory = (value: string) => {
    const history: string[] =
      (getLocalStorage("searchHistory") as string[]) || ([] as string[]);

    // Evitar duplicados y mantener el término más reciente primero
    const newHistory = [
      value,
      ...history.filter(
        (item) => item.toLocaleLowerCase() !== value.toLocaleLowerCase()
      ),
    ].slice(0, 10);

    setLocalStorage("searchHistory", newHistory);
  };

  const clearSearch = () => {
    setSearchValue("");
    inputRef.current?.focus();
  };

  const handleFocus = () => {
    setIsModalOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if(e.target.value === "") {
      clearSearch();
    }
  }

  return (
    <>
      <form onSubmit={handleSearch} className="relative w-full" onReset={clearSearch}>
        <div className="relative">
          <Search className="text-primary cursor-pointer absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 " />
          <Input
            ref={inputRef}
            type="search"
            placeholder="Buscar..."
            className="pl-10 pr-10 "
            value={searchValue}
            onChange={handleChange}
            onFocus={handleFocus}

          />
          
        </div>
      </form>
      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectValue={(value) => {
          // Guardar el historial
          saveToHistory(value);

          //Redirigir a pagina de resultados
          navigate(`/search?q=${encodeURIComponent(value)}`);

          //Cerrar el modal
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default SearchInput;
