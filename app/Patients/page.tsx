"use client";
import React, { useState, ChangeEvent } from "react";
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
  DialogActions,InputAdornment,IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Define a type for the MedicalRecord object
interface MedicalRecord {
  recordDate: string;
  allergies: string;
  maladiesChroniques: string;
  chirurgieAnterieurs: string;
  labResults: string;
  familyHistory: string;
  diagnosis: string;
  treatment: string;
  prescriptions: string;
}

// Define a type for the Patient object
interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emergencyContact: string;
  address: string;
  dateOfBirth: string;
  medicalHistory: string;
  medicalRecords: MedicalRecord[];
}

// Initial patients array
const initialPatients: Patient[] = [];

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newPatient, setNewPatient] = useState<Patient>({
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emergencyContact: "",
    address: "",
    dateOfBirth: "",
    medicalHistory: "",
    medicalRecords: [
      {
        recordDate: "",
        allergies: "",
        maladiesChroniques: "",
        chirurgieAnterieurs: "",
        labResults: "",
        familyHistory: "",
        diagnosis: "",
        treatment: "",
        prescriptions: "",
      },
    ],
  });

  // Handle form input change for Patient
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form input change for MedicalRecord
  const handleMedicalRecordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({
      ...prev,
      medicalRecords: [{ ...prev.medicalRecords[0], [name]: value }],
    }));
  };

  // Handle adding a new patient
  const handleAddPatient = () => {
    const newId = `#P-${patients.length + 1}`;
    setPatients([...patients, { ...newPatient, id: newId }]);
    setNewPatient({
      id: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      emergencyContact: "",
      address: "",
      dateOfBirth: "",
      medicalHistory: "",
      medicalRecords: [
        {
          recordDate: "",
          allergies: "",
          maladiesChroniques: "",
          chirurgieAnterieurs: "",
          labResults: "",
          familyHistory: "",
          diagnosis: "",
          treatment: "",
          prescriptions: "",
        },
      ],
    });
    setDialogOpen(false);
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
   
    setSearchQuery(e.target.value.toLowerCase());
  };
    // Filter doctors based on the search query
    const filteredpatient = patients.filter(
        (patient) =>
          patient.firstName.toLowerCase().includes(searchQuery) ||
          patient.lastName.toLowerCase().includes(searchQuery)
      );

  return (
    <div style={{ padding: "20px" }}>
        <div  style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>

            <Button variant="contained" color="success" onClick={() => setDialogOpen(true)}>
            + Add Patient
            </Button>
           
        <TextField
            variant="outlined"
            placeholder="Search here"
            onChange={handleSearch}
            sx={{
              display: { xs: "none", sm: "block" }, // Hide on xs, show on sm+
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
              <TableCell>FirstName</TableCell>
              <TableCell>LastName</TableCell>
              <TableCell>PhoneNumber</TableCell>
              <TableCell>EmergencyContact</TableCell>
              <TableCell>DateOfBirth</TableCell>
              <TableCell>MedicalHistory</TableCell>
              <TableCell>Medical Records</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredpatient.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.id}</TableCell>
                <TableCell>{patient.firstName}</TableCell>
                <TableCell>{patient.lastName}</TableCell>
                <TableCell>{patient.phoneNumber}</TableCell>
                <TableCell>{patient.emergencyContact}</TableCell>
                <TableCell>{patient.dateOfBirth}</TableCell>
                <TableCell>{patient.medicalHistory}</TableCell>
                <TableCell>
                  {patient.medicalRecords.map((record, index) => (
                    <div key={index}>
                      <strong>Record Date:</strong> {record.recordDate}
                      <br />
                      <strong>Allergies:</strong> {record.allergies}
                      <br />
                      <strong>Diagnosis:</strong> {record.diagnosis}
                      <br />
                      <strong>Treatment:</strong> {record.treatment}
                      <br />
                    </div>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for adding a new patient */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="firstName"
            label="First Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="lastName"
            label="Last Name"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="phoneNumber"
            label="Phone Number"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="emergencyContact"
            label="Emergency Contact"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="address"
            label="Address"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="dateOfBirth"
            label="Date of Birth"
            type="date"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="medicalHistory"
            label="Medical History"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />

          <h4>Medical Records</h4>
          <TextField
            margin="dense"
            name="recordDate"
            label="Record Date"
            type="date"
            fullWidth
            variant="outlined"
            onChange={handleMedicalRecordChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="allergies"
            label="Allergies"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleMedicalRecordChange}
          />
          <TextField
            margin="dense"
            name="diagnosis"
            label="Diagnosis"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleMedicalRecordChange}
          />
          <TextField
            margin="dense"
            name="treatment"
            label="Treatment"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleMedicalRecordChange}
          />
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
    </div>
  );
};

export default PatientList;
