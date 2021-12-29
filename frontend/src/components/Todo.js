import React,{useState} from 'react'
export default function Todo(props) {
    const {_id,
        title,isCompleted}=props.task

        return (
            <div className="ms-3 me-3">
            <label className="list-group-item hstack gap-3">
              <input
                className="form-check-input me-1"
                type="checkbox"
                defaultChecked={isCompleted}
                onClick={() => {
                  props.toggleTodo(_id, !isCompleted);
                }}
              />
              <span style={{ textDecoration: isCompleted ? "line-through" : "none" }}>
                {title}
              </span>
      
              <button
                onClick={() => {
                  props.deleteTodo(_id);
                }}
                className="btn btn-outline-danger"
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </label>
          </div>
        );
      }