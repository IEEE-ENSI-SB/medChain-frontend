// interfaces.ts

export enum Surgery {
    Appendectomy = "Appendectomy",
    GallbladderRemoval = "Gallbladder Removal",
    HeartBypass = "Heart Bypass",
    // Add more surgeries as needed
  }
  
  export enum ChronicDisease {
    Diabetes = "Diabetes",
    Hypertension = "Hypertension",
    Asthma = "Asthma",
    // Add more chronic diseases as needed
  }

  export interface LabResult {
    date: string;
    type: string; // e.g., Blood Test, X-Ray
    result: string;
    notes?: string;
  }
  
  
  // MedicalHistory interface
  export interface MedicalHistory {
    allergies: string[]; // List of allergies
    surgeries: Surgery[]; // List of surgeries
    chronicDiseases: ChronicDisease[]; // List of chronic diseases
    labResults: LabResult[]; // Limited to one entry
  }
  
  // Treatment interface
  export interface Treatment {
    id: string;
    name: string;
    beginDate: string;
    endDate: string;
  }
  
  // Appointment interface
  export interface Appointment {
    id: string;
    date: string;
    time: string;
    diagnosis: string;
    reason: string;
    treatments: Treatment[]; // Associated treatments
  }
  
  // MedicalRecord interface
  export interface MedicalRecord {
    appointments: Appointment[];
    treatments: Treatment[]; // Cumulative list
    medicalHistory: MedicalHistory;
  }
  
  // Patient interface
  export interface Patient {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emergencyContact: string;
    dateOfBirth: string;
    address: string;
    email: string;
    gender: string;
    medicalRecord: MedicalRecord;
  }
  