import "./App.css";
import Sprite from "./Sprite";

export default function Cell(props) {
  const cellX = props.cellX;
  const cellY = props.cellY;

  const doesGreenSpriteExist = props.greenSprite;

  if (props.redX === cellX && props.redY === cellY) {
    return (
      <td key={`${cellY}-${cellX}-${Date.now()}`}>
        <Sprite color="red" />
      </td>
    );
  }

  if (doesGreenSpriteExist) {
    return (
      <td key={`${cellY}-${cellX}-${Date.now()}`}>
        <Sprite color="green" />
      </td>
    );
  }

  return <td key={`${cellY}-${cellX}-${Date.now()}`}></td>;
}
