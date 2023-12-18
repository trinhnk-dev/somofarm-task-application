import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHorse,
  faSeedling,
  faTree,
  faCow,
} from "@fortawesome/free-solid-svg-icons";

function SecondModal({ type, onOptionSelect }) {
  const handleOptionSelect = (option) => {
    onOptionSelect(option);
  };
  if (type === "livestock") {
    return (
      <div className="second-modal-livestock">
        <div className="specific-animal">
          <button onClick={() => handleOptionSelect("specificAnimal")}>
            <div className="button-item">
              <div className="button-icon">
                <FontAwesomeIcon icon={faHorse} />
              </div>

              <div className="button-text">
                <h6>Con vật cụ thể</h6>
                <span>Thêm công việc cho con vật cụ thể</span>
              </div>
            </div>
          </button>
        </div>
        <div className="whole-barn">
          <button onClick={() => handleOptionSelect("wholeBarn")}>
            <div className="button-item">
              <div className="button-icon">
                <FontAwesomeIcon icon={faCow} />
              </div>

              <div className="button-text">
                <h6>Cả chuồng</h6>
                <span>Thêm công việc cho cả chuồng</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  } else if (type === "planting") {
    return (
      <div className="second-modal-planting">
        <div className="specific-plant">
          <button onClick={() => handleOptionSelect("specificPlant")}>
            <div className="button-item">
              <div className="button-icon">
                <FontAwesomeIcon icon={faTree} />
              </div>

              <div className="button-text">
                <h6>Cây trồng cụ thể</h6>
                <span>Thêm công việc cho cây trồng cụ thể</span>
              </div>
            </div>
          </button>
        </div>
        <div className="whole-garden">
          <button onClick={() => handleOptionSelect("wholeGarden")}>
            <div className="button-item">
              <div className="button-icon">
                <FontAwesomeIcon icon={faSeedling} />
              </div>

              <div className="button-text">
                <h6>Cả vườn</h6>
                <span>Thêm công việc cho cả vườn</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    );
  }
  handleOptionSelect("other");
  return null;
}

export default SecondModal;
