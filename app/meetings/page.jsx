"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MeetingDisplay = () => {
  const router = useRouter();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/meetings")
      .then((res) => res.json())
      .then((data) => {
        setMeetings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  const handleDelete = async (id) => {
  const confirmDelete = confirm("Are you sure you want to delete this meeting?");

  if (!confirmDelete) return;

  const res = await fetch(`http://localhost:5000/meetings/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();
  console.log(data);

  // remove deleted item from UI
  setMeetings(meetings.filter((m) => m._id !== id));
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-10">
        Meeting Display Page
      </h1>

      {meetings.length === 0 ? (
        <div className="text-center text-xl font-medium">
          No meetings found
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meetings.map((meeting) => (
            <div
              key={meeting._id}
              className="bg-white rounded-2xl shadow-lg p-6 border"
            >
              <h2 className="text-2xl font-bold mb-4">
                {meeting.title}
              </h2>

              <div className="space-y-2 text-gray-700">
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {meeting.date}
                </p>

                <p>
                  <span className="font-semibold">Time:</span>{" "}
                  {meeting.time}
                </p>

                <p>
                  <span className="font-semibold">Host:</span>{" "}
                  {meeting.hostName}
                </p>

                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {meeting.participantsEmail}
                </p>

                <p>
                  <span className="font-semibold">Type:</span>{" "}
                  {meeting.meetingType}
                </p>

                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {meeting.description}
                </p>
              </div>

              <div className="mt-5 flex gap-3">
                <button
  onClick={() => router.push(`/meetings/${meeting._id}`)}
  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
>
  View / Edit
</button>

                <button
  onClick={() => handleDelete(meeting._id)}
  className="bg-red-500 text-white px-4 py-2 rounded-lg"
>
  Delete
</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MeetingDisplay;