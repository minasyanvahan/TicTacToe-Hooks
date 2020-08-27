import React, { useState,useEffect } from 'react';
import '../TicTacToe/index.scss';
import GameScore from '../GameScore/index';
import photoX from '../Images/cross.png';
import photo0 from '../Images/zero.png';

// const indexX = [];
// const index0 = [];
const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const TicTacToe = () => {
    const [isX, setisX] = useState(true);
    const [xWin, setxWin] = useState(false);
    const [OWin, setOWin] = useState(false);
    const [countX, setCountX] = useState(0);
    const [countO, setCountO ] = useState(0);
    const [players, setplayers] = useState({
        indexX: [],
        indexO: [], 
    })
    const setImages = (i) => {
        if (players.indexX.includes(i) || players.indexO.includes(i)) {
            return (
                players.indexX.includes(i) ? 
                <img src={photoX} className='clickImagesX' alt='X'/> : 
                <img src={photo0} className='clickImages0' alt='0'/>
            )
        }
    }
    const creatDivs = () => {
        const getsDivArray = [];
        for(let i = 0; i < 9; i++) {
            getsDivArray.push(<div key={i} className="squares" onClick={clickSquares(i)}>{setImages(i)}</div>);
        }
        return getsDivArray;
    }

    const reset = () => {
        setxWin(false);
        setOWin(false);
        setisX(true);
        setplayers({
            indexX: [],
            indexO: [], 
        })
    }

    const clickSquares = (i) => () => {
        if(!xWin && !OWin) {
            if (!(players.indexX.includes(i) || players.indexO.includes(i))) {
                if (isX) {
                    setplayers(state => ({...state, indexX: [...state.indexX, i] }))
                } else {
                    setplayers(state => ({...state, indexO: [...state.indexO, i] }))
                }
            }
            setisX(!isX);
            console.log(!isX)
        }
    }

    useEffect(() => {
        if((players.indexX.length >= 3) || (players.indexO.length >= 3)) {
            console.log(!isX)
            const stepX = !isX;
            winningLines.some(el => {
                let i = 0;
                el.forEach(winIndex => {
                    if (players[stepX ? 'indexX' : 'indexO'].includes(winIndex)) {
                        i++;
                    }
                })
                const isWinner = (i === el.length);
                if (isWinner) {
                    let count = (stepX ? countX : countO);
                    (stepX ? setxWin : setOWin)(isWinner);
                    (stepX ? setCountX : setCountO)(++count);
                    return isWinner;
                }
           })
        }
    }, [isX])
   
    return (
        <div className='wrapper'>
            <div className="reset">
                <button className='resetButton' onClick={reset}>RESET</button>
            </div>
            <div className='childWrapper'>
                {creatDivs()}
            </div>
            <GameScore xWin={xWin} countX={countX} OWin={OWin} countO={countO}/>
        </div>
    )
}

export default TicTacToe;