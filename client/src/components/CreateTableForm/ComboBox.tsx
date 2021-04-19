import { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ListSubheader from "@material-ui/core/ListSubheader";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import fieldTypes from "./fieldTypes";

// Had to create a function by means of avoiding the use of "Fragment"
// because parent(Select) doesn't accept "Fragment"
const mapOptions = (options: { icon: JSX.Element; text: string }[]) =>
  options.map(({ icon, text }) => (
    <MenuItem value={text}>
      <Grid alignItems="center" container>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText style={{ margin: 0 }}>{text}</ListItemText>
      </Grid>
    </MenuItem>
  ));

const ComboBox: React.FC = ({ children }) => {
  const [type, setType] = useState(fieldTypes.Text[0].text);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setType(event.target.value as string);
  };

  return (
    <FormControl variant="outlined" size="small" margin="normal" fullWidth>
      <InputLabel id="select-field-type-outlined-label">Field Type</InputLabel>
      <Select
        name="fieldType"
        value={type}
        label="Field Type"
        id="select-field-type"
        labelId="select-field-type-label"
        onChange={handleChange}
      >
        {Object.entries(fieldTypes).map(([category, options], index) => [
          <ListSubheader>{category}</ListSubheader>,
          mapOptions(options)
        ])}
      </Select>
    </FormControl>
  );
};

export default ComboBox;
