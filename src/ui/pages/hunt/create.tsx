"use client";
import { createHunt, CreateHuntRequestProps } from "@/features/hunt/create";
import { useSessionContext } from "@/providers/AuthProvider";
import { CONTRACT_TYPE } from "@/types/app";
import Button from "@/ui/components/base/Button";
import Input from "@/ui/components/base/form/Input";
import InputPartialDate from "@/ui/components/base/form/InputPartialDate";
import DropdownSelect from "@/ui/components/base/form/selects/DropdownSelect";
import { FormSizes, FormTheme } from "@/ui/components/base/form/shared/style";
import { useRouter } from "next/navigation";
import cx from "classnames";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import PrivateBasePage from "@/ui/template/PrivateBasePage";

const formThemeSize: FormSizes = "lg";
const themePallete: FormTheme = "light";

const CreateHuntView = () => {
  const [title, setTitle] = useState<string>("");
  const [type, setType] = useState<CONTRACT_TYPE>("either");
  const [movingDate, setMovingDate] = useState<Date | undefined>();
  const [livingPeople, setLivingPeople] = useState<number>(1);
  const [livingPets, setLivingPets] = useState<number>(0);
  const [lowerBudget, setLowerBudget] = useState<number>(0);
  const [higherBudget, setHigherBudget] = useState<number>(0);

  const submitButtonDisabled = useMemo(() => {
    return !title;
  }, [title]);

  const { user } = useSessionContext();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !user) return;

    const data: CreateHuntRequestProps = {
      creatorId: user.id,
      title: title,
      type: type,
      movingExpected: movingDate?.toISOString(),
      livingPeople: livingPeople,
      livingPets: livingPets,
    };

    const res = await createHunt(data);

    console.log(res);
    if (!res) return;

    router.push(`/hunt/${res.id}`);
  };

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleType = (e: ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as CONTRACT_TYPE);
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
    <PrivateBasePage>
      <div className="w-full flex justify-center flex-col items-center px-14 py-10 gap-3">
        <div className="container px-20 mb-10">
          <h1 className="text-3xl text-brand-primary-800 font-semibold">
            Nova mudança
          </h1>
        </div>
        <div className="container px-20">
          <form
            onSubmit={handleSubmit}
            className="w-full grid md:grid-cols-12 gap-x-4 gap-y-5"
          >
            <span className="col-span-8">
              <Input
                label="Dê um título para esta mudança"
                description="Um nome para te ajudar a localizá-la depois"
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
                label="Tipo de busca"
                description="Apenas para aluguel? Compra?"
                name="housingType"
                options={[
                  { value: "buy", label: "Compra" },
                  { value: "rent", label: "Aluguel" },
                  { value: "either", label: "?" },
                ]}
                themeSize={formThemeSize}
                theme={themePallete}
                defaultValue={type}
                onChange={handleType}
              />
            </span>
            <span className="col-span-4">
              <InputPartialDate
                date={movingDate}
                label="Data da mudança?"
                themeSize={formThemeSize}
                theme={themePallete}
                onChange={setMovingDate}
              />
            </span>
            <span className="col-span-4">
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
            <span className="col-span-4">
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
            <div className="row col-span-12 flex flex-row justify-end gap-x-4 gap-y-5">
              <span className="col-span-4 col-start-5 col-end-9">
                <Input
                  label="Orçamento mínimo"
                  name="livingPets"
                  type="number"
                  themeSize={formThemeSize}
                  theme={themePallete}
                  value={lowerBudget}
                  onChange={handleLowerBudget}
                  fieldSymbol="R$"
                />
              </span>
              <span className="col-span-4 col-start-9 col-end-13">
                <Input
                  label="Orçamento máximo"
                  name="livingPets"
                  type="number"
                  themeSize={formThemeSize}
                  theme={themePallete}
                  value={higherBudget}
                  onChange={handleHigherBudget}
                  fieldSymbol="R$"
                />
              </span>
            </div>

            <div className="flex flex-col gap-2 col-span-12 justify-center items-center pt-5">
              <span className="text-brand-gray-700 text-xs pb-2">
                Você pode alterar depois
              </span>
              <Button
                label="Criar"
                className={cx("min-w-36 w-1/6  text-white", {
                  "hover:bg-brand-primary-800 bg-brand-primary-700":
                    !submitButtonDisabled,
                  "bg-brand-gray-500": submitButtonDisabled,
                })}
                type="submit"
                disabled={submitButtonDisabled}
              />
            </div>
          </form>
        </div>
      </div>
    </PrivateBasePage>
  );
};

export default CreateHuntView;
