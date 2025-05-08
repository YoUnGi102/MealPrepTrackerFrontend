import React from 'react';
import { TotalMacros } from '@/types';
import MacroBar from '@/components/ui/MacroBar';
import './TotalMacrosView.css';
import NutrientIcons from './common/NutrientIcons';

interface Props {
  item: TotalMacros;
}

const itemView: React.FC<Props> = ({ item }) => {
  return (
    <div className="ingredient-item">
      <strong>TOTAL</strong>

      

      {/* <table className="ingredient-macros">
        <tbody>
          {[
            ['Protein', item.protein, 'green'],
            ['Fat', item.fat, 'green'],
            ['Carbs', item.carbs, 'green'],
            ['Sugar', item.sugar, 'green'],
            ['Calories', item.calories, 'blue'],
          ].map(([label, value, color]) => (
            <tr className="ingredient-macros-item" key={label}>
              <td>{label}</td>
              <td>
                <MacroBar
                  value={
                    Number(
                      label != 'Calories'
                        ? value
                        : Math.round(Number(value) / 9),
                    ) *
                    (100 / item.quantity)
                  }
                  color={color as string}
                />
              </td>
              <td>{`${value} ${label != 'Calories' ? ' g' : ' kCal'}`}</td>
            </tr>
          ))}
        </tbody> 
      </table> */}
    </div>
  );
};

export default itemView;
