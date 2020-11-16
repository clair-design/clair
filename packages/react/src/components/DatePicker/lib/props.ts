/**
 * prop types validation for single picker and range picker
 */

import PropTypes from "prop-types";
import { WeekStartsOn } from "./interface";
import { PICKER_TYPES, SIZES } from "./constants";

const RawDate = PropTypes.oneOfType([
  PropTypes.instanceOf(Date),
  PropTypes.string,
  PropTypes.number
]);

const sharedProps = {
  type: PropTypes.oneOf(PICKER_TYPES),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  clearable: PropTypes.bool,
  size: PropTypes.oneOf(SIZES),
  className: PropTypes.string,
  style: PropTypes.object,
  format: PropTypes.string,
  shortcut: PropTypes.node,
  // eslint-disable-next-line no-magic-numbers
  firstDayOfWeek: PropTypes.oneOf<WeekStartsOn>([0, 1, 2, 3, 4, 5, 6]),
  shouldDisableCell: PropTypes.func,
  setCellClassName: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func
};

export const singlePickerProps = {
  value: RawDate,
  defaultValue: RawDate,
  placeholder: PropTypes.string,
  ...sharedProps
};

export const rangePickerProps = {
  value: PropTypes.arrayOf(RawDate.isRequired),
  defaultValue: PropTypes.arrayOf(RawDate.isRequired),
  placeholder: PropTypes.arrayOf(PropTypes.string.isRequired),
  ...sharedProps
};
