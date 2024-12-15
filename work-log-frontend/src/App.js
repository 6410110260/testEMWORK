import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

function App() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState({
        task_type: 'Development',
        task_name: '',
        start_time: '',
        end_time: '',
        status: 'ดำเนินการ'
    });
    const [editingTask, setEditingTask] = useState(null);
    const [searchDate, setSearchDate] = useState('');
    const [searchMonth, setSearchMonth] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`${API_URL}/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleSearchByDate = async () => {
        try {
            const response = await axios.get(`${API_URL}/tasks/by-date`, {
                params: { date: searchDate }
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error searching by date:', error);
        }
    };

    const handleSearchByMonth = async () => {
        try {
            const response = await axios.get(`${API_URL}/tasks/by-month`, {
                params: { month: searchMonth }
            });
            setTasks(response.data);
        } catch (error) {
            console.error('Error searching by month:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingTask) {
            await axios.put(`${API_URL}/tasks/${editingTask.id}`, task);
        } else {
            await axios.post(`${API_URL}/tasks`, task);
        }
        fetchTasks();
        resetForm();
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setTask({
            task_type: task.task_type,
            task_name: task.task_name,
            start_time: task.start_time,
            end_time: task.end_time,
            status: task.status
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const resetForm = () => {
        setTask({
            task_type: 'Development',
            task_name: '',
            start_time: '',
            end_time: '',
            status: 'ดำเนินการ'
        });
        setEditingTask(null);
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleString();
    };

    return (
        <div>
            <h1>Work Log</h1>
            
            <div>
                <h3>Search by Date</h3>
                <input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                />
                <button onClick={handleSearchByDate}>Search</button>
            </div>

            <div>
                <h3>Search by Month</h3>
                <input
                    type="number"
                    value={searchMonth}
                    onChange={(e) => setSearchMonth(e.target.value)}
                    placeholder="Month (1-12)"
                    min="1"
                    max="12"
                />
                <button onClick={handleSearchByMonth}>Search</button>
            </div>

            <form onSubmit={handleSubmit}>
                <select
                    value={task.task_type}
                    onChange={(e) => setTask({ ...task, task_type: e.target.value })}
                >
                    <option value="Development">Development</option>
                    <option value="Test">Test</option>
                    <option value="Document">Document</option>
                </select>
                <input
                    type="text"
                    placeholder="Task Name"
                    value={task.task_name}
                    onChange={(e) => setTask({ ...task, task_name: e.target.value })}
                />
                <input
                    type="datetime-local"
                    value={task.start_time}
                    onChange={(e) => setTask({ ...task, start_time: e.target.value })}
                />
                <input
                    type="datetime-local"
                    value={task.end_time}
                    onChange={(e) => setTask({ ...task, end_time: e.target.value })}
                />
                <select
                    value={task.status}
                    onChange={(e) => setTask({ ...task, status: e.target.value })}
                >
                    <option value="ดำเนินการ">ดำเนินการ</option>
                    <option value="เสร็จสิ้น">เสร็จสิ้น</option>
                    <option value="ยกเลิก">ยกเลิก</option>
                </select>
                <button type="submit">{editingTask ? 'Update Task' : 'Save Task'}</button>
                {editingTask && <button type="button" onClick={resetForm}>Cancel</button>}
            </form>

            <h2>Task List</h2>
            <ul>
                {tasks.length > 0 ? (
                    tasks.map((t) => (
                        <li key={t.id}>
                            {t.task_type}: {t.task_name} ({t.status})<br />
                            Start Time: {formatDateTime(t.start_time)}<br />
                            End Time: {formatDateTime(t.end_time)}<br />
                            Created At: {formatDateTime(t.created_at)}<br />
                            Updated At: {formatDateTime(t.updated_at)}<br />
                            <button onClick={() => handleEdit(t)}>Edit</button>
                            <button onClick={() => handleDelete(t.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <li>No tasks available</li>
                )}
            </ul>
        </div>
    );
}

export default App;
