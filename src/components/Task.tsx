const Task = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-amber-200 p-4 m-4 rounded-lg shadow-md
          outline-1"
        >
          {task.title}
        </div>
      ))}
    </div>
  );
};

export default Task;
