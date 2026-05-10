"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const MeetingDetails = () => {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    fetch(`https://meeting-app-95r2.onrender.com/meetings/${id}`)
      .then((res) => res.json())
      .then((data) => setMeeting(data));
  }, [id]);

  const handleChange = (e) => {
    setMeeting({ ...meeting, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
  e.preventDefault();

  const res = await fetch(`https://meeting-app-95r2.onrender.com/meetings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(meeting),
  });

  console.log("STATUS:", res.status);

  const data = await res.json();
  console.log("RESPONSE:", data);
};

  if (!meeting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-2xl">

        <h1 className="text-3xl font-bold mb-4 text-center">
          Meeting Details
        </h1>

        {!editMode ? (
          // VIEW MODE
          <div className="space-y-3">
            <p><b>Title:</b> {meeting.title}</p>
            <p><b>Date:</b> {meeting.date}</p>
            <p><b>Time:</b> {meeting.time}</p>
            <p><b>Host:</b> {meeting.hostName}</p>
            <p><b>Email:</b> {meeting.participantsEmail}</p>
            <p><b>Type:</b> {meeting.meetingType}</p>
            <p><b>Description:</b> {meeting.description}</p>

            <button
              onClick={() => setEditMode(true)}
              className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Edit
            </button>
          </div>
        ) : (
          // EDIT MODE
          <form onSubmit={handleUpdate} className="space-y-4">

            <input
              name="title"
              value={meeting.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Title"
            />

            <input
              name="date"
              type="date"
              value={meeting.date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="time"
              type="time"
              value={meeting.time}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="hostName"
              value={meeting.hostName}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="participantsEmail"
              value={meeting.participantsEmail}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <select
              name="meetingType"
              value={meeting.meetingType}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option>Online</option>
              <option>Offline</option>
              <option>Hybrid</option>
            </select>

            <textarea
              name="description"
              value={meeting.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
};

export default MeetingDetails;