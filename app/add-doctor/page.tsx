"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
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
  Avatar,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// Define a type for the Doctor object
interface Doctor {
  id: string;
  speciality: string;
  firstName: string;
  lastName: string;
  email: string;
  adress: string;
  contact: string;
  imageUrl: string;
  password: string;
  codeCNOM :string;
  codeCNAM :string;

}

// Initial doctors array
const initialDoctors: Doctor[] = [
  {
    id: "#D-001",
    speciality: "Cardiology",
    firstName: "Daulat ",
    lastName: "Hussain",
    email: "theblockchaincoders@gmail.com",
    adress: "adress",
    contact: "+1-555-123",
    imageUrl: "/doctor1.png",
    password:"********",
    codeCNOM :"8740000",
    codeCNAM :"563331216",
  },
  {
    id: "#D-002",
    speciality: "Cardiology",
    firstName: "John Smith",
    lastName: "Smith",
    email: "john.smith@example.com",
    adress: "adress",
    contact: "+1-555-123",
    imageUrl: "/doctor2.png",
    password:"********",
    codeCNOM :"8740000",
    codeCNAM :"563331216",
  },
  {
    id: "#D-003",
    speciality: "Pediatrics",
    firstName: "Emily Johnson",
    lastName: "Smith",
    email: "emily.johnson@example.com",
    adress: "adress",
    contact: "+1-555-234",
    imageUrl: "/doctor3.png",
    password:"********",
    codeCNOM :"8740000",
    codeCNAM :"563331216",
  },
  {
    id: "#D-004",
    speciality: "Neurology",
    firstName: "Michael Brown",
    lastName: "Smith",
    email: "michael.brown@example.com",
    adress: "adress",
    contact: "+1-555-345",
    imageUrl: "/doctor4.png",
    password:"********",
    codeCNOM :"8740000",
    codeCNAM :"563331216",
  },
  {
    id: "#D-005",
    speciality: "Dermatology",
    firstName: "Sarah Davis",
    lastName: "Smith",
    email: "sarah.davis@example.com",
    adress: "adress",
    contact: "+1-555-456",
    imageUrl: "/doctor5.png",
    password:"********",
    codeCNOM :"8740000",
    codeCNAM :"563331216",
  },
];

const DoctorList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(initialDoctors);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [newDoctor, setNewDoctor] = useState<Doctor>({
    id: "",
    speciality: "",
    firstName: "",
    lastName: "",
    email: "",
    adress: "",
    contact: "",
    imageUrl: "",
    password:"",
    codeCNOM :"",
    codeCNAM :"",
  });

  // Handle search input change
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
   
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Handle form input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    
    const { name, value } = e.target; //e.target.name &&  e.target.value//

    setNewDoctor((prev) => ({ ...prev, [name]: value }));//pour conserver tous les champs de form lors de remplir "prev"
    
  };

  // Handle adding a new doctor
  const handleAddDoctor = () => {
    const newId = `#D-${doctors.length + 1}`;
    setDoctors([...doctors, { ...newDoctor, id: newId }]);
    setNewDoctor({ // Reset newDoctor state
      id: "",
      speciality: "",
      firstName: "",
      lastName: "",
      email: "",
      adress: "",
      contact: "",
      imageUrl: "",
      password:"",
      codeCNOM :"",
      codeCNAM :"",
    });
    setDialogOpen(false);
  };



  // Filter doctors based on the search query
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.firstName.toLowerCase().includes(searchQuery) ||
      doctor.lastName.toLowerCase().includes(searchQuery)||
      doctor.speciality.toLowerCase().includes(searchQuery)
  );

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
        <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
          + Add Doctor
        </Button>

        <TextField
          variant="outlined"
          placeholder="Search here"
          onChange={handleSearch}
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
              <TableCell>speciality</TableCell>
              <TableCell>FirstName</TableCell>
              <TableCell>LastName</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Adress</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>codeCNOM</TableCell>
              <TableCell>codeCNAM</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDoctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>
                  <Avatar alt={doctor.firstName} src={doctor.imageUrl} /> {doctor.id}
                </TableCell>
                <TableCell>{doctor.speciality}</TableCell>
                <TableCell>{doctor.firstName}</TableCell>
                <TableCell>{doctor.lastName}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell> {doctor.adress}</TableCell>
                <TableCell>{doctor.contact}</TableCell>
                <TableCell>{doctor.codeCNOM}</TableCell>
                <TableCell>{doctor.codeCNAM}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for adding a new doctor */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add New Doctor</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="firstName"
            label="firstName"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
           <TextField
            autoFocus
            margin="dense"
            name="lastName"
            label="lastName"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="adress"
            label="Adress"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="password"
            label="password"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="speciality"
            label="speciality"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="CodeCNOM"
            label="CodeCNOM"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            autoFocus
            margin="dense"
            name="CodeCNAM"
            label="CodeCNAM"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="contact"
            label="Contact"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddDoctor} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DoctorList;
