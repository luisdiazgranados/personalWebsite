"use client";

import { useEffect, useRef } from "react";

type CellState = "painted" | "falling" | "landed" | "droppingThrough";

type AsciiCell = {
  id: string;
  x: number;
  y: number;
  col: number;
  row: number;
  char: string;
  opacity: number;
  state: CellState;
  landedAt: number | null;
};

const ASCII_CHARS = ["0", "1", "{", "}", "<", ">", "/", "\\", "+", "-", "."];

const CELL_SIZE = 16;
const FONT_SIZE = 11;

const MIN_BRUSH_RADIUS = 12;
const MAX_BRUSH_RADIUS = 32;

const BASE_OPACITY = 0.18;
const MAX_OPACITY = 0.32;

const FADE_DELAY_AFTER_STOP = 1300;

const MIN_COLUMN_FALL_SPEED = 39;
const MAX_COLUMN_FALL_SPEED = 42;

const SAND_GATHER_TIME = 1200;
const FALL_THROUGH_SPEED = 47;

const SIDE_SPREAD_CHANCE = 0.7;

const MAX_CELLS = 2400;
const PAINT_DENSITY = 0.6;
const FRAME_INTERVAL = 1000 / 30;
const SAND_COLLISION_ZONE = 220;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getRandomChar() {
  return ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
}

function getRandomColumnSpeed() {
  return (
    MIN_COLUMN_FALL_SPEED +
    Math.random() * (MAX_COLUMN_FALL_SPEED - MIN_COLUMN_FALL_SPEED)
  );
}

function makeCellKey(col: number, row: number) {
  return `${col},${row}`;
}

export default function AsciiPaintBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const cellsRef = useRef<Map<string, AsciiCell>>(new Map());
  const landedGridRef = useRef<Map<string, string>>(new Map());
  const columnSpeedsRef = useRef<Map<number, number>>(new Map());

  const previousMouseRef = useRef<{
    x: number;
    y: number;
    time: number;
  } | null>(null);

  const animationFrameRef = useRef<number | null>(null);
  const lastSpawnTimeRef = useRef<number>(0);
  const lastMouseMoveTimeRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const isMouseDownRef = useRef(false);
  const idCounterRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      cellsRef.current.clear();
      landedGridRef.current.clear();
      columnSpeedsRef.current.clear();
    };

    const getBottomRow = () => {
      return Math.floor((window.innerHeight - CELL_SIZE / 2) / CELL_SIZE);
    };

    const getColumnSpeed = (col: number) => {
      const existingSpeed = columnSpeedsRef.current.get(col);

      if (existingSpeed !== undefined) {
        return existingSpeed;
      }

      const newSpeed = getRandomColumnSpeed();
      columnSpeedsRef.current.set(col, newSpeed);

      return newSpeed;
    };

    const isBlocked = (col: number, row: number) => {
      const bottomRow = getBottomRow();

      if (row > bottomRow) return true;

      return landedGridRef.current.has(makeCellKey(col, row));
    };

    const landCell = (cell: AsciiCell, now: number) => {
      const bottomRow = getBottomRow();

      cell.state = "landed";
      cell.row = clamp(cell.row, -9999, bottomRow);
      cell.y = cell.row * CELL_SIZE;
      cell.x = cell.col * CELL_SIZE;
      cell.landedAt = now;

      landedGridRef.current.set(makeCellKey(cell.col, cell.row), cell.id);
    };

    const trySettleLikeSand = (cell: AsciiCell, now: number) => {
      const currentRow = Math.round(cell.y / CELL_SIZE);
      const currentCol = Math.round(cell.x / CELL_SIZE);

      cell.row = currentRow;
      cell.col = currentCol;

      const belowRow = currentRow + 1;

      if (!isBlocked(currentCol, belowRow)) {
        return false;
      }

      const directions = Math.random() < 0.5 ? [-1, 1] : [1, -1];

      for (const direction of directions) {
        const sideCol = currentCol + direction;
        const diagonalRow = currentRow + 1;

        const canSlideSideways =
          Math.random() < SIDE_SPREAD_CHANCE &&
          !isBlocked(sideCol, diagonalRow);

        if (canSlideSideways) {
          cell.col = sideCol;
          cell.row = diagonalRow;
          cell.x = sideCol * CELL_SIZE;
          cell.y = diagonalRow * CELL_SIZE;
          return false;
        }
      }

      landCell(cell, now);
      return true;
    };

    const removeOldestCellsIfNeeded = () => {
      if (cellsRef.current.size <= MAX_CELLS) return;

      const overflow = cellsRef.current.size - MAX_CELLS;

      const removableKeys = Array.from(cellsRef.current.entries())
        .filter(([, cell]) => cell.state === "droppingThrough")
        .map(([key]) => key)
        .slice(0, overflow);

      for (const key of removableKeys) {
        cellsRef.current.delete(key);
      }

      if (cellsRef.current.size <= MAX_CELLS) return;

      const remainingOverflow = cellsRef.current.size - MAX_CELLS;

      const fallbackKeys = Array.from(cellsRef.current.entries())
        .filter(([, cell]) => cell.state !== "painted")
        .map(([key]) => key)
        .slice(0, remainingOverflow);

      for (const key of fallbackKeys) {
        const cell = cellsRef.current.get(key);

        if (cell?.state === "landed") {
          landedGridRef.current.delete(makeCellKey(cell.col, cell.row));
        }

        cellsRef.current.delete(key);
      }
    };

    const activateGridCells = (
      mouseX: number,
      mouseY: number,
      brushRadius: number
    ) => {
      const startCol = Math.floor((mouseX - brushRadius) / CELL_SIZE);
      const endCol = Math.floor((mouseX + brushRadius) / CELL_SIZE);
      const startRow = Math.floor((mouseY - brushRadius) / CELL_SIZE);
      const endRow = Math.floor((mouseY + brushRadius) / CELL_SIZE);

      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          if (Math.random() > PAINT_DENSITY) continue;

          const cellX = col * CELL_SIZE;
          const cellY = row * CELL_SIZE;

          const dx = cellX - mouseX;
          const dy = cellY - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > brushRadius) continue;

          const gridKey = makeCellKey(col, row);

          if (landedGridRef.current.has(gridKey)) continue;

          const distanceFactor = 1 - distance / brushRadius;
          const id = `cell-${idCounterRef.current++}`;

          getColumnSpeed(col);

          cellsRef.current.set(id, {
            id,
            x: cellX,
            y: cellY,
            col,
            row,
            char: getRandomChar(),
            opacity:
              BASE_OPACITY + distanceFactor * (MAX_OPACITY - BASE_OPACITY),
            state: "painted",
            landedAt: null,
          });
        }
      }

      removeOldestCellsIfNeeded();
    };

    const handleMouseDown = () => {
      isMouseDownRef.current = true;
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
    };

    const handleMouseLeave = () => {
      isMouseDownRef.current = false;
    };

    const handleMouseMove = (event: MouseEvent) => {
      const now = performance.now();
      lastMouseMoveTimeRef.current = now;

      if (isMouseDownRef.current) {
        previousMouseRef.current = {
          x: event.clientX,
          y: event.clientY,
          time: now,
        };
        return;
      }

      if (now - lastSpawnTimeRef.current < 16) return;
      lastSpawnTimeRef.current = now;

      const currentX = event.clientX;
      const currentY = event.clientY;

      const previous = previousMouseRef.current;

      if (!previous) {
        previousMouseRef.current = {
          x: currentX,
          y: currentY,
          time: now,
        };
        return;
      }

      const dx = currentX - previous.x;
      const dy = currentY - previous.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const deltaTime = Math.max(now - previous.time, 1);
      const speed = distance / deltaTime;

      const normalizedSpeed = clamp(speed / 5, 0, 1);

      const brushRadius =
        MAX_BRUSH_RADIUS -
        normalizedSpeed * (MAX_BRUSH_RADIUS - MIN_BRUSH_RADIUS);

      const steps = Math.max(1, Math.ceil(distance / (CELL_SIZE * 0.5)));

      for (let i = 0; i <= steps; i++) {
        const t = i / steps;

        const interpolatedX = previous.x + dx * t;
        const interpolatedY = previous.y + dy * t;

        activateGridCells(interpolatedX, interpolatedY, brushRadius);
      }

      previousMouseRef.current = {
        x: currentX,
        y: currentY,
        time: now,
      };
    };

    const startDroppingPileIfReady = (now: number) => {
      for (const cell of cellsRef.current.values()) {
        if (
          cell.state === "landed" &&
          cell.landedAt !== null &&
          now - cell.landedAt > SAND_GATHER_TIME
        ) {
          cell.state = "droppingThrough";
          landedGridRef.current.delete(makeCellKey(cell.col, cell.row));
        }
      }
    };

    const animate = (timestamp: number) => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (timestamp - lastFrameTimeRef.current < FRAME_INTERVAL) {
        return;
      }

      lastFrameTimeRef.current = timestamp;

      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      context.font = `${FONT_SIZE}px "Authentic Sans", Arial, Helvetica, sans-serif`;
      context.textBaseline = "middle";
      context.textAlign = "center";

      const now = performance.now();
      const timeSinceLastMove = now - lastMouseMoveTimeRef.current;
      const shouldStartNewFall = timeSinceLastMove > FADE_DELAY_AFTER_STOP;

      if (shouldStartNewFall) {
        startDroppingPileIfReady(now);
      }

      for (const [id, cell] of cellsRef.current) {
        if (shouldStartNewFall && cell.state === "painted") {
          cell.state = "falling";
        }

        if (cell.state === "falling") {
          const columnSpeed = getColumnSpeed(cell.col);
          cell.y += columnSpeed;

          const nearBottom = cell.y > window.innerHeight - SAND_COLLISION_ZONE;

          if (nearBottom) {
            trySettleLikeSand(cell, now);
          }
        }

        if (cell.state === "droppingThrough") {
          cell.y += FALL_THROUGH_SPEED;
        }

        if (cell.y > window.innerHeight + CELL_SIZE) {
          if (cell.state === "landed") {
            landedGridRef.current.delete(makeCellKey(cell.col, cell.row));
          }

          cellsRef.current.delete(id);
          continue;
        }

        const isLightMode =
          !document.documentElement.classList.contains("dark-mode");

        context.fillStyle = isLightMode
          ? `rgba(0, 122, 255, ${cell.opacity})`
          : `rgba(130, 150, 170, ${cell.opacity})`;

        context.fillText(cell.char, cell.x, cell.y);
      }

      if (cellsRef.current.size === 0) {
        landedGridRef.current.clear();
      }
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseLeave);

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseLeave);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}