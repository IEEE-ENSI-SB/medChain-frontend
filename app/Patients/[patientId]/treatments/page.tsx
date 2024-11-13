// app/Patients/[patientId]/treatments/page.tsx

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
  Typography,
} from "@mui/material";

// Import interfaces
import { Patient, Treatment } from "../../../interfaces";

const Treatments: React.FC = () => {
  const params = useParams();
  const patientId = params.patientId as string;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [newTreatment, setNewTreatment] = useState<Treatment>({
    id: "",
    name: "",
    beginDate: "",
    endDate: "",
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
    setNewTreatment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle adding a new treatment
  const handleAddTreatment = () => {
    if (!patient) return;
    const newId = `T-${patient.medicalRecord.treatments.length + 1}`;
    const updatedTreatment = { ...newTreatment, id: newId };
    const updatedPatient = {
      ...patient,
      medicalRecord: {
        ...patient.medicalRecord,
        treatments: [...patient.medicalRecord.treatments, updatedTreatment],
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
    setNewTreatment({
      id: "",
      name: "",
      beginDate: "",
      endDate: "",
    });
    setDialogOpen(false);
  };

  if (!patient) {
    return <Typography variant="h6">Patient not found.</Typography>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Treatments for Patient {patientId}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setDialogOpen(true)}
      >
        + Add Treatment
      </Button>

      {patient.medicalRecord.treatments.length > 0 ? (
        <Table component={Paper} style={{ marginTop: "20px" }}>
          <TableHead>
            <TableRow>
              <TableCell>Treatment ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Begin Date</TableCell>
              <TableCell>End Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patient.medicalRecord.treatments.map((treatment) => (
              <TableRow key={treatment.id}>
                <TableCell>{treatment.id}</TableCell>
                <TableCell>{treatment.name}</TableCell>
                <TableCell>{treatment.beginDate}</TableCell>
                <TableCell>{treatment.endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography variant="body1" style={{ marginTop: "20px" }}>
          No treatments found.
        </Typography>
      )}

      {/* Dialog for adding a new treatment */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Treatment</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="name"
            label="Treatment Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newTreatment.name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="beginDate"
            label="Begin Date"
            type="date"
            fullWidth
            variant="outlined"
            value={newTreatment.beginDate}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            variant="outlined"
            value={newTreatment.endDate}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTreatment} color="primary">
            Add Treatment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Treatments;
