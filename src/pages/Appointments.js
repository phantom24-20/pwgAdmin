import React, { useState, useEffect } from "react";
import styled from "styled-components";

const AppointmentsContainer = styled.div`
  padding: 20px;
  background: #f9f9f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.h2`
  font-size: 32px;
  color: #2c3e50;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const AppointmentCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }
`;

const AppointmentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  h4 {
    font-size: 20px;
    font-weight: bold;
    color: #34495e;
    margin: 0;
  }

  p {
    font-size: 16px;
    color: #7f8c8d;
    margin: 0;
  }
`;

const AppointmentActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  background-color: ${(props) =>
    props.danger ? "#e74c3c" : props.confirm ? "#2ecc71" : "#3498db"};
  transition: background-color 0.3s ease, transform 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.danger ? "#c0392b" : props.confirm ? "#27ae60" : "#2980b9"};
    transform: scale(1.05);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: #7f8c8d;
  font-size: 18px;
  font-weight: bold;
  margin-top: 50px;
`;

const InputField = styled.input`
  padding: 5px;
  margin-right: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

function Appointments() {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      petName: "Buddy",
      ownerName: "Alice",
      date: "2025-01-21",
      time: "10:00 AM",
      service: "Grooming, Hair Cut",
      price: 500,
      petType: "Dog",
      status: "Pending",
      delay: null,
      phoneNumber: "1234567890",
      session: 1,
    },
    {
      id: 2,
      petName: "Buddy",
      ownerName: "Alice",
      date: "2025-02-21",
      time: "10:00 AM",
      service: "Grooming, Hair Cut",
      price: 500,
      petType: "Dog",
      status: "Pending",
      delay: null,
      phoneNumber: "1234567890",
      session: 2,
    },
    {
      id: 3,
      petName: "Buddy",
      ownerName: "Alice",
      date: "2025-03-21",
      time: "10:00 AM",
      service: "Grooming, Hair Cut",
      price: 500,
      petType: "Dog",
      status: "Pending",
      delay: null,
      phoneNumber: "1234567890",
      session: 3,
    },
    // Case for single session booking (example)
    {
      id: 4,
      petName: "Bella",
      ownerName: "Carol",
      date: "2025-04-01",
      time: "2:00 PM",
      service: "Nail Clipping",
      price: 300,
      petType: "Cat",
      status: "Pending",
      delay: null,
      phoneNumber: "9876543210",
      session: 1,
    },
  ]);

  // Reminder Logic
  useEffect(() => {
    const reminderInterval = setInterval(() => {
      const currentTime = new Date();
      appointments.forEach((appointment) => {
        const appointmentTime = new Date(
          `${appointment.date} ${appointment.time}`
        );
        const timeDiff = appointmentTime - currentTime;
        if (timeDiff > 0 && timeDiff <= 60 * 60 * 1000) {
          alert(
            `Reminder: Upcoming appointment for ${appointment.petName} at ${appointment.time} on ${appointment.date}`
          );
          // Send message to customer's phone (simulating with a console log)
          console.log(`Sending reminder message to ${appointment.phoneNumber}`);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(reminderInterval);
  }, [appointments]);

  const confirmAppointment = (id) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "Confirmed" } : appointment
      )
    );
    alert("Appointment has been confirmed.");
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter((appointment) => appointment.id !== id));
  };

  const completeAppointment = (id) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "Completed" } : appointment
      )
    );
    alert("Appointment has been completed.");
  };

  const delayAppointment = (id) => {
    const delayTime = prompt("Enter delay time in minutes:");
    if (delayTime) {
      const currentAppointment = appointments.find(
        (appointment) => appointment.id === id
      );
      const delayedTime = new Date(
        `${currentAppointment.date} ${currentAppointment.time}`
      );
      delayedTime.setMinutes(delayedTime.getMinutes() + parseInt(delayTime));

      setAppointments(
        appointments.map((appointment) =>
          appointment.id === id
            ? { ...appointment, delay: `${delayTime} minutes`, date: delayedTime.toLocaleDateString(), time: delayedTime.toLocaleTimeString() }
            : appointment
        )
      );
      alert(`User notified: Appointment delayed by ${delayTime} minutes.`);
    }
  };

  const changeDateTime = (id, newDate, newTime) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, date: newDate, time: newTime }
          : appointment
      )
    );
  };

  const getNextSessions = (session) => {
    return appointments.filter((appointment) => appointment.session === session);
  };

  return (
    <AppointmentsContainer>
      <Header>Manage Appointments</Header>
      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <AppointmentCard key={appointment.id}>
            <AppointmentInfo>
              <h4>{appointment.petName}</h4>
              <p>
                <strong>Owner:</strong> {appointment.ownerName}
              </p>
              <p>
                <strong>Date:</strong> {appointment.date}
              </p>
              <p>
                <strong>Time:</strong> {appointment.time}
              </p>
              <p>
                <strong>Service:</strong> {appointment.service}
              </p>
              <p>
                <strong>Price:</strong> ₹{appointment.price}
              </p>
              <p>
                <strong>Pet Type:</strong> {appointment.petType}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      appointment.status === "Pending"
                        ? "#e67e22"
                        : appointment.status === "Confirmed"
                        ? "#27ae60"
                        : "#3498db",
                  }}
                >
                  {appointment.status}
                </span>
              </p>
              {appointment.delay && (
                <p>
                  <strong>Delay:</strong> {appointment.delay} - {appointment.date}{" "}
                  {appointment.time}
                </p>
              )}
            </AppointmentInfo>

            {/* Displaying sessions */}
            {appointment.session === 1 && (
              <div>
                <h4>Next Sessions:</h4>
                {getNextSessions(2).map((nextAppointment) => (
                  <div key={nextAppointment.id}>
                    <p>
                      <strong>Session {nextAppointment.session}:</strong>{" "}
                      {nextAppointment.date} at {nextAppointment.time}
                      <div>
                        <strong>Change Date & Time:</strong>
                        <InputField
                          type="date"
                          value={nextAppointment.date}
                          onChange={(e) =>
                            changeDateTime(nextAppointment.id, e.target.value, nextAppointment.time)
                          }
                        />
                        <InputField
                          type="time"
                          value={nextAppointment.time}
                          onChange={(e) =>
                            changeDateTime(nextAppointment.id, nextAppointment.date, e.target.value)
                          }
                        />
                      </div>
                    </p>
                  </div>
                ))}
                {getNextSessions(3).map((nextAppointment) => (
                  <div key={nextAppointment.id}>
                    <p>
                      <strong>Session {nextAppointment.session}:</strong>{" "}
                      {nextAppointment.date} at {nextAppointment.time}
                      <div>
                        <strong>Change Date & Time:</strong>
                        <InputField
                          type="date"
                          value={nextAppointment.date}
                          onChange={(e) =>
                            changeDateTime(nextAppointment.id, e.target.value, nextAppointment.time)
                          }
                        />
                        <InputField
                          type="time"
                          value={nextAppointment.time}
                          onChange={(e) =>
                            changeDateTime(nextAppointment.id, nextAppointment.date, e.target.value)
                          }
                        />
                      </div>
                    </p>
                  </div>
                ))}
              </div>
            )}

            <AppointmentActions>
              {appointment.status !== "Confirmed" && (
                <Button confirm onClick={() => confirmAppointment(appointment.id)}>
                  Confirm
                </Button>
              )}
              <Button onClick={() => delayAppointment(appointment.id)}>
                Delay
              </Button>
              <Button onClick={() => completeAppointment(appointment.id)}>
                Completed
              </Button>
              <Button danger onClick={() => deleteAppointment(appointment.id)}>
                Delete
              </Button>
            </AppointmentActions>
          </AppointmentCard>
        ))
      ) : (
        <EmptyState>No appointments available.</EmptyState>
      )}
    </AppointmentsContainer>
  );
}

export default Appointments;
