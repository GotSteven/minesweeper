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
  const newUserInputs: (0 | 1 | 2 | 3)[][] = JSON.parse(JSON.stringify(userInputs));
  // [userInputs]
  // | 0 = 未クリック
  // | 1 = 左クリック
  // | 2 = 旗
  // | 3 = はてな

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
  const newBombMap: number[][] = JSON.parse(JSON.stringify(bombMap));
  // [bombMap]
  // | 0 = ボムなし
  // | 1 = ボムあり

  const board: number[][] = [
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
  ];
  // [board]
  // | -1 = 石
  // | 0 = 石なし表示なし
  // | 1~8 = 数字表示
  // | 9 = 石 + はてな
  // | 10 = 石 + 旗
  // | 11 = 爆弾

  let gameState = 0;
  // [GameState]
  // | 0 : スタート前
  // | 1 : ゲーム中
  // | 2 : ゲーム終了(クリア)
  // | 3 : ゲーム終了(爆発)

  const isPlaying = userInputs.some((row) => row.some((input) => input !== 0));
  if (isPlaying) gameState = 1;

  const isFailure = userInputs.some((row, y) =>
    row.some((input, x) => input === 1 && bombMap[y][x] === 1)
  );
  if (isFailure) {
    gameState = 3;
    console.log('爆破');
  }
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
  const checkClear = () => {
    let stoneCount = 0;
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (board[y][x] === -1 || board[y][x] === 9 || board[y][x] === 10) stoneCount++;
      }
    }
    if (stoneCount === 10) {
      gameState = 2;
      console.log('クリア');
    }
  };
  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  };
  const setBomb = (x: number, y: number) => {
    const r1 = getRandomInt(0, 9);
    const r2 = getRandomInt(0, 9);
    if (r1 === x && r2 === y) {
      setBomb(x, y);
    } else if (newBombMap[r1][r2] === 0) {
      newBombMap[r1][r2] = 1;
    } else {
      setBomb(x, y);
    }
  };
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

  const onRightClick = (x: number, y: number, event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
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
  };
  const onLeftClick = (x: number, y: number) => {
    if (gameState <= 1) {
      if (!isPlaying) {
        for (let i = 0; i < bombCount; i++) {
          setBomb(x, y);
        }
        setBombMap(newBombMap);
      }
      if (userInputs[y][x] === 0) {
        newUserInputs[y][x] = 1;
        setUserInputs(newUserInputs);
      }
    }
  };
  const makeBoard = () => {
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (userInputs[x][y] === 1) {
          if (bombMap[x][y] === 0) {
            checkAround(y, x);
          } else {
            board[x][y] = 11;
          }
        } else if (userInputs[x][y] === 2) {
          board[x][y] = 9;
        } else if (userInputs[x][y] === 3) {
          board[x][y] = 10;
        } else if (isFailure && bombMap[x][y] === 1) {
          board[x][y] = 11;
        }
      }
    }
  };
  makeBoard();
  checkClear();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {gameState <= 1 && (
          <div className={styles.icon} style={{ backgroundPosition: '-330px 0' }} />
        )}
        {gameState === 2 && (
          <div className={styles.icon} style={{ backgroundPosition: '-360px 0' }} />
        )}
        {gameState === 3 && (
          <div className={styles.icon} style={{ backgroundPosition: '-390px 0' }} />
        )}
      </div>
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
              {state === 10 && (
                <div className={styles.stone}>
                  <div className={styles.icon} style={{ backgroundPosition: '-240px 0' }} />
                </div>
              )}
              {state === 9 && (
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
