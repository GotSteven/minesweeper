import type { MouseEvent } from 'react';
import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [userInputs, setUserInputs] = useState<(0 | 1 | 2 | 3)[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const bombCount = 10;
  const [bombMap, setBombMap] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const isPlaying = userInputs.some((row) => row.some((input) => input !== 0));
  const isFailure = userInputs.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1)
  );
  const board: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  const directions = [
    [-1, 0],
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
  ];
  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }
  const setBomb = () => {
    const newBombMap: number[][] = JSON.parse(JSON.stringify(bombMap));
    for (let i = 0; i <= bombCount; ) {
      const r1 = getRandomInt(0, 8);
      const r2 = getRandomInt(0, 8);
      if (bombMap[r1][r2] === 0) {
        newBombMap[r1][r2] = 1;
        i++;
      }
    }
    setBombMap(newBombMap);
  };
  setBomb();
  const checkAround = (x: number, y: number) => {
    let bombs = 0;
    for (const [dy, dx] of directions) {
      if (
        bombMap[y + dy] !== undefined &&
        bombMap[y + dy][x + dx] !== undefined &&
        bombMap[y + dy][x + dx] === 1
      ) {
        bombs++;
      }
    }
    board[y][x] = bombs;
    if (bombs === 0) {
      for (const [dy, dx] of directions) {
        if (
          board[y + dy] !== undefined &&
          board[y + dy][x + dx] !== undefined &&
          (board[y + dy][x + dx] === -1 ||
            board[y + dy][x + dx] === 9 ||
            board[y + dy][x + dx] === 10)
        ) {
          checkAround(x + dx, y + dy);
        }
      }
    }
  };
  const makeBoard = () => {
    outer: for (let y = 0; y <= 8; y++) {
      for (let x = 0; x <= 8; x++) {
        if (bombMap[y][x] === 1) {
          board[y][x] = 11;
        }
        if (userInputs[y][x] === 0) {
          board[y][x] = -1;
        } else if (userInputs[y][x] === 1) {
          checkAround(x, y);
          break outer;
        } else if (userInputs[y][x] === 2) {
          board[y][x] = 9;
        } else if (userInputs[y][x] === 3) {
          board[y][x] = 10;
        }
      }
    }
  };
  makeBoard();

  const onRightClick = (x: number, y: number, event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    const newUserInputs: (0 | 1 | 2 | 3)[][] = JSON.parse(JSON.stringify(userInputs));
    switch (userInputs[y][x]) {
      case 0:
        newUserInputs[y][x] = 2;
        board[y][x] = 9;
        break;
      case 2:
        newUserInputs[y][x] = 3;
        board[y][x] = 10;
        break;
      case 3:
        newUserInputs[y][x] = 0;
        board[y][x] = -1;
        break;
    }
    setUserInputs(newUserInputs);
    makeBoard();
  };
  const onLeftClick = (x: number, y: number) => {
    if (board[y][x] === -1) {
      const newUserInputs: (0 | 1 | 2 | 3)[][] = JSON.parse(JSON.stringify(userInputs));
      newUserInputs[y][x] = 1;
      setUserInputs(newUserInputs);
      makeBoard();
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((state, x) => (
            <div
              className={styles.cell}
              key={`${x}-${y}`}
              onContextMenu={(event) => onRightClick(x, y, event)}
              onClick={() => onLeftClick(x, y)}
            >
              {state === -1 && <div className={styles.stone} />}
              {state === 1 && <div className={styles.icon} />}
              {state === 2 && (
                <div className={styles.icon} style={{ backgroundPosition: '-30px 0' }} />
              )}
              {state === 3 && (
                <div className={styles.icon} style={{ backgroundPosition: '-60px 0' }} />
              )}
              {state === 4 && (
                <div className={styles.icon} style={{ backgroundPosition: '-90px 0' }} />
              )}
              {state === 5 && (
                <div className={styles.icon} style={{ backgroundPosition: '-120px 0' }} />
              )}
              {state === 6 && (
                <div className={styles.icon} style={{ backgroundPosition: '-150px 0' }} />
              )}
              {state === 7 && (
                <div className={styles.icon} style={{ backgroundPosition: '-180px 0' }} />
              )}
              {state === 8 && (
                <div className={styles.icon} style={{ backgroundPosition: '-210px 0' }} />
              )}
              {state === 9 && (
                <div className={styles.stone}>
                  <div className={styles.icon} style={{ backgroundPosition: '-240px 0' }} />
                </div>
              )}
              {state === 10 && (
                <div className={styles.stone}>
                  <div className={styles.icon} style={{ backgroundPosition: '-270px 0' }} />
                </div>
              )}
              {state === 11 && (
                <div className={styles.icon} style={{ backgroundPosition: '-300px 0' }} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
