import React from 'react';
import cx from 'classnames';
import compose from 'recompose/compose';
import defaultProps from 'recompose/defaultProps';
import mapPropsOnChange from 'recompose/mapPropsOnChange';
import tooltipStyles from './Tooltip.sass';

export const tooltipComp = ({ styles, children, tooltip }) => (
  <div
    className={styles.main}
  >
    {children}
    <div className={styles.tooltip}>
      { tooltip }
    </div>
  </div>
);

export const tooltipHOC = compose(
  defaultProps({
    styles: tooltipStyles,
    // top, top-left, top-right, bottom, bottom-left, bottom-right
    position: 'top',
    type: 'info', // error,
    always: false,
    hoverable: false,
  }),
  mapPropsOnChange(
    ['position', 'type', 'always', 'hoverable', 'hidden', 'styles'],
    ({ position, type, always, hoverable, hidden, styles }) => ({
      styles: {
        ...styles,
        main: cx({
          [styles.main]: true,
          [styles[`hint--${type}`]]: true,
          [styles[`hint--${position}`]]: true,
          [styles[`hint--always`]]: always,
          [styles[`hint--hoverable`]]: hoverable,
          [styles[`hint--hidden`]]: hidden,
        }),
      },
    })
  )
);

export default tooltipHOC(tooltipComp);
