import { Macros } from "@/types";
import styles from "./NutrientIcons.module.scss";

const nutrients = [
  { name: "Protein", emoji: "🥩", key: "protein" },
  { name: "Carbohydrates", emoji: "🍞", key: "carbs" },
  { name: "Sugar", emoji: "🍬", key: "sugar" },
  { name: "Fat", emoji: "🥑", key: "fat" },
  { name: "Calories", emoji: "🔥", key: "calories" },
];

const NutrientIcons = ({macros} : {macros: Macros}) => {
  return (
    <div className={styles.container}>
      {nutrients.map((nutrient) => (
        <div key={nutrient.name} className={styles.emojiWrapper}>
          <span className={styles.emoji} title={nutrient.name}>
            {nutrient.emoji}
          </span>
          <span className={styles.value}>
            {macros[nutrient.key as keyof Macros]}
            {nutrient.key === "calories" ? " kcal" : "g"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default NutrientIcons;
