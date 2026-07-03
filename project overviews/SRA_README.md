# SRA Groups — Attendance & Management System

A comprehensive, full-stack management system designed for **SRA Groups** to track employee attendance, manage real estate projects, and handle CRM/finance workflows.

## 🚀 System Components

1.  **Backend**: FastAPI (Python) server providing endpoints for authentication, attendance, site management, CRM, and analytics.
2.  **Admin Dashboard**: React (Vite) web application for administrators and supervisors.
3.  **Mobile App**: React Native (Expo) app for workers (self check-in/out) and supervisors (QR scanning/verification).

---

## 🛠️ Installation & Setup

### 1. Backend Setup
1.  Navigate to the `backend` directory.
2.  Ensure you have Python 3.13+ installed.
3.  Create a virtual environment:
    ```bash
    python -m venv venv
    ```
4.  Activate the virtual environment:
    - **Windows**: `venv\Scripts\activate`
    - **Mac/Linux**: `source venv/bin/activate`
5.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
6.  Run the server:
    ```bash
    uvicorn main:app --reload --host 0.0.0.0 --port 8000
    ```
7.  Ensure `.env` and `serviceAccountKey.json` are present for Firebase connectivity.

### 2. Admin Dashboard Setup
1.  Navigate to the `real-estate-dashboard` directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

### 3. Mobile App Setup
1.  Navigate to the `RealEstateAttendanceApp` directory.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the Expo app:
    ```bash
    npx expo start
    ```

---

## 🏃 Running the Application

To run the full system, start all three components:

| Component | Command | URL / Access |
| :--- | :--- | :--- |
| **Backend** | `python main.py` | `http://localhost:8000/docs` (Swagger) |
| **Dashboard** | `npm run dev` | `http://localhost:5173` |
| **Mobile App** | `npx expo start` | Scan QR using **Expo Go** app |

> [!NOTE]
> For the mobile app to connect to the backend on a physical device, ensure the `API_BASE` in `App.jsx` matches your computer's LAN IP address.

---

## 📋 Operating Guide

### Administrator / Supervisor Workflow
1.  **Login**: Use admin credentials on the Dashboard or Mobile App.
2.  **Worker Registration**:
    - Go to the **Workers** tab on the Dashboard.
    - Create a worker by providing their name, email, password, and QR ID.
    - **Note**: Workers cannot sign up themselves; accounts must be created by an admin.
3.  **Site Management**:
    - Create work sites with specific GPS coordinates and a geofence radius.
4.  **Attendance Monitoring**:
    - View live attendance logs, including verification photos.
    - Export monthly attendance summaries as CSV.
5.  **Leave Management**:
    - Review leave requests from workers and Approve/Reject them.
6.  **Supervisor Activity (Mobile)**:
    - Use the mobile app to scan worker QR codes when they arrive to manually mark attendance.
    - Capture verification photos during scans.
    - Post live site updates with notes.

### Worker Workflow
1.  **Login**: Use the credentials provided by your admin.
2.  **Check-In**:
    - Upon arriving at the assigned site, tap **CHECK IN**.
    - The app validates your GPS location against the site's geofence.
3.  **Check-Out**:
    - Before leaving, tap **CHECK OUT**. The system calculates your hours worked.
4.  **History & Leaves**:
    - View your attendance history directly in the app.
    - Submit leave requests and track their approval status.

---

## ✨ Core Features
- **GPS Geofencing**: Validates worker location for self-check-ins.
- **Role-Based Access**: Specialized dashboards for workers and admins.
- **Audit Trail**: Every significant action (check-in, login, site creation) is logged for security.
- **Monthly Analytics**: Automatic overtime calculation and visual bar charts.
- **CRM & Finance**: Manage brokers, clients, deals, and wage payments.
- **SRA Groups Branding**: Professionally branded across all interfaces.
