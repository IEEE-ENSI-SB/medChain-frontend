// app/Patients/[patientId]/page.tsx

"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Typography, Grid, Paper, List, ListItem, ListItemText } from "@mui/material";

// Import interfaces
import { Patient } from "../../../interfaces";

const PatientDetail: React.FC = () => {
  const params = useParams();
  const patientId = params.patientId as string;
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    // Fetch patient data based on patientId
    const patientList = JSON.parse(localStorage.getItem("patients") || "[]");
    const foundPatient = patientList.find((p: Patient) => p.id === patientId);
    setPatient(foundPatient || null);
  }, [patientId]);

  if (!patient) {
    return <Typography variant="h6">Patient not found.</Typography>;
  }

  const { firstName, lastName, phoneNumber, email, gender, emergencyContact, address, dateOfBirth, medicalRecord } = patient;

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Patient Details: {firstName} {lastName}
      </Typography>

      <Grid container spacing={2}>
        {/* Personal Information */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: "15px" }} variant="outlined">
            <Typography variant="h6">Personal Information</Typography>
            <List>
              <ListItem>
                <ListItemText primary="ID" secondary={patient.id} />
              </ListItem>
              <ListItem>
                <ListItemText primary="First Name" secondary={firstName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Last Name" secondary={lastName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Phone Number" secondary={phoneNumber} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={email} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Gender" secondary={gender} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Emergency Contact"
                  secondary={emergencyContact}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Address" secondary={address} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Date of Birth" secondary={dateOfBirth} />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Medical History Summary */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: "15px" }} variant="outlined">
            <Typography variant="h6">Medical History Summary</Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Allergies"
                  secondary={
                    medicalRecord.medicalHistory.allergies.length > 0
                      ? medicalRecord.medicalHistory.allergies.join(", ")
                      : "None"
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Surgeries"
                  secondary={
                    medicalRecord.medicalHistory.surgeries.length > 0
                      ? medicalRecord.medicalHistory.surgeries.join(", ")
                      : "None"
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Chronic Diseases"
                  secondary={
                    medicalRecord.medicalHistory.chronicDiseases.length > 0
                      ? medicalRecord.medicalHistory.chronicDiseases.join(", ")
                      : "None"
                  }
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Lab Results"
                  secondary={
                    medicalRecord.medicalHistory.labResults.length > 0
                      ? medicalRecord.medicalHistory.labResults
                          .map(
                            (lab) =>
                              `Date: ${lab.date}, Type: ${lab.type}, Result: ${lab.result}${
                                lab.notes ? `, Notes: ${lab.notes}` : ""
                              }`
                          )
                          .join(" | ")
                      : "None"
                  }
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Actions */}
      <Typography variant="h5" gutterBottom style={{ marginTop: "30px" }}>
        Manage Medical Records
      </Typography>
      <ul>
        <li>
          <Link href={`/Patients/${patientId}/medical-history`}>
            Medical History
          </Link>
        </li>
        <li>
          <Link href={`/Patients/${patientId}/appointments`}>Appointments</Link>
        </li>
        <li>
          <Link href={`/Patients/${patientId}/treatments`}>Treatments</Link>
        </li>
      </ul>
    </div>
  );
};

export default PatientDetail;
