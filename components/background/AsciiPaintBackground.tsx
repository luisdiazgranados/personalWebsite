"use client";

import { useEffect, useRef } from "react";

type AsciiCell = {
  x: number;
  y: number;
  col: number;
  char: string;
  opacity: number;
  isFalling: boolean;
};

const ASCII_CHARS = ["0", "1", "{", "}", "<", ">", "/", "\\", "+", "-", "."];

const CELL_SIZE = 14;
const FONT_SIZE = 10;

const MIN_BRUSH_RADIUS = 16;
const MAX_BRUSH_RADIUS = 38;

const BASE_OPACITY = 0.32;
const MAX_OPACITY = 0.5;

const FADE_DELAY_AFTER_STOP = 500;

const MIN_COLUMN_FALL_SPEED = 7.5;
const MAX_COLUMN_FALL_SPEED = 9;

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

export default function AsciiPaintBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cellsRef = useRef<Map<string, AsciiCell>>(new Map());
  const columnSpeedsRef = useRef<Map<number, number>>(new Map());

  const previousMouseRef = useRef<{
    x: number;
    y: number;
    time: number;
  } | null>(null);

  const animationFrameRef = useRef<number | null>(null);
  const lastSpawnTimeRef = useRef<number>(0);
  const lastMouseMoveTimeRef = useRef<number>(0);
  const isMouseDownRef = useRef(false);

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
      columnSpeedsRef.current.clear();
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
          const cellX = col * CELL_SIZE;
          const cellY = row * CELL_SIZE;

          const dx = cellX - mouseX;
          const dy = cellY - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > brushRadius) continue;

          const key = `${col},${row}`;
          const distanceFactor = 1 - distance / brushRadius;

          getColumnSpeed(col);

          cellsRef.current.set(key, {
            x: cellX,
            y: cellY,
            col,
            char: getRandomChar(),
            opacity:
              BASE_OPACITY + distanceFactor * (MAX_OPACITY - BASE_OPACITY),
            isFalling: false,
          });
        }
      }
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

    const animate = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);

      context.font = `${FONT_SIZE}px "Authentic Sans", Arial, Helvetica, sans-serif`;
      context.textBaseline = "middle";
      context.textAlign = "center";

      const now = performance.now();
      const timeSinceLastMove = now - lastMouseMoveTimeRef.current;
      const shouldFall = timeSinceLastMove > FADE_DELAY_AFTER_STOP;

      for (const [key, cell] of cellsRef.current) {
        if (shouldFall) {
          cell.isFalling = true;
        }

        if (cell.isFalling) {
          const columnSpeed = getColumnSpeed(cell.col);
          cell.y += columnSpeed;
        }

        if (cell.y > window.innerHeight + CELL_SIZE) {
          cellsRef.current.delete(key);
          continue;
        }

        context.fillStyle = `rgba(255, 255, 255, ${cell.opacity})`;
        context.fillText(cell.char, cell.x, cell.y);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
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