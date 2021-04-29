import ShortTextIcon from "@material-ui/icons/ShortText";
import LongTextIcon from "@material-ui/icons/Subject";
import RadioButtonIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import TimeIcon from "@material-ui/icons/AccessTime";
import DateIcon from "@material-ui/icons/Today";
import TimeDateIcon from "@material-ui/icons/EventBusy";
import { EFields } from "../../apollo/generated/graphql";

const fieldTypes = {
  Text: [
    {
      icon: <ShortTextIcon />,
      field: EFields["ShortText"]
    },
    {
      icon: <LongTextIcon />,
      field: EFields["LongText"]
    }
  ],
  Select: [
    {
      icon: <RadioButtonIcon />,
      field: EFields["SelectOne"]
    },
    {
      icon: <CheckBoxIcon />,
      field: EFields["MultipleSelect"]
    }
  ],
  DateTime: [
    {
      icon: <TimeIcon />,
      field: EFields["Time"]
    },
    {
      icon: <DateIcon />,
      field: EFields["Date"]
    },
    {
      icon: <TimeDateIcon />,
      field: EFields["TimeDate"]
    }
  ]
};

export default fieldTypes;
