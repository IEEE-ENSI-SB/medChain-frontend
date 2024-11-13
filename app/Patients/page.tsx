// app/Patients/page.tsx

"use client";
import React, { useState, useEffect, ChangeEvent, useContext } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Typography,
  Grid,
  Paper as MuiPaper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Patient,
  MedicalHistory,
  MedicalRecord,
  Appointment,
  Treatment,
  Surgery,
  ChronicDisease,
  LabResult,
} from "../interfaces";

import { SnackbarContext } from "../context/SnackbarContext";

const PatientList: React.FC = () => {
  const { showSnackbar } = useContext(SnackbarContext);

  const [patients, setPatients] = useState<Patient[]>([]);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  const [currentEditPatient, setCurrentEditPatient] = useState<Patient | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [newPatient, setNewPatient] = useState<Patient>({
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emergencyContact: "",
    dateOfBirth: "",
    address: "",
    email: "",
    gender: "",
    medicalRecord: {
      appointments: [],
      treatments: [],
      medicalHistory: {
        allergies: [],
        surgeries: [],
        chronicDiseases: [],
        labResults: [],
      },
    },
  });

  // Fetch patients from localStorage on component mount
  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem("patients") || "[]");
    setPatients(storedPatients);
  }, []);

  // Handle form input change for Add Patient
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Medical History changes for Add Patient
  const handleMedicalHistoryChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof MedicalHistory
  ) => {
    const { value } = e.target;
    setNewPatient((prev) => ({
      ...prev,
      medicalRecord: {
        ...prev.medicalRecord,
        medicalHistory: {
          ...prev.medicalRecord.medicalHistory,
          [field]: value,
        },
      },
    }));
  };

  // Handle select changes for multi-select fields in Add Patient
  const handleSelectChange = (
    event: any,
    field: keyof MedicalHistory
  ) => {
    const { value } = event.target;
    setNewPatient((prev) => ({
      ...prev,
      medicalRecord: {
        ...prev.medicalRecord,
        medicalHistory: {
          ...prev.medicalRecord.medicalHistory,
          [field]: typeof value === "string" ? value.split(",") : value,
        },
      },
    }));
  };

  // Handle Lab Results changes for Add Patient
  const handleLabResultChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: keyof LabResult
  ) => {
    const { value } = e.target;
    setNewPatient((prev) => {
      const labResults = [...prev.medicalRecord.medicalHistory.labResults];
      labResults[index] = { ...labResults[index], [field]: value };
      return {
        ...prev,
        medicalRecord: {
          ...prev.medicalRecord,
          medicalHistory: {
            ...prev.medicalRecord.medicalHistory,
            labResults,
          },
        },
      };
    });
  };

  // Add a new Lab Result for Add Patient
  const addLabResult = () => {
    setNewPatient((prev) => ({
      ...prev,
      medicalRecord: {
        ...prev.medicalRecord,
        medicalHistory: {
          ...prev.medicalRecord.medicalHistory,
          labResults: [
            ...prev.medicalRecord.medicalHistory.labResults,
            {
              date: "",
              type: "",
              result: "",
              notes: "",
            },
          ],
        },
      },
    }));
  };

  // Remove a Lab Result for Add Patient
  const removeLabResult = (index: number) => {
    setNewPatient((prev) => {
      const labResults = [...prev.medicalRecord.medicalHistory.labResults];
      labResults.splice(index, 1);
      return {
        ...prev,
        medicalRecord: {
          ...prev.medicalRecord,
          medicalHistory: {
            ...prev.medicalRecord.medicalHistory,
            labResults,
          },
        },
      };
    });
  };

  // Handle adding a new patient
  const handleAddPatient = () => {
    const newId = `P-${patients.length + 1}`;
    const updatedPatients = [...patients, { ...newPatient, id: newId }];
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));

    showSnackbar("Patient added successfully!", "success");

    // Reset newPatient state
    setNewPatient({
      id: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emergencyContact: "",
      dateOfBirth: "",
      address: "",
      email: "",
      gender: "",
      medicalRecord: {
        appointments: [],
        treatments: [],
        medicalHistory: {
          allergies: [],
          surgeries: [],
          chronicDiseases: [],
          labResults: [],
        },
      },
    });
    setDialogOpen(false);
  };

  // Handle search
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredPatients = patients.filter(
    (patient) =>
      patient.firstName.toLowerCase().includes(searchQuery) ||
      patient.lastName.toLowerCase().includes(searchQuery)
  );

  // Constants for multiple select fields
  const surgeryOptions = Object.values(Surgery);
  const chronicDiseaseOptions = Object.values(ChronicDisease);

  // Handle Delete Patient
  const handleDeletePatient = (id: string) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      const updatedPatients = patients.filter((patient) => patient.id !== id);
      setPatients(updatedPatients);
      localStorage.setItem("patients", JSON.stringify(updatedPatients));
      showSnackbar("Patient deleted successfully!", "success");
    }
  };

  // Handle Edit Patient
  const handleEditPatient = (patient: Patient) => {
    setCurrentEditPatient(patient);
    setEditDialogOpen(true);
  };

  // Handle Edit Dialog Input Change
  const handleEditInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!currentEditPatient) return;
    const { name, value } = e.target;
    setCurrentEditPatient({
      ...currentEditPatient,
      [name]: value,
    });
  };

  // Handle Edit Medical History Changes
  const handleEditMedicalHistoryChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof MedicalHistory
  ) => {
    if (!currentEditPatient) return;
    const { value } = e.target;
    setCurrentEditPatient({
      ...currentEditPatient,
      medicalRecord: {
        ...currentEditPatient.medicalRecord,
        medicalHistory: {
          ...currentEditPatient.medicalRecord.medicalHistory,
          [field]: value,
        },
      },
    });
  };

  // Handle Edit Select Changes
  const handleEditSelectChange = (
    event: any,
    field: keyof MedicalHistory
  ) => {
    if (!currentEditPatient) return;
    const { value } = event.target;
    setCurrentEditPatient({
      ...currentEditPatient,
      medicalRecord: {
        ...currentEditPatient.medicalRecord,
        medicalHistory: {
          ...currentEditPatient.medicalRecord.medicalHistory,
          [field]: typeof value === "string" ? value.split(",") : value,
        },
      },
    });
  };

  // Handle Edit Lab Result Changes
  const handleEditLabResultChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: keyof LabResult
  ) => {
    if (!currentEditPatient) return;
    const { value } = e.target;
    const updatedLabResults = [...currentEditPatient.medicalRecord.medicalHistory.labResults];
    updatedLabResults[index] = { ...updatedLabResults[index], [field]: value };
    setCurrentEditPatient({
      ...currentEditPatient,
      medicalRecord: {
        ...currentEditPatient.medicalRecord,
        medicalHistory: {
          ...currentEditPatient.medicalRecord.medicalHistory,
          labResults: updatedLabResults,
        },
      },
    });
  };

  // Add Lab Result in Edit Dialog
  const addEditLabResult = () => {
    if (!currentEditPatient) return;
    setCurrentEditPatient({
      ...currentEditPatient,
      medicalRecord: {
        ...currentEditPatient.medicalRecord,
        medicalHistory: {
          ...currentEditPatient.medicalRecord.medicalHistory,
          labResults: [
            ...currentEditPatient.medicalRecord.medicalHistory.labResults,
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

  // Remove Lab Result in Edit Dialog
  const removeEditLabResult = (index: number) => {
    if (!currentEditPatient) return;
    const updatedLabResults = [...currentEditPatient.medicalRecord.medicalHistory.labResults];
    updatedLabResults.splice(index, 1);
    setCurrentEditPatient({
      ...currentEditPatient,
      medicalRecord: {
        ...currentEditPatient.medicalRecord,
        medicalHistory: {
          ...currentEditPatient.medicalRecord.medicalHistory,
          labResults: updatedLabResults,
        },
      },
    });
  };

  // Handle Save Edited Patient
  const handleSaveEditedPatient = () => {
    if (!currentEditPatient) return;
    const updatedPatients = patients.map((patient) =>
      patient.id === currentEditPatient.id ? currentEditPatient : patient
    );
    setPatients(updatedPatients);
    localStorage.setItem("patients", JSON.stringify(updatedPatients));
    showSnackbar("Patient details updated successfully!", "success");
    setEditDialogOpen(false);
    setCurrentEditPatient(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Patient List
      </Typography>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => setDialogOpen(true)}
        >
          + Add Patient
        </Button>

        <TextField
          variant="outlined"
          placeholder="Search here"
          onChange={handleSearch}
          sx={{
            minWidth: { xs: "100%", sm: "300px" },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPatients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.firstName}</TableCell>
                <TableCell>{patient.lastName}</TableCell>
                <TableCell>{patient.phoneNumber}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{patient.gender}</TableCell>
                <TableCell>{patient.dateOfBirth}</TableCell>
                <TableCell align="center">
                  <Grid container spacing={1} justifyContent="center">
                    <Grid item>
                      <IconButton
                        color="primary"
                        onClick={() => handleEditPatient(patient)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <IconButton
                        color="error"
                        onClick={() => handleDeletePatient(patient.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                    <Grid item>
                      <Link href={`/Patients/${patient.id}`}>
                        <Button variant="outlined" size="small">
                          View Details
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
            {filteredPatients.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No patients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for adding a new patient */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
          {/* Personal Information */}
          <Typography variant="h6" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="firstName"
                label="First Name"
                type="text"
                fullWidth
                variant="outlined"
                value={newPatient.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="lastName"
                label="Last Name"
                type="text"
                fullWidth
                variant="outlined"
                value={newPatient.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="phoneNumber"
                label="Phone Number"
                type="text"
                fullWidth
                variant="outlined"
                value={newPatient.phoneNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                value={newPatient.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="emergencyContact"
                label="Emergency Contact"
                type="text"
                fullWidth
                variant="outlined"
                value={newPatient.emergencyContact}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  name="gender"
                  value={newPatient.gender}
                  onChange={handleInputChange}
                  label="Gender"
                >
                  <MenuItem value="">
                    <em>Select Gender</em>
                  </MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="address"
                label="Address"
                type="text"
                fullWidth
                variant="outlined"
                value={newPatient.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
                fullWidth
                variant="outlined"
                value={newPatient.dateOfBirth}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>

          {/* Medical History Section */}
          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Medical History
          </Typography>
          <Grid container spacing={2}>
            {/* Allergies */}
            <Grid item xs={12}>
              <FormControl fullWidth margin="dense">
                <InputLabel id="allergies-label">Allergies</InputLabel>
                <Select
                  labelId="allergies-label"
                  multiple
                  value={newPatient.medicalRecord.medicalHistory.allergies}
                  onChange={(e) => handleSelectChange(e, "allergies")}
                  input={<OutlinedInput label="Allergies" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {/* Replace with actual allergy options */}
                  {[
                    "Peanuts",
                    "Shellfish",
                    "Dust",
                    "Pollen",
                    "Latex",
                    "Penicillin",
                  ].map((allergy) => (
                    <MenuItem key={allergy} value={allergy}>
                      <Checkbox
                        checked={
                          newPatient.medicalRecord.medicalHistory.allergies.indexOf(
                            allergy
                          ) > -1
                        }
                      />
                      <ListItemText primary={allergy} />
                    </MenuItem>
                  ))}
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
                  value={newPatient.medicalRecord.medicalHistory.surgeries}
                  onChange={(e) => handleSelectChange(e, "surgeries")}
                  input={<OutlinedInput label="Surgeries" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {surgeryOptions.map((surgery) => (
                    <MenuItem key={surgery} value={surgery}>
                      <Checkbox
                        checked={
                          newPatient.medicalRecord.medicalHistory.surgeries.indexOf(
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
                  value={newPatient.medicalRecord.medicalHistory.chronicDiseases}
                  onChange={(e) => handleSelectChange(e, "chronicDiseases")}
                  input={<OutlinedInput label="Chronic Diseases" />}
                  renderValue={(selected) => selected.join(", ")}
                >
                  {chronicDiseaseOptions.map((disease) => (
                    <MenuItem key={disease} value={disease}>
                      <Checkbox
                        checked={
                          newPatient.medicalRecord.medicalHistory.chronicDiseases.indexOf(
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
              {newPatient.medicalRecord.medicalHistory.labResults.map(
                (labResult, index) => (
                  <MuiPaper
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
                  </MuiPaper>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddPatient} color="primary">
            Add Patient
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Editing a patient */}
      {currentEditPatient && (
        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle>Edit Patient</DialogTitle>
          <DialogContent>
            {/* Personal Information */}
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="firstName"
                  label="First Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={currentEditPatient.firstName}
                  onChange={handleEditInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="lastName"
                  label="Last Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={currentEditPatient.lastName}
                  onChange={handleEditInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="phoneNumber"
                  label="Phone Number"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={currentEditPatient.phoneNumber}
                  onChange={handleEditInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={currentEditPatient.email}
                  onChange={handleEditInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="emergencyContact"
                  label="Emergency Contact"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={currentEditPatient.emergencyContact}
                  onChange={handleEditInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="edit-gender-label">Gender</InputLabel>
                  <Select
                    labelId="edit-gender-label"
                    name="gender"
                    value={currentEditPatient.gender}
                    onChange={handleEditInputChange}
                    label="Gender"
                  >
                    <MenuItem value="">
                      <em>Select Gender</em>
                    </MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  name="address"
                  label="Address"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={currentEditPatient.address}
                  onChange={handleEditInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="dense"
                  name="dateOfBirth"
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  variant="outlined"
                  value={currentEditPatient.dateOfBirth}
                  onChange={handleEditInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            {/* Medical History Section */}
            <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
              Medical History
            </Typography>
            <Grid container spacing={2}>
              {/* Allergies */}
              <Grid item xs={12}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="edit-allergies-label">Allergies</InputLabel>
                  <Select
                    labelId="edit-allergies-label"
                    multiple
                    value={currentEditPatient.medicalRecord.medicalHistory.allergies}
                    onChange={(e) => handleEditSelectChange(e, "allergies")}
                    input={<OutlinedInput label="Allergies" />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {/* Replace with actual allergy options */}
                    {[
                      "Peanuts",
                      "Shellfish",
                      "Dust",
                      "Pollen",
                      "Latex",
                      "Penicillin",
                    ].map((allergy) => (
                      <MenuItem key={allergy} value={allergy}>
                        <Checkbox
                          checked={
                            currentEditPatient.medicalRecord.medicalHistory.allergies.indexOf(
                              allergy
                            ) > -1
                          }
                        />
                        <ListItemText primary={allergy} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Surgeries */}
              <Grid item xs={12}>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="edit-surgeries-label">Surgeries</InputLabel>
                  <Select
                    labelId="edit-surgeries-label"
                    multiple
                    value={currentEditPatient.medicalRecord.medicalHistory.surgeries}
                    onChange={(e) => handleEditSelectChange(e, "surgeries")}
                    input={<OutlinedInput label="Surgeries" />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {surgeryOptions.map((surgery) => (
                      <MenuItem key={surgery} value={surgery}>
                        <Checkbox
                          checked={
                            currentEditPatient.medicalRecord.medicalHistory.surgeries.indexOf(
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
                  <InputLabel id="edit-chronicDiseases-label">Chronic Diseases</InputLabel>
                  <Select
                    labelId="edit-chronicDiseases-label"
                    multiple
                    value={currentEditPatient.medicalRecord.medicalHistory.chronicDiseases}
                    onChange={(e) => handleEditSelectChange(e, "chronicDiseases")}
                    input={<OutlinedInput label="Chronic Diseases" />}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {chronicDiseaseOptions.map((disease) => (
                      <MenuItem key={disease} value={disease}>
                        <Checkbox
                          checked={
                            currentEditPatient.medicalRecord.medicalHistory.chronicDiseases.indexOf(
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
                {currentEditPatient.medicalRecord.medicalHistory.labResults.map(
                  (labResult, index) => (
                    <MuiPaper
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
                              handleEditLabResultChange(e, index, "date")
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
                              handleEditLabResultChange(e, index, "type")
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
                              handleEditLabResultChange(e, index, "result")
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => removeEditLabResult(index)}
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
                              handleEditLabResultChange(e, index, "notes")
                            }
                          />
                        </Grid>
                      </Grid>
                    </MuiPaper>
                  )
                )}
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={addEditLabResult}
                  style={{ marginTop: "10px" }}
                >
                  + Add Lab Result
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSaveEditedPatient} color="primary">
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      )}

    </div>
  );
};

export default PatientList;
