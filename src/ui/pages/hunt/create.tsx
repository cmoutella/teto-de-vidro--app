"use client";
import Input from "@/ui/components/forms/input";
import InputPartialDate from "@/ui/components/forms/inputPartialDate";
import DropdownSelect from "@/ui/components/forms/selects/DropdownSelect";
import { FormSizes, FormTheme } from "@/ui/components/forms/shared/style";
import { ChangeEvent, useState } from "react";

const formThemeSize: FormSizes = "lg";
const themePallete: FormTheme = "light";

const CreateHuntView = () => {
  const [title, setTitle] = useState<string>();
  const [type, setType] = useState<string>();
  const [movingDate, setMovingDate] = useState<Date>();
  const [livingPeople, setLivingPeople] = useState<number>();
  const [livingPets, setLivingPets] = useState<number>();
  const [lowerBudget, setLowerBudget] = useState<number>();
  const [higherBudget, setHigherBudget] = useState<number>();

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleType = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value);
  };

  const handlePeople = (e: ChangeEvent<HTMLInputElement>) => {
    setLivingPeople(Number(e.target.value));
  };

  const handlePets = (e: ChangeEvent<HTMLInputElement>) => {
    setLivingPets(Number(e.target.value));
  };

  const handleLowerBudget = (e: ChangeEvent<HTMLInputElement>) => {
    setLowerBudget(Number(e.target.value));
  };

  const handleHigherBudget = (e: ChangeEvent<HTMLInputElement>) => {
    setHigherBudget(Number(e.target.value));
  };

  return (
    <div className="w-full flex justify-center flex-col items-center px-14 py-10 gap-3">
      <div className="container mb-10">
        <h1 className="text-3xl text-brand-primary-800 font-semibold">
          Nova mudança
        </h1>
      </div>
      <div className="container">
        <form className="w-full grid md:grid-cols-12 gap-x-4 gap-y-5">
          <span className="col-span-8">
            <Input
              label="Dê um título para esta mudança"
              name="title"
              themeSize={formThemeSize}
              theme={themePallete}
              placeholder={`Mudança de ${new Date().getFullYear()}`}
              value={title}
              onChange={handleTitle}
            />
          </span>
          <span className="col-span-4">
            <DropdownSelect
              label="Tipo de moradia"
              name="housingType"
              options={[
                { value: "house", label: "Casa" },
                { value: "apart", label: "Apartamento" },
                { value: "either", label: "Tanto faz" },
              ]}
              themeSize={formThemeSize}
              theme={themePallete}
              defaultValue={type}
              onChange={handleType}
            />
          </span>
          <span className="col-span-3">
            <InputPartialDate
              date={movingDate}
              label="Quando deve ser a mudança?"
              themeSize={formThemeSize}
              theme={themePallete}
              onChange={setMovingDate}
            />
          </span>
          <span className="col-span-2">
            <Input
              label="Quantos moradores?"
              name="livingPeople"
              type="number"
              themeSize={formThemeSize}
              theme={themePallete}
              value={livingPeople}
              onChange={handlePeople}
            />
          </span>
          <span className="col-span-2">
            <Input
              label="Quantos pets?"
              name="livingPets"
              type="number"
              themeSize={formThemeSize}
              theme={themePallete}
              value={livingPets}
              onChange={handlePets}
            />
          </span>
          <span className="col-span-2 col-start-9 col-end-11">
            <Input
              label="Orçamento mínimo"
              name="livingPets"
              type="number"
              themeSize={formThemeSize}
              theme={themePallete}
              value={lowerBudget}
              onChange={handleLowerBudget}
            />
          </span>
          <span className="col-span-2 col-start-11 col-end-13">
            <Input
              label="Orçamento máximo"
              name="livingPets"
              type="number"
              themeSize={formThemeSize}
              theme={themePallete}
              value={higherBudget}
              onChange={handleHigherBudget}
            />
          </span>

          <div className="pt-10 col-span-12">
            <p className="text-lg font-medium text-brand-primary-600">
              Convite alguém para colaborar nessa busca
            </p>
            <div className="h-0.5 bg-brand-primary-500 my-1"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHuntView;
