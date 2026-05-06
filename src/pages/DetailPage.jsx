import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addSaved, removeSaved } from "../features/saved/savedSlice";
import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";

function DetailPage() {
  const { id } = useParams();
  const [food, setFood] = useState(null);

  const savedItems = useSelector((state) => state.saved);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFood = async () => {
      const res = await axios.get(
        `https://world.openfoodfacts.org/api/v2/product/${id}.json`
      );

      setFood(res.data.product);
    };

    fetchFood();
  }, [id]);

  if (!food) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  const foodId = food.id || food.code;

  const isSaved = savedItems.some(
    (item) => (item.id || item.code) === foodId
  );

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {food.product_name || "Unknown Food"}
          </Typography>

          <Typography>Brand: {food.brands || "Unknown"}</Typography>
          <Typography>Quantity: {food.quantity || "N/A"}</Typography>
          <Typography>Categories: {food.categories || "N/A"}</Typography>

          {isSaved ? (
            <Button
              sx={{ mt: 2 }}
              color="error"
              variant="contained"
              onClick={() => dispatch(removeSaved(foodId))}
            >
              Remove
            </Button>
          ) : (
            <Button
              sx={{ mt: 2 }}
              color="primary"
              variant="contained"
              onClick={() => dispatch(addSaved(food))}
            >
              Save
            </Button>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default DetailPage;