import { useSelector, useDispatch } from "react-redux";
import { removeSaved } from "../features/saved/savedSlice";
import FoodCard from "../components/FoodCard";
import { Box, Container, Typography } from "@mui/material";

function SavedPage() {
  const savedItems = useSelector((state) => state.saved);
  const dispatch = useDispatch();

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Saved Foods
      </Typography>

      {savedItems.length === 0 ? (
        <Typography>No saved foods yet.</Typography>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {savedItems.map((food) => (
            <FoodCard
              key={food.id || food.code}
              food={food}
              isSaved={true}
              onRemove={(id) => dispatch(removeSaved(id))}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}

export default SavedPage;