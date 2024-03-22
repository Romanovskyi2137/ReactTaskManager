import React from "react";
import Button from "./UI/Button/Button";


function HeaderButtons ({completeModalOpen, createModalOpen}) {


    return (
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
    )
};


export default HeaderButtons