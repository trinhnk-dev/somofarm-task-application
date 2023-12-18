import React from "react";
import DisplayEffort from "./DisplayEffort";

function Effort({
  effortVisible,
  handleEffortVisible,
  effort,
  isHaveSubTask
}) {
  return (
    <>
      <DisplayEffort
        effortVisible={effortVisible}
        handleEffortVisible={handleEffortVisible}
        effort={effort}
        isHaveSubTask={isHaveSubTask}
      />
    </>
  );
}

export default Effort;
