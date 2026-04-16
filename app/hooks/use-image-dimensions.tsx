import { useState, useEffect, useCallback, useRef } from "react";

export type ImageDimension = {
  src: string;
  width: number;
  height: number;
  ratio: number;
};

export type GridCell = {
  src: string;
  alt: string;
  colStart: number;
  colSpan: number;
  rowStart: number;
  rowSpan: number;
};

export function useImageDimensions(imageSrcs: string[], shuffleKey: number) {
  const [cells, setCells] = useState<GridCell[]>([]);
  const [loading, setLoading] = useState(true);
  const dimCache = useRef<Map<string, ImageDimension>>(new Map());

  const measure = useCallback(async (srcs: string[]) => {
    const results: ImageDimension[] = [];
    for (const src of srcs) {
      if (dimCache.current.has(src)) {
        results.push(dimCache.current.get(src)!);
        continue;
      }

      const dim = await new Promise<ImageDimension>((resolve) => {
        const img = new Image();
        img.onload = () => {
          const d: ImageDimension = {
            src,
            width: img.naturalWidth,
            height: img.naturalHeight,
            ratio: img.naturalWidth / img.naturalHeight,
          };
          dimCache.current.set(src, d);
          resolve(d);
        };
        img.onerror = () => {
          const d: ImageDimension = { src, width: 400, height: 400, ratio: 1 };
          dimCache.current.set(src, d);
          resolve(d);
        };
        img.src = src;
      });
      results.push(dim);
    }
    return results;
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    measure(imageSrcs).then((dims) => {
      if (cancelled) return;

      const shuffled = [...dims];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }

      const packed = packGrid(shuffled, 3, 4);
      setCells(packed);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [imageSrcs.join(","), shuffleKey, measure]);

  return { cells, loading };
}

function packGrid(dims: ImageDimension[], cols: number, maxRows: number): GridCell[] {
  const occupied: boolean[][] = Array.from({ length: maxRows }, () =>
    Array(cols).fill(false)
  );
  const cells: GridCell[] = [];

  for (const dim of dims) {
    let colSpan = 1;
    let rowSpan = 1;

    if (dim.ratio < 0.75) {
      colSpan = 1;
      rowSpan = 2;
    } else if (dim.ratio > 1.5) {
      colSpan = 2;
      rowSpan = 1;
    }

    let placed = tryPlace(occupied, cols, maxRows, colSpan, rowSpan, dim, cells);

    if (!placed && (colSpan !== 1 || rowSpan !== 1)) {
      placed = tryPlace(occupied, cols, maxRows, 1, 1, dim, cells);
    }
  }

  let fillIdx = 0;
  for (let r = 0; r < maxRows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!occupied[r][c]) {
        occupied[r][c] = true;
        const fillDim = dims[fillIdx % dims.length];
        cells.push({
          src: fillDim.src,
          alt: "",
          colStart: c + 1,
          colSpan: 1,
          rowStart: r + 1,
          rowSpan: 1,
        });
        fillIdx++;
      }
    }
  }

  return cells;
}

function tryPlace(
  occupied: boolean[][],
  cols: number,
  maxRows: number,
  colSpan: number,
  rowSpan: number,
  dim: ImageDimension,
  cells: GridCell[]
): boolean {
  for (let r = 0; r <= maxRows - rowSpan; r++) {
    for (let c = 0; c <= cols - colSpan; c++) {
      if (canPlace(occupied, r, c, rowSpan, colSpan)) {
        for (let dr = 0; dr < rowSpan; dr++) {
          for (let dc = 0; dc < colSpan; dc++) {
            occupied[r + dr][c + dc] = true;
          }
        }
        cells.push({
          src: dim.src,
          alt: "",
          colStart: c + 1,
          colSpan,
          rowStart: r + 1,
          rowSpan,
        });
        return true;
      }
    }
  }
  return false;
}

function canPlace(
  occupied: boolean[][],
  row: number,
  col: number,
  rowSpan: number,
  colSpan: number
): boolean {
  for (let dr = 0; dr < rowSpan; dr++) {
    for (let dc = 0; dc < colSpan; dc++) {
      if (occupied[row + dr][col + dc]) return false;
    }
  }
  return true;
}
