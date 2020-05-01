import React, {useCallback, useEffect, useReducer} from 'react';

import './Clock.scss';
import {getCurrentDate, getDateString, getTimeString} from "../../Utils/DateTimeUtils";


const dateTimeReducer = (currState, action) => {
  return {
    date: getDateString(action.dateObj),
    time: getTimeString(action.dateObj),
  };
};

const Clock = (props) => {
  // cache tick function
  const tick = useCallback(() => {
    dispatch({dateObj: getCurrentDate()});
  }, []);

  // credit Joelambert https://gist.github.com/joelambert/1002116#gistcomment-1953925
  // turned out redundant, view making_a_clock.md
  const requestAnimation = useCallback((fn, delay = 0) => {
    const start = new Date().getTime();
    let handle;
    const loop = () => {
      const current = new Date().getTime();
      const delta = current - start;
      delta >= delay ? fn() : (handle = requestAnimationFrame(loop));
    };
    handle = requestAnimationFrame(loop);
    return handle;
  }, []);

  const [dateTimeState, dispatch] = useReducer(dateTimeReducer, {
    date: getDateString(getCurrentDate()),
    time: getTimeString(getCurrentDate()),
  });

  useEffect(() => {
    const requestRef = requestAnimation(tick);
    return () => cancelAnimationFrame(requestRef);
  });

  return (
      <div className={`clock ${props.clockClassNames&&props.clockClassNames}`}>
        <div className={`clock-time ${props.timeClassNames && props.timeClassNames}`}>
          {dateTimeState.time}
        </div>
        <div className={`clock-date ${props.dateClassNames && props.dateClassNames}`}>
          {dateTimeState.date}
        </div>
      </div>
  );
};

export default Clock;
