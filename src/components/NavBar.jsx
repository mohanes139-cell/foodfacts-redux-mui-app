import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Badge,
  Box,
} from "@mui/material";

function NavBar() {
  const savedItems = useSelector((state) => state.saved);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          FoodFacts
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Search
          </Button>

          <Badge badgeContent={savedItems.length} color="secondary">
            <Button color="inherit" component={Link} to="/saved">
              Saved
            </Button>
          </Badge>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;