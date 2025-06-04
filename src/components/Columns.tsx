import Task from "./Task";
const Columns = ({ column }) => {
  console.log("Column component", column);
  return (
    <div>
      <h2>{column.id}</h2>
      <Task tasks={column.tasks} />
    </div>
  );
};

export default Columns;
