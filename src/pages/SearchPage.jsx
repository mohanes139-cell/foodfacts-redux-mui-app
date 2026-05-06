import { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addSaved, removeSaved } from "../features/saved/savedSlice";
import FoodCard from "../components/FoodCard";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  const savedItems = useSelector((state) => state.saved);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await axios.get(
        `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${query}&search_simple=1&action=process&json=1`
      );
      setFoods(res.data.products || []);
    } catch {
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const isSaved = (food) => {
    const foodId = food.id || food.code;
    return savedItems.some((item) => (item.id || item.code) === foodId);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 4,
          mb: 4,
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Discover Your Food Facts
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Search products, view nutrition details, and save your favorites.
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            label="Search food like milk, chips, oats..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            fullWidth
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <Button variant="contained" size="large" onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Paper>

      {loading && (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      )}

      {!loading && foods.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {foods.map((food) => (
            <FoodCard
              key={food.id || food.code}
              food={food}
              isSaved={isSaved(food)}
              onSave={(item) => dispatch(addSaved(item))}
              onRemove={(id) => dispatch(removeSaved(id))}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}

export default SearchPage;