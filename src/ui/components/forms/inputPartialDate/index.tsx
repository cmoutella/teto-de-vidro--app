import { ChangeEvent, useEffect, useState } from "react";
import { FormSizes, FormTheme } from "../shared/style";
import FieldWrapper from "../raw/wrappers/field";
import SelectRaw from "../raw/select";
import { Option } from "../raw/select";

interface InputPartialDateProps {
  label?: string;
  description?: string;
  theme?: FormTheme;
  themeSize?: FormSizes;
  onChange: (d: Date) => void;
  date?: Date;
}

const monthOptions: Option[] = [
  { label: "Janeiro", value: "0" },
  { label: "Fevereiro", value: "1" },
  { label: "Março", value: "2" },
  { label: "Abril", value: "3" },
  { label: "Maio", value: "4" },
  { label: "Junho", value: "5" },
  { label: "Julho", value: "6" },
  { label: "Agosto", value: "7" },
  { label: "Setembro", value: "8" },
  { label: "Outubro", value: "9" },
  { label: "Novembro", value: "10" },
  { label: "Dezembro", value: "11" },
];

const currYear = new Date().getFullYear();

const yearOptions: Option[] = [
  { label: currYear.toString(), value: currYear.toString() },
  { label: (currYear + 1).toString(), value: (currYear + 1).toString() },
  { label: (currYear + 2).toString(), value: (currYear + 2).toString() },
  { label: (currYear + 3).toString(), value: (currYear + 3).toString() },
  { label: (currYear + 4).toString(), value: (currYear + 4).toString() },
];

const InputPartialDate = ({
  label,
  description,
  date,
  theme = "light",
  themeSize = "md",
  onChange,
}: InputPartialDateProps) => {
  const [year, setYear] = useState<string | undefined>(
    date?.getFullYear().toString() ?? undefined
  );
  const [month, setMonth] = useState<string | undefined>(
    date?.getMonth().toString() ?? undefined
  );

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const val = e.target.value;

    setMonth(val);
  };

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const val = e.target.value;

    setYear(val);
  };

  useEffect(() => {
    if (!year || !month) {
      return;
    }
    const date = new Date(Number(year), Number(month), 1);

    onChange(date as Date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  return (
    <FieldWrapper
      label={label}
      description={description}
      theme={theme}
      themeSize={themeSize}
    >
      <span className="flex gap-2 w-full">
        <SelectRaw
          name="movingMonth"
          theme={theme}
          themeSize={themeSize}
          options={monthOptions}
          selected={month}
          onChange={handleMonthChange}
        />
        <SelectRaw
          name="movingYear"
          theme={theme}
          themeSize={themeSize}
          options={yearOptions}
          selected={year}
          onChange={handleYearChange}
        />
      </span>
    </FieldWrapper>
  );
};

export default InputPartialDate;
