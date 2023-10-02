import React from "react";

const Task = ({ title, status }) => {
    return (
        <div className="task">
            <h5 className="font-semibold">{title}</h5>
            <div className="bottom-wrapper">
                <div></div>
                <div className={`status ${status}`}>{status}</div>
            </div>
        </div>
    );
};

export default Task;
