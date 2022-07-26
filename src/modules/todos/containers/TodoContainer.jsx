import React from "react";

const TodoContainer = (props) => {
   return <div {...props}>{props.children}</div>;
};

export default TodoContainer;
