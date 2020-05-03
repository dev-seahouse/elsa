import React, { useCallback, useEffect, useReducer } from 'react';

import './Clock.scss';
import {
  getCurrentDate,
  getDateString,
  getTimeString,
} from '../../Utils/DateTimeUtils';

const dateTimeReducer = (currState, action) => {
  return {
    date: getDateString(action.dateObj),
    time: getTimeString(action.dateObj),
  };
};

const Clock = (props) => {
  const [dateTimeState, dispatch] = useReducer(dateTimeReducer, {
    date: getDateString(getCurrentDate()),
    time: getTimeString(getCurrentDate()),
  });

  // cache tick function
  const tick = useCallback(() => {
    setTimeout(() => {
      dispatch({ dateObj: getCurrentDate() });
      return requestAnimationFrame(tick);
    }, 500);
  }, []);

  useEffect(() => {
    const requestRef = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(requestRef);
  }, [tick]);

  return (
    <div className={`clock ${props.clockClassNames && props.clockClassNames}`}>
      <div
        className={`clock-time ${props.timeClassNames && props.timeClassNames}`}
      >
        {dateTimeState.time}
      </div>
      <div
        className={`clock-date ${props.dateClassNames && props.dateClassNames}`}
      >
        {dateTimeState.date}
      </div>
    </div>
  );
};

export default Clock;
