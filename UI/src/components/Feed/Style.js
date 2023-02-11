/*
 * @author: Shivangi Bhatt
 *
 */
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  card: {
    border: "1px solid #ddd",
    margin: "15px",
    cursor: "pointer",
  },
  flex: {
    display: "flex",
    marginBottom: "15px",
    justifyContent: "space-between",
  },
  avatar: { marginRight: "20px" },
  social: {
    background: "rgba(255, 0, 0, 0.4)",
    color: "white",
    marginLeft: "10px",
  },
  moreIcon: {
    zIndex: 1000,
  },
  technical: {
    background: "rgba(0, 180, 255, 0.5)",
    color: "white",
    marginLeft: "20px",
  },
  lastRow: {
    display: "flex",
    marginTop: "20px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tags: {
    display: "flex",
  },
  tag: {
    marginLeft: "10px",
  },
  icon: {
    marginRight: "10px",
  },
  end: {
    display: "flex",
  },
  animationStory: {
    width: "100vw",
    height: "100vh",
    fontFamily: "sans-serif",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  PokemonSelector_Idle: {
    animation: "slide-out 0.5s ease-in-out",
    webkitTransform: "translateX(100%)",
    transform: "translateX(100%)",
    opacity: 0,
    pointerEvents: "none",
  },

  PokemonSelector_Active: {
    webkitAnimation: "slide-in 0.5s ease-in-out",
    animation: "slide-in 0.5s ease-in-out",
  },

  "@media (max-width: 960px)": {
    end: {
      display: "flex",
      justifyContent: "center",
    },
    tags: {
      display: "flex",
      justifyContent: "center",
    },
  },
});

export default useStyles;
