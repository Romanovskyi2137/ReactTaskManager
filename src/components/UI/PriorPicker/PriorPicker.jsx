import React from "react";

function PriorPicker (props) {
    const styles = {
        margin: "15px"
    }
    const  iOnClick = (e, number) => {
        e.stopPropagation();
        return props.setNewTask(number)
    }
    return (
        <div>
            <i className="fi fi-ss-flame" style={styles}  onClick={e => iOnClick(e, "3")}></i>
            <i className="fi fi-bs-flame" style={styles}  onClick={e => iOnClick(e, "2")}></i>
            <i className="fi fi-rs-flame" style={styles}  onClick={e => iOnClick(e, "1")}></i>
        </div>
    )
}

export default PriorPicker