import React from 'react';
import '../GameScore/index.scss';

const GameScore = (props) => {
    const {countX, countO} = props;
    return (
        <div className="wrapGameScore">
            <div className='gameScore'>{`Winner X -----> ${countX}`}</div>
            <div className='gameScore'>{`Winner O -----> ${countO}`}</div>
        </div>
    )
}

export default GameScore;