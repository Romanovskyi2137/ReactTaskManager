import React from "react";
import Select from "./UI/Select/Select";
import Input from "./UI/Input/Input";


function TaskFilter ({filter, setFilter}) {


    return (
        <div>

            <Input
                type="text"
                placeholder="Пошук..."
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                style={{marginBottom: "15px"}}
            />
            <Select
                options={[
                    {value: "prior", name: "За пріорітетом"},
                    {value: "title", name: "За назвою"},
                ]}
                defaultValue={"Сортувати по..."}
                onChange={value => setFilter({...filter, sort: value})}
            />

        </div>
    )
}

export default TaskFilter