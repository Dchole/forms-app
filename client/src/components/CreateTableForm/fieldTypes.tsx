import ShortTextIcon from "@material-ui/icons/ShortText";
import LongTextIcon from "@material-ui/icons/Subject";
import RadioButtonIcon from "@material-ui/icons/RadioButtonChecked";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import TimeIcon from "@material-ui/icons/AccessTime";
import DateIcon from "@material-ui/icons/Today";
import TimeDateIcon from "@material-ui/icons/EventBusy";

const fieldTypes = {
  Text: [
    {
      icon: <ShortTextIcon />,
      text: "Short Text"
    },
    {
      icon: <LongTextIcon />,
      text: "Long Text"
    }
  ],
  Select: [
    {
      icon: <RadioButtonIcon />,
      text: "Select One"
    },
    {
      icon: <CheckBoxIcon />,
      text: "Multiple Select"
    }
  ],
  DateTime: [
    {
      icon: <TimeIcon />,
      text: "Time"
    },
    {
      icon: <DateIcon />,
      text: "Date"
    },
    {
      icon: <TimeDateIcon />,
      text: "Time & Date"
    }
  ]
};

export default fieldTypes;
