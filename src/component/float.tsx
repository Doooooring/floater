/** @jsxImportSource @emotion/react */

import { css, SerializedStyles } from "@emotion/react";
import {
  PropsWithChildren,
  RefObject,
  useCallback,
  useContext,
  useState,
} from "react";
import { FloatContext } from "../context/floatContext";

interface FloatProps extends PropsWithChildren {
  ref?: RefObject<HTMLDivElement>;
  initialX?: number;
  initialY?: number;
  onMoveStart?: (e: React.MouseEvent) => void;
  onMoveEnd?: (e: React.MouseEvent) => void;
  style?: SerializedStyles;
}

export default function Float({
  ref,
  children,
  initialX = 0,
  initialY = 0,
  onMoveStart,
  onMoveEnd,
  style,
  ...others
}: FloatProps) {
  const { getMaxZ } = useContext(FloatContext)!;

  const [floatZ, setFloatZ] = useState(0);

  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);

  const updateZ = useCallback(() => {
    const ne = getMaxZ();
    setFloatZ(ne);
  }, [setFloatZ, getMaxZ]);

  const mouseDownHandler = useCallback(
    (e: React.MouseEvent) => {
      console.log("is move start");

      if (onMoveStart) {
        onMoveStart(e);
      }

      updateZ();

      const target = e.currentTarget;
      const rect = target.getBoundingClientRect();

      const clientX = rect.left;
      const clientY = rect.top;

      const initialX = e.clientX;
      const initialY = e.clientY;

      const mouseMoveHandler = (e: MouseEvent) => {
        console.log("is move handler");

        const curX = e.clientX;
        const dx = curX - initialX;
        const curY = e.clientY;
        const dy = curY - initialY;

        setX(clientX + dx);
        setY(clientY + dy);
      };

      const endMouseMove = () => {
        window.removeEventListener("mousemove", mouseMoveHandler);
        if (onMoveEnd) {
          onMoveEnd(e);
        }
        console.log("is end");
      };

      window.addEventListener("mousemove", mouseMoveHandler);
      window.addEventListener("mouseup", endMouseMove, { once: true });
    },
    [updateZ, onMoveStart, onMoveEnd, setX, setY]
  );

  return (
    <div
      css={css`
        ${style}
        position: fixed;
        top: ${Math.round(y / 10) * 10}px;
        left: ${Math.round(x / 10) * 10}px;
        z-index: ${floatZ};
        cursor: move;
      `}
      className="float"
      {...others}
      onMouseDown={mouseDownHandler}
    >
      {children}
    </div>
  );
}
