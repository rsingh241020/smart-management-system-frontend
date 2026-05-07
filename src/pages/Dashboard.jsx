import { useEffect, useState } from "react";
import { getMyTasks, updateTask, getSummary } from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState({});

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const t = await getMyTasks();
    const s = await getSummary();
    setTasks(t);
    setSummary(s);
  };

  const changeStatus = async (id, status) => {
    await updateTask(id, status);
    load();
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Total: {summary.total}</h3>
      <h3>Completed: {summary.completed}</h3>
      <h3>Pending: {summary.pending}</h3>

      <hr />

      {tasks.map(t => (
        <div key={t.id}>
          <b>{t.title}</b>

          <select onChange={(e) => changeStatus(t.id, e.target.value)}>
            <option>{t.status}</option>
            <option>TODO</option>
            <option>IN_PROGRESS</option>
            <option>DONE</option>
          </select>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;