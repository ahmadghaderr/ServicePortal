import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import {
  getServiceRequests,
  deleteServiceRequest,
  cancelServiceRequest,
} from "../../services/ServiceRequest.service";
import type { ServiceRequest } from "../../types/Home.type";

export default function Home() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const data = await getServiceRequests(search, department, status);
      setRequests(data);
    } catch (error) {
      console.error("Failed to load requests", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [search, department, status]);

  const handleCancel = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this request?",
    );
    if (!confirmed) return;

    try {
      await cancelServiceRequest(id);
      await fetchRequests();
    } catch (error) {
      console.error("Failed to cancel request", error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm("Delete this request?");
    if (!confirmed) return;

    try {
      await deleteServiceRequest(id);
      await fetchRequests();
    } catch (error) {
      console.error("Failed to delete request", error);
    }
  };

  return (
    <div className="home-page">
      <header className="hero">
        <h1>Service Request Portal</h1>
        <p>
          Manage all requests, filter by title, department, or status, and
          update them quickly.
        </p>
      </header>

      <section className="dashboard-panel">
        <div className="dashboard-header">
          <div className="filters-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search by title..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <select
              className="filter-select"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
            >
              <option value="">All Departments</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="facilities">Facilities</option>
              <option value="finance">Finance</option>
            </select>

            <select
              className="filter-select"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="accepted">Accepted</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="action-container">
            <button
              type="button"
              className="create-btn"
              onClick={() => navigate("/create-request")}
            >
              Create Request
            </button>
          </div>
        </div>

        <div className="requests-list">
          <h3>All Requests</h3>
          {loading ? (
            <p>Loading requests...</p>
          ) : requests.length === 0 ? (
            <p>No requests found.</p>
          ) : (
            requests.map((request) => (
              <div key={request.id} className="request-card">
                <div>
                  <h4>
                    {request.title}{" "}
                  </h4>
                  <p>{request.description}</p>
                  <small>
                    Department: {request.department} | Email:{" "}
                    {request.requesterEmail}
                  </small>
                </div>
                <div className="card-actions">
                  <button
                    type="button"
                    onClick={() =>
                      navigate(`/edit-request/${request.id}`, {
                        state: { request },
                      })
                    }
                  >
                    Edit
                  </button>
                  {request.status?.toString().trim().toLowerCase() !==
                    "cancelled" && (
                    <button
                      type="button"
                      className="cancel-btn"
                      onClick={() => handleCancel(Number(request.id))}
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="button"
                    className="danger-btn"
                    onClick={() => handleDelete(Number(request.id))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
