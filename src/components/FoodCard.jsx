import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  CardMedia,
  Chip,
  Stack,
} from "@mui/material";

function FoodCard({ food, isSaved, onSave, onRemove }) {
  const foodId = food.id || food.code;
  const image = food.image_front_small_url || food.image_url;

  return (
    <Card
      sx={{
        width: 300,
        m: 2,
        borderRadius: 3,
        boxShadow: 4,
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 8,
        },
      }}
    >
      {image && (
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={food.product_name || "Food image"}
          sx={{ objectFit: "contain", p: 2 }}
        />
      )}

      <CardContent>
        <Typography variant="h6" noWrap>
          {food.product_name || food.name || "Unknown Food"}
        </Typography>

        <Typography color="text.secondary" noWrap>
          {food.brands || food.brand || "Unknown Brand"}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Chip
            label={food.nutriscore_grade ? `Nutri: ${food.nutriscore_grade.toUpperCase()}` : "No Score"}
            color="success"
            size="small"
          />
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button variant="outlined" component={Link} to={`/food/${foodId}`}>
          Details
        </Button>

        {isSaved ? (
          <Button variant="contained" color="error" onClick={() => onRemove(foodId)}>
            Remove
          </Button>
        ) : (
          <Button variant="contained" onClick={() => onSave(food)}>
            Save
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

export default FoodCard;