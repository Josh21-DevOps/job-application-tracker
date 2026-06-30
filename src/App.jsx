import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const statuses = ["Applied", "Interview", "Offer", "Rejected", "Follow Up"];

  const [jobs, setJobs] = useState(() => {
    const savedJobs = localStorage.getItem("jobApplications");

    if (savedJobs) {
      return JSON.parse(savedJobs);
    }

    return [
      {
        id: 1,
        company: "Kinjo Sushi & Grill",
        role: "Server Trainee",
        status: "Interview",
        deadline: "2026-07-05",
      },
      {
        id: 2,
        company: "Mount Pleasant Vintage & Provisions",
        role: "Bar Apprentice",
        status: "Applied",
        deadline: "2026-07-08",
      },
      {
        id: 3,
        company: "The Nash",
        role: "Expo / Food Runner",
        status: "Applied",
        deadline: "2026-07-10",
      },
    ];
  });

  const [newJob, setNewJob] = useState({
    company: "",
    role: "",
    status: "Applied",
    deadline: "",
  });

  const [filter, setFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("jobApplications", JSON.stringify(jobs));
  }, [jobs]);

  const filteredJobs =
    filter === "All" ? jobs : jobs.filter((job) => job.status === filter);

  function handleSubmit(event) {
    event.preventDefault();

    const jobToAdd = {
      id: Date.now(),
      ...newJob,
    };

    setJobs([...jobs, jobToAdd]);

    setNewJob({
      company: "",
      role: "",
      status: "Applied",
      deadline: "",
    });
  }

  function handleDelete(idToDelete) {
    const updatedJobs = jobs.filter((job) => job.id !== idToDelete);
    setJobs(updatedJobs);
  }

  return (
    <main className="app">
      <h1> My Job Application Tracker</h1>

      <form className="job-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Company"
          value={newJob.company}
          onChange={(event) =>
            setNewJob({ ...newJob, company: event.target.value })
          }
        />

        <input
          type="text"
          placeholder="Role"
          value={newJob.role}
          onChange={(event) =>
            setNewJob({ ...newJob, role: event.target.value })
          }
        />

        <select
          value={newJob.status}
          onChange={(event) =>
            setNewJob({ ...newJob, status: event.target.value })
          }
        >
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>

        <input
          type="date"
          value={newJob.deadline}
          onChange={(event) =>
            setNewJob({ ...newJob, deadline: event.target.value })
          }
        />

        <button type="submit">Add Application</button>
      </form>

      <div className="filter-buttons">
        <button onClick={() => setFilter("All")}>All</button>

        {statuses.map((status) => (
          <button key={status} onClick={() => setFilter(status)}>
            {status}
          </button>
        ))}
      </div>

      <section className="job-list">
        {filteredJobs.map((job) => (
          <article className="job-card" key={job.id}>
            <h2>{job.company}</h2>
            <p>{job.role}</p>
            <p>Status: {job.status}</p>
            <p>Follow-up date: {job.deadline}</p>
            <button onClick={() => handleDelete(job.id)}>Remove</button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;