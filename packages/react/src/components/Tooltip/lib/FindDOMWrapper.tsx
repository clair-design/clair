import React, {
  FC,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { DOM, SharedDOMContext } from "@src/utils";
import PropTypes from "prop-types";

export const FindDOMWrapper: FC = props => {
  const nextSiblingRef = useRef<HTMLSpanElement>(null);
  const [shouldRenderNext, setShouldRenderNext] = useState(true);
  const { updateDom, dom } = useContext(SharedDOMContext);
  useEffect(() => {
    // haven't set dom
    if (nextSiblingRef.current && !dom) {
      const next = nextSiblingRef.current;
      updateDom(next.previousElementSibling as DOM);
      setShouldRenderNext(false);
    }
  }, [updateDom, dom]);
  let nextSibling: ReactNode = (
    <span ref={nextSiblingRef} style={{ display: "none" }} />
  );
  if (!shouldRenderNext) {
    nextSibling = null;
  }
  return (
    <>
      {props.children}
      {nextSibling}
    </>
  );
};

FindDOMWrapper.propTypes = {
  children: PropTypes.node.isRequired
};
