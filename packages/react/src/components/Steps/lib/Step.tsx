import React, { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { StepsContext } from "./Steps";
import { StepsContextType } from "./types";
import { IconCheckedCircle, IconCloseCircle } from "../../Icon";
const statuses = ["finish", "wait", "process", "error"] as const;
type Status = typeof statuses[number];
const statusPropType = PropTypes.oneOf([...statuses]);

const useIcon = (
  props: Pick<StepProps, "icon" | "stepKey">,
  currentStatus: Status
) => {
  const { icon, stepKey } = props;
  if (icon) return icon;
  if (currentStatus === "finish") return <IconCheckedCircle />;
  if (currentStatus === "error") return <IconCloseCircle />;
  return <span className="c-step__icon-num">{stepKey}</span>;
};

const useStatus = (
  props: Pick<StepProps, "status" | "stepKey"> &
    Pick<StepsContextType, "steps" | "currentKey">
) => {
  const { status, steps, stepKey, currentKey } = props;
  if (status) return status;
  const currentKeyIndex: number = steps
    ? steps.findIndex(item => {
        return item === currentKey;
      })
    : 1;
  const selfIndex: number = steps
    ? steps.findIndex(item => item === stepKey)
    : 1;
  if (selfIndex < currentKeyIndex) return "finish";
  else if (selfIndex === currentKeyIndex) return "process";
  return "wait";
};
const useStepKeyInitEffect = (
  props: Pick<StepProps, "stepKey"> &
    Pick<StepsContextType, "steps" | "changeStepsIds">
) => {
  const { stepKey, steps, changeStepsIds } = props;
  useEffect(() => {
    changeStepsIds({ type: "add", value: stepKey });
  }, [changeStepsIds, stepKey, steps]);
};

export const Step: React.FC<StepProps> = props => {
  const { title, description, status, icon, stepKey } = props;
  const { isDot, steps, currentKey, changeStepsIds } = useContext(StepsContext);
  useStepKeyInitEffect({ stepKey, steps, changeStepsIds });
  const currentStatus = useStatus({ status, steps, currentKey, stepKey });
  const currentIcon = useIcon({ icon, stepKey }, currentStatus);
  const iconOrDot = isDot ? (
    <div className="c-step__dot"></div>
  ) : (
    <div className="c-step__icon">{currentIcon}</div>
  );

  return (
    <div
      className={classnames("c-step", {
        "c-step--has-no-desc": !description,
        [`c-step--${currentStatus}`]: currentStatus
      })}
    >
      {iconOrDot}
      <div className="c-step__content">
        <div className="c-step__title">{title}</div>
        <div className="c-step__desc">{description}</div>
      </div>
    </div>
  );
};

Step.propTypes = {
  stepKey: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  icon: PropTypes.node,
  status: statusPropType
};

export interface StepProps {
  stepKey: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  status?: Status;
}
