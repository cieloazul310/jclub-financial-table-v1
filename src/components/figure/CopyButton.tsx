import * as React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import useTableId from '../../utils/useTableId';

type CopyButtonProps = {
  disabled: boolean;
};

function CopyButton({ disabled }: CopyButtonProps) {
  const tableId = useTableId();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const onClick = () => {
    const table = document.querySelector(`#${tableId}`);
    if (table) {
      const range = document.createRange();
      const selection = document.getSelection();

      selection?.removeAllRanges();

      try {
        range.selectNodeContents(table);
        selection?.addRange(range);
      } catch (e) {
        range.selectNode(table);
        selection?.addRange(range);
      }

      const string = selection?.toString();
      if (string) {
        navigator.clipboard.writeText(string).then(() => {
          setOpen(true);
        });
      }
      selection?.removeAllRanges();
    }
  };

  return (
    <>
      <Tooltip title="表をクリップボードにコピー">
        <span>
          <IconButton onClick={onClick} disabled={disabled}>
            <FileCopyIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Snackbar
        open={open}
        onClose={handleClose}
        message="クリップボードにコピーしました"
        autoHideDuration={2500}
        action={
          <Button color="secondary" size="small" onClick={handleClose}>
            OK
          </Button>
        }
      />
    </>
  );
}

export default CopyButton;
