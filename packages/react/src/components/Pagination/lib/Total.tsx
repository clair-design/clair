import React from "react";
import { TotalProps } from "./types";

const Total = ({ total }: TotalProps) => (
  <div className="c-pagination__total">
    总共
    <em> {total} </em>条
  </div>
);

export default React.memo(Total);
