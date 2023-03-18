import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { generalFields, plFields, bsFields, revenueFields, expenseFields, attdFields } from '../../utils/allFields';
import { useDictionary } from '../../utils/graphql-hooks';
import type { Dict } from '../../../types';

type FieldTypeListProps = FieldFilterProps & {
  title: string;
  items: string[];
};

function FieldTypeList({ title, fields, setFields, items }: FieldTypeListProps) {
  const dictionary = useDictionary();
  const [open, setOpen] = React.useState(false);
  const allSelected = items.every((item) => fields.includes(item));
  const allEmpty = items.every((item) => !fields.includes(item));

  const toggleOpen = () => {
    setOpen(!open);
  };
  const toggleField = (newField: string) => () => {
    setFields(fields.includes(newField) ? fields.filter((field) => field !== newField) : [...fields, newField]);
  };
  const setAllFields = () => {
    setFields(Array.from(new Set([...fields, ...items])));
  };
  const clearAllFields = () => {
    setFields(fields.filter((field) => !items.includes(field)));
  };
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton onClick={toggleOpen}>
          <ListItemIcon>
            <Checkbox disableRipple checked={!allEmpty} indeterminate={!allSelected && !allEmpty} edge="start" color="secondary" />
          </ListItemIcon>
          <ListItemText primary={title} />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </ListItem>
      <Collapse in={open}>
        <ListItem disablePadding dense>
          <ListItemButton onClick={setAllFields}>
            <ListItemText primary="全て選択" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding dense>
          <ListItemButton onClick={clearAllFields}>
            <ListItemText primary="全て解除" />
          </ListItemButton>
        </ListItem>
        {items.map((item) => (
          <ListItem key={item} disablePadding dense>
            <ListItemButton onClick={toggleField(item)}>
              <ListItemIcon>
                <Checkbox checked={fields.includes(item)} edge="start" color="secondary" />
              </ListItemIcon>
              <ListItemText primary={dictionary[item as keyof Dict]} />
            </ListItemButton>
          </ListItem>
        ))}
      </Collapse>
    </List>
  );
}

type FieldFilterProps = {
  fields: string[];
  setFields: React.Dispatch<React.SetStateAction<string[]>>;
};

function FieldFilter({ fields, setFields }: FieldFilterProps) {
  return (
    <List subheader={<ListSubheader>項目</ListSubheader>}>
      <FieldTypeList items={generalFields} fields={fields} setFields={setFields} title="一般" />
      <FieldTypeList items={plFields} fields={fields} setFields={setFields} title="損益計算書" />
      <FieldTypeList items={bsFields} fields={fields} setFields={setFields} title="貸借対照表" />
      <FieldTypeList items={revenueFields} fields={fields} setFields={setFields} title="営業収入" />
      <FieldTypeList items={expenseFields} fields={fields} setFields={setFields} title="営業費用" />
      <FieldTypeList items={attdFields} fields={fields} setFields={setFields} title="入場者数" />
    </List>
  );
}

export default FieldFilter;
