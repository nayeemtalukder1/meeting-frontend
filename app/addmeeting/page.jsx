'use client'
import React from 'react'

const AddMeeting = () => {

  const onSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const formData = new FormData(e.target);
    const meetingData = Object.fromEntries(formData.entries());
    console.log(meetingData);

    const res = await fetch('http://localhost:5000/meetings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(meetingData)
    })

    const data = await res.json();
    console.log(data);
  }
  return (
    <div>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Meeting App Form
        </h1>

        <form className="space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm font-medium mb-2">
              Meeting Title
            </label>
            <input
              type="text"
              placeholder="Enter meeting title"
              name='title'
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-2">
                Date
              </label>
              <input
                type="date"
                name='date'
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Time
              </label>
              <input
                type="time"
                name='time'
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Host Name
            </label>
            <input
              type="text"
              placeholder="Enter host name"
              name='hostName'
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Participants Email
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              name='participantsEmail'
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Meeting Type
            </label>
            <select name='meetingType' className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black">
              <option>Online</option>
              <option>Offline</option>
              <option>Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              rows="4"
              placeholder="Write meeting details..."
                name='description'
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:opacity-90 transition"
          >
            Create Meeting
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default AddMeeting
