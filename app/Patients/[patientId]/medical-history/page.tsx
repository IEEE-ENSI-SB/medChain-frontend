// app/Patients/[patientId]/medical-history/page.tsx

"use client";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Typography,
  Grid,
  Paper,
} from "@mui/material";

// Import interfaces and enumerations
import {
  Patient,
  MedicalHistory,
  Surgery,
  ChronicDisease,
  LabResult,
} from "../../../interfaces";

const MedicalHistoryPage: React.FC = () => {
  const params = useParams();
  const patientId = params.patientId as string;
  const [patient, setPatient] = useState<Patient | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch patient data based on patientId
    const patientList = JSON.parse(localStorage.getItem("patients") || "[]");
    const foundPatient = patientList.find((p: Patient) => p.id === patientId);
    setPatient(foundPatient || null);
  }, [patientId]);

  // Handle Medical History changes
  const handleMedicalHistoryChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof MedicalHistory
  ) => {
    if (!patient) return;
    const { value } = e.target;
    setPatient({
      ...patient,
      medicalRecord: {
        ...patient.medicalRecord,
        medicalHistory: {
          ...patient.medicalRecord.medicalHistory,
          [field]: value,
        },
      },
    });
  };

  // Handle select changes for multi-select fields
  const handleSelectChange = (
    event: any,
    field: keyof MedicalHistory
  ) => {
    if (!patient) return;
    const { value } = event.target;
    setPatient({
      ...patient,
      medicalRecord: {
        ...patient.medicalRecord,
        medicalHistory: {
          ...patient.medicalRecord.medicalHistory,
          [field]: typeof value === "string" ? value.split(",") : value,
        },
      },
    });
  };

  // Handle Lab Results changes
  const handleLabResultChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: keyof LabResult
  ) => {
    if (!patient) return;
    const { value } = e.target;
    setPatient({
      ...patient,
      medicalRecord: {
        ...patient.medicalRecord,
        medicalHistory: {
          ...patient.medicalRecord.medicalHistory,
          labResults: patient.medicalRecord.medicalHistory.labResults.map(
            (lab, i) =>
              i === index
                ? {
                    ...lab,
                    [field]: value,
                  }
                : lab
          ),
        },
      },
    });
  };

  // Add a new Lab Result
  const addLabResult = () => {
    if (!patient) return;
    setPatient({
      ...patient,
      medicalRecord: {
        ...patient.medicalRecord,
        medicalHistory: {
          ...patient.medicalRecord.medicalHistory,
          labResults: [
            ...patient.medicalRecord.medicalHistory.labResults,
            {
              date: "",
              type: "",
              result: "",
              notes: "",
            },
          ],
        },
      },
    });
  };

  // Remove a Lab Result
  const removeLabResult = (index: number) => {
    if (!patient) return;
    setPatient({
      ...patient,
      medicalRecord: {
        ...patient.medicalRecord,
        medicalHistory: {
          ...patient.medicalRecord.medicalHistory,
          labResults: patient.medicalRecord.medicalHistory.labResults.filter(
            (_, i) => i !== index
          ),
        },
      },
    });
  };

  const handleSave = () => {
    if (!patient) return;
    // Update the patient in localStorage
    const patientList = JSON.parse(localStorage.getItem("patients") || "[]");
    const updatedPatients = patientList.map((p: Patient) =>
      p.id === patientId ? patient : p
    );
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
    alert("Medical history updated successfully!");
    router.push(`/Patients/${patientId}`);
  };

  if (!patient) {
    return <p>Patient not found.</p>;
  }

  // Constants for multiple select fields
  const surgeryOptions = Object.values(Surgery);
  const chronicDiseaseOptions = Object.values(ChronicDisease);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Medical History for Patient {patientId}
      </Typography>

      <Grid container spacing={2}>
        {/* Allergies */}
        <Grid item xs={12}>
          <FormControl fullWidth margin="dense">
            <InputLabel id="allergies-label">Allergies</InputLabel>
            <Select
              labelId="allergies-label"
              multiple
              value={patient.medicalRecord.medicalHistory.allergies}
              onChange={(e) => handleSelectChange(e, "allergies")}
              input={<OutlinedInput label="Allergies" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {/* Replace with actual allergy options */}
              {["Peanuts", "Shellfish", "Dust", "Pollen", "Latex"].map(
                (allergy) => (
                  <MenuItem key={allergy} value={allergy}>
                    <Checkbox
                      checked={
                        patient.medicalRecord.medicalHistory.allergies.indexOf(
                          allergy
                        ) > -1
                      }
                    />
                    <ListItemText primary={allergy} />
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Grid>

        {/* Surgeries */}
        <Grid item xs={12}>
          <FormControl fullWidth margin="dense">
            <InputLabel id="surgeries-label">Surgeries</InputLabel>
            <Select
              labelId="surgeries-label"
              multiple
              value={patient.medicalRecord.medicalHistory.surgeries}
              onChange={(e) => handleSelectChange(e, "surgeries")}
              input={<OutlinedInput label="Surgeries" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {surgeryOptions.map((surgery) => (
                <MenuItem key={surgery} value={surgery}>
                  <Checkbox
                    checked={
                      patient.medicalRecord.medicalHistory.surgeries.indexOf(
                        surgery
                      ) > -1
                    }
                  />
                  <ListItemText primary={surgery} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Chronic Diseases */}
        <Grid item xs={12}>
          <FormControl fullWidth margin="dense">
            <InputLabel id="chronicDiseases-label">Chronic Diseases</InputLabel>
            <Select
              labelId="chronicDiseases-label"
              multiple
              value={patient.medicalRecord.medicalHistory.chronicDiseases}
              onChange={(e) => handleSelectChange(e, "chronicDiseases")}
              input={<OutlinedInput label="Chronic Diseases" />}
              renderValue={(selected) => selected.join(", ")}
            >
              {chronicDiseaseOptions.map((disease) => (
                <MenuItem key={disease} value={disease}>
                  <Checkbox
                    checked={
                      patient.medicalRecord.medicalHistory.chronicDiseases.indexOf(
                        disease
                      ) > -1
                    }
                  />
                  <ListItemText primary={disease} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Lab Results */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" gutterBottom>
            Lab Results
          </Typography>
          {patient.medicalRecord.medicalHistory.labResults.map(
            (labResult, index) => (
              <Paper
                key={index}
                style={{ padding: "15px", marginBottom: "10px" }}
                variant="outlined"
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <TextField
                      margin="dense"
                      label="Date"
                      type="date"
                      fullWidth
                      variant="outlined"
                      value={labResult.date}
                      onChange={(e) =>
                        handleLabResultChange(e, index, "date")
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      margin="dense"
                      label="Type"
                      type="text"
                      fullWidth
                      variant="outlined"
                      value={labResult.type}
                      onChange={(e) =>
                        handleLabResultChange(e, index, "type")
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      margin="dense"
                      label="Result"
                      type="text"
                      fullWidth
                      variant="outlined"
                      value={labResult.result}
                      onChange={(e) =>
                        handleLabResultChange(e, index, "result")
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => removeLabResult(index)}
                    >
                      Remove
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="dense"
                      label="Notes"
                      type="text"
                      fullWidth
                      variant="outlined"
                      value={labResult.notes}
                      onChange={(e) =>
                        handleLabResultChange(e, index, "notes")
                      }
                    />
                  </Grid>
                </Grid>
              </Paper>
            )
          )}
          <Button
            variant="outlined"
            color="primary"
            onClick={addLabResult}
            style={{ marginTop: "10px" }}
          >
            + Add Lab Result
          </Button>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        style={{ marginTop: "20px" }}
      >
        Save
      </Button>
    </div>
  );
};

export default MedicalHistoryPage;
