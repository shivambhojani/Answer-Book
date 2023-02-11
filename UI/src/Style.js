import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  flex: {
    display: "flex",
    justifyContent: "space-between",
  },
  menus: {
    marginRight: "10px",
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  margin: {
    margin: "15px",
  },
  cancel: {
    backgroundColor: "gray !important",
    marginLeft: "15px !important",
  },
  searchBox: {
    margin: "5px !important",
    outline: "white !important  ",
  },
  searchInput: {
    color: "white !important",
    borderColor: "white !important",
  },
  searchIcon: {
    color: "white",
  },
});

export default useStyles;
