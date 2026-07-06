import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../createRequest/CreateRequest.css";
import type { ServiceRequest } from "../../types/Home.type";
import {updateServiceRequest,getServiceRequestById,} from "../../services/ServiceRequest.service";

export default function EditRequest() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadRequest = async () => {
      if (!id) return;

      try {
        const data = await getServiceRequestById(Number(id));

        setTitle(data.title || "");
        setDescription(data.description || "");
        setDepartment(data.department || "");
        setEmail(data.requesterEmail || "");
      } catch (error) {
        console.error("Failed to load request:", error);
      }
    };

    loadRequest();
  }, [id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      alert("Missing request id.");
      return;
    }

    const requestData: ServiceRequest = {
      title,
      description,
      department,
      requesterEmail: email,
    };

    try {
      await updateServiceRequest(Number(id), requestData);
      alert("Updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Failed to update request:", error);
    }
  };

  return (
    <div className="home-page">
      <header className="hero">
        <h1>Edit Service Request</h1>
      </header>

      <form className="request-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Title</span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label className="field">
          <span>Description</span>
          <textarea
            value={description}
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
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <button type="submit">Update Request</button>
      </form>
    </div>
  );
}
