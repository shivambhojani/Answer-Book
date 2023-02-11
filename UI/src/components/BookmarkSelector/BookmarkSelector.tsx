import { useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
// import bmListData from "../../data/dummy-bookmark-lists.json";
import { BookmarkList } from "../../models";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { bookmarkService } from "../../services";

const filter = createFilterOptions<{
  id?: string;
  name: string;
  inputValue?: string;
  getOptionLabel?: string;
}>();

interface Props {
  postId: string;
  addPostToBookmarkList: (postId: string, addToBookmarkListName: string) => any;
  bookmarkListNames: Array<{
    id?: string;
    name: string;
    inputValue?: string;
    getOptionLabel?: string;
  }>;
}

const BookmarkSelector: React.FC<Props> = ({
  postId,
  addPostToBookmarkList,
  bookmarkListNames,
}) => {
  console.log("the ll::", bookmarkListNames);
  const [value, setValue] = useState<{
    id?: string;
    name: string;
    inputValue?: string;
    getOptionLabel?: string;
  } | null>(null);
  const [open, toggleOpen] = useState(false);

  const handleClose = () => {
    setDialogValue({
      name: "",
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = useState({
    name: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue({
      name: dialogValue.name,
    });

    const bmListName: string = dialogValue.name;
    addPostToBookmarkList(postId, bmListName);
    toast.success(`${dialogValue.name} is now added to the list`);
    handleClose();
  };

  return (
    <>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          const newInputValue = newValue;

          if (typeof newInputValue === "object") {
            const bmListNameSelected = newInputValue!.name;

            for (let bmLN of bookmarkListNames) {
              if (bmLN.name === bmListNameSelected) {
                addPostToBookmarkList(postId, bmListNameSelected);
                toast.success(`${dialogValue.name} is now added to the list`);
              }
            }
          }

          if (typeof newValue === "string") {
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                name: newValue,
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              name: newValue.inputValue,
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={bookmarkListNames}
        getOptionLabel={option => {
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.name}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={params => (
          <TextField {...params} label="Bookmark list name" />
        )}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new bookmark list</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Wanna add a new list to your collection, go ahead!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={event =>
                setDialogValue({
                  ...dialogValue,
                  name: event.target.value,
                })
              }
              label="Bookmark list name"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default BookmarkSelector;
