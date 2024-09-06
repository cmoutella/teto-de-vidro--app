"use client";
import Input from "@/ui/components/forms/input";
import DropdownSelect from "@/ui/components/forms/selects/DropdownSelect";
import { ChangeEvent, useState } from "react";

const CreateHuntView = () => {
  const [title, setTitle] = useState<string>();
  const [type, setType] = useState<string>();

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleType = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  return (
    <div className="w-full flex justify-center flex-col items-center px-14 py-10 gap-3">
      <div className="container">
        <h1>Nova mudança</h1>
      </div>
      <div className="container">
        <form className="w-full">
          <span className="w-4/6">
            <Input
              name="title"
              label="Dê um título para esta mudança"
              placeholder={`Mudança de ${new Date().getFullYear()}`}
              value={title}
              onChange={handleTitle}
            />
          </span>
          <span className="w-2/6">
            <DropdownSelect
              label="Tipo de moradia"
              options={[
                { value: "house", label: "Casa" },
                { value: "apart", label: "Apartamento" },
                { value: "either", label: "Tanto faz" },
              ]}
              defaultValue={type}
              onChange={handleType}
            />
          </span>
        </form>
      </div>
    </div>
  );
};

export default CreateHuntView;
