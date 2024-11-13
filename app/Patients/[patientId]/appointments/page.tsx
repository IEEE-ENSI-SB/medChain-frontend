// app/Patients/[patientId]/appointments/page.tsx

"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Typography,
} from "@mui/material";

// Import interfaces
import { Patient, Appointment, Treatment } from "../../../interfaces";

const Appointments: React.FC = () => {
  const params = useParams();
  const patientId = params.patientId as string;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [newAppointment, setNewAppointment] = useState<Appointment>({
    id: "",
    date: "",
    time: "",
    diagnosis: "",
    reason: "",
    treatments: [],
  });

  useEffect(() => {
    // Fetch patient data based on patientId
    const patientList = JSON.parse(localStorage.getItem("patients") || "[]");
    const foundPatient = patientList.find((p: Patient) => p.id === patientId);
    setPatient(foundPatient || null);
  }, [patientId]);

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding a new appointment
  const handleAddAppointment = () => {
    if (!patient) return;
    const newId = `A-${patient.medicalRecord.appointments.length + 1}`;
    const updatedAppointment = { ...newAppointment, id: newId };
    const updatedPatient = {
      ...patient,
      medicalRecord: {
        ...patient.medicalRecord,
        appointments: [...patient.medicalRecord.appointments, updatedAppointment],
      },
    };

    // Update patient in localStorage
    const patientList = JSON.parse(localStorage.getItem("patients") || "[]");
    const updatedPatients = patientList.map((p: Patient) =>
      p.id === patientId ? updatedPatient : p
    );
    localStorage.setItem("patients", JSON.stringify(updatedPatients));

    // Update state
    setPatient(updatedPatient);
    setNewAppointment({
      id: "",
      date: "",
      time: "",
      diagnosis: "",
      reason: "",
      treatments: [],
    });
    setDialogOpen(false);
  };

  if (!patient) {
    return <Typography variant="h6">Patient not found.</Typography>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Appointments for Patient {patientId}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setDialogOpen(true)}
      >
        + Add Appointment
      </Button>

      {patient.medicalRecord.appointments.length > 0 ? (
        <Table component={Paper} style={{ marginTop: "20px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Appointment ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Diagnosis</TableCell>
              <TableCell>Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patient.medicalRecord.appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.id}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.diagnosis}</TableCell>
                <TableCell>{appointment.reason}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body1" style={{ marginTop: "20px" }}>
          No appointments found.
        </Typography>
      )}

      {/* Dialog for adding a new appointment */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Appointment</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="date"
                label="Date"
                type="date"
                fullWidth
                variant="outlined"
                value={newAppointment.date}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="time"
                label="Time"
                type="time"
                fullWidth
                variant="outlined"
                value={newAppointment.time}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="diagnosis"
                label="Diagnosis"
                type="text"
                fullWidth
                variant="outlined"
                value={newAppointment.diagnosis}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="reason"
                label="Reason"
                type="text"
                fullWidth
                variant="outlined"
                value={newAppointment.reason}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddAppointment} color="primary">
            Add Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Appointments;
