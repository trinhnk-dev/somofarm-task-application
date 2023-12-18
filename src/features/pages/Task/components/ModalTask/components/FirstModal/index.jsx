import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHorse, faSeedling, faPersonDigging } from "@fortawesome/free-solid-svg-icons";

function FirstModal({ onNext }) {
  const handleSelection = (type) => {
    onNext(type);
  };

  const handleOther = () => {
    onNext("other");
  };

  return (
    <div className="first-modal">
      <div className="livestock">
        <button onClick={() => handleSelection("livestock")}>
          <div className="button-item">
            <div className="button-icon">
              <FontAwesomeIcon icon={faHorse} />
            </div>

            <div className="button-text">
              <h6>Chăn nuôi</h6>
              <span>Thêm công việc cho lĩnh vực chăn nuôi</span>
            </div>
          </div>
        </button>
      </div>
      <div className="planting">
        <button onClick={() => handleSelection("planting")}>
        <div className="button-item">
            <div className="button-icon">
            <FontAwesomeIcon icon={faSeedling} />
            </div>

            <div className="button-text">
              <h6>Trồng trọt</h6>
              <span>Thêm công việc cho lĩnh vực trồng trọt</span>
            </div>
          </div>
        </button>
      </div>
      <div className="other">
        <button onClick={() => handleSelection("other")}>
        <div className="button-item">
            <div className="button-icon">
            <FontAwesomeIcon icon={faPersonDigging} />
            </div>

            <div className="button-text">
              <h6>Khác</h6>
              <span>Thêm công việc khác</span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default FirstModal;