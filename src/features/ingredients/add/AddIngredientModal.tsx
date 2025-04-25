import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addIngredient } from "../ingredientsSlice";
import { IngredientRequest } from "@/types";
import { AppDispatch } from "@/app/store";
import './AddIngredientModal.css'

export const AddIngredientModal = () => {
    const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState<IngredientRequest>({
    name: "",
    type: "",
    protein: "",
    fat: "",
    carbs: "",
    sugar: "",
    calories: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Submitting ingredient:", form);
    dispatch(addIngredient(form as IngredientRequest));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button
        className="add-btn"
        variant="default"
      >
      +
      </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Ingredient</DialogTitle>
        </DialogHeader>

        {[
          ["name", "Name"],
          ["type", "Type"],
          ["protein", "Protein (g)"],
          ["fat", "Fat (g)"],
          ["carbs", "Carbs (g)"],
          ["sugar", "Sugar (g)"],
          ["calories", "Calories (kCal)"]
        ].map(([key, label]) => (
          <div key={key} className="grid gap-1">
            <Label htmlFor={key}>{label}</Label>
            <Input
              id={key}
              name={key}
              value={(form as IngredientRequest)[key as keyof IngredientRequest]}
              onChange={handleChange}
              placeholder={label as string}
              type={key === "image" ? "url" : "text"}
            />
          </div>
        ))}

        <DialogFooter className="mt-4">
        <Button className="Button" variant="default" onClick={handleSubmit}>Save</Button>
          <DialogClose asChild>
            <Button className="Button" type="button" variant="destructive">
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddIngredientModal;