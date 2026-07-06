import "./CreateRequest.css";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { ServiceRequest } from "../../types/Home.type";
import { createServiceRequest } from "../../services/ServiceRequest.service";

export default function CreateRequest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestData: ServiceRequest = {
      title,
      description,
      department,
      requesterEmail: email,
    };

    try {
      await createServiceRequest(requestData);
      alert("Request submitted successfully!");
      setTitle("");
      setDescription("");
      setDepartment("");
      setEmail("");
      navigate("/");
    } catch (error) {
      console.error("Failed to submit request:", error);
    }
  };

  return (
    <div className="home-page">
      <header className="hero">
        <h1>Welcome to our Service Request Portal</h1>
      </header>

      <form className="request-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Title</span>
          <input
            type="text"
            value={title}
            placeholder="Enter request title"
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label className="field">
          <span>Description</span>
          <textarea
            value={description}
            placeholder="Describe your request"
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>

        <label className="field">
          <span>Department</span>
          <select
            value={department}
            onChange={(event) => setDepartment(event.target.value)}
          >
            <option value="">Select department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="facilities">Facilities</option>
            <option value="finance">Finance</option>
          </select>
        </label>

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            value={email}
            placeholder="your@email.com"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <button type="submit">
          Submit Request
        </button>
      </form>
    </div>
  );
}
