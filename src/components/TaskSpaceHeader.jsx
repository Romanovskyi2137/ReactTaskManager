import React from "react";
import Button from "./UI/Button/Button";


function TaskSpaceHeader ({completeModalOpen, createModalOpen}) {


    return (
        <div className="tasks__list_header">
            <div className='header__btns'>
              <Button
                onClick={completeModalOpen}
              >
                Виконані задачі
              </Button>
              <Button
                onClick={createModalOpen}
              >
                Створити задачу
              </Button>
            </div>
        </div>
    )
};


export default TaskSpaceHeader