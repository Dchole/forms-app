import { useContext } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import ListSubheader from "@material-ui/core/ListSubheader";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import fieldTypes from "./fieldTypes";
import { CreateTableContext } from "./CreateTableContext";
import { EFields, Maybe } from "../../apollo/generated/graphql";
import convertToReadable from "../../utils/enumify";

// Had to create a function by means of avoiding the use of "Fragment"
// because parent(Select) doesn't accept "Fragment"
const mapOptions = (options: { icon: JSX.Element; field: EFields }[]) =>
  options.map(({ icon, field }) => (
    <MenuItem value={field}>
      <Grid alignItems="center" container>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText style={{ margin: 0 }}>
          {convertToReadable(field)}
        </ListItemText>
      </Grid>
    </MenuItem>
  ));

interface IComboBox {
  mobile: boolean;
  fieldID: string;
  type: Maybe<EFields>;
}

const ComboBox: React.FC<IComboBox> = ({ mobile, fieldID, type }) => {
  const { setFieldType } = useContext(CreateTableContext);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFieldType(fieldID, event.target.value as EFields);
  };

  return (
    <FormControl
      variant="outlined"
      size="small"
      margin={mobile ? "none" : "normal"}
      fullWidth
    >
      <InputLabel id={`select-label-${fieldID}`}>Field Type</InputLabel>
      <Select
        id={`select-field-type-${fieldID}`}
        name={`field-type-${fieldID}`}
        value={type}
        label="Field Type"
        labelId={`select-field-type-label-${fieldID}`}
        onChange={handleChange}
      >
        {Object.entries(fieldTypes).map(([category, options]) => [
          <ListSubheader>{category}</ListSubheader>,
          mapOptions(options)
        ])}
      </Select>
    </FormControl>
  );
};

export default ComboBox;
