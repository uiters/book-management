import { InputLabel, MenuItem, Select } from "@material-ui/core";
//@ts-ignore
import { EventHandler } from "react";

type SelectInput = {
  data: any;
  name: string;
  type: string;
  selectHandler: (value: string, type: string) => void;
};

const DropDownInput = (props: SelectInput) => {
  const optionsUI = props.data.map((item: any, index: number) => {
    return (
      <MenuItem value={item.name} key={index}>
        {item.name}
      </MenuItem>
    );
  });

  const onSelectChanged = (e: EventHandler) => {
    console.log(e.target.value);
    props.selectHandler(e.target.value, props.type);
  };

  return (
    <div className="w-full flex flex-col items-start">
      <label
        className="font-bold text-left w-full text-gray-500 pb-3"
        id="label"
      >
        {props.name}
      </label>
      <div className="border w-full">
        <Select
          className="w-full text-left pl-3"
          labelId="label"
          id="select"
          onChange={onSelectChanged}
          defaultValue=""
        >
          {optionsUI}
        </Select>
      </div>
    </div>
  );
};

export default DropDownInput;
