# PawBook Veterinary Management System - Core Foundation Diagrams

## IPO Diagram (Input-Process-Output)

### Core IPO Diagram

```mermaid
graph LR
    subgraph "INPUTS"
        I1[User Registration Data]
        I2[Pet Information]
        I3[Appointment Requests]
        I4[Service Selection]
        I5[Time/Date Selection]
        I6[Medical Notes]
        I7[Admin Configuration]
    end
    
    subgraph "PROCESSING"
        P1[Authentication & Authorization]
        P2[Data Validation]
        P3[Appointment Scheduling]
        P4[Availability Checking]
        P5[Status Management]
        P6[Role-Based Access Control]
        P7[Data Storage & Retrieval]
        P8[Notification Generation]
    end
    
    subgraph "OUTPUTS"
        O1[User Dashboard]
        O2[Appointment Confirmations]
        O3[Schedule Views]
        O4[Analytics Reports]
        O5[Status Updates]
        O6[Pet Profiles]
        O7[Service Catalog]
    end
    
    I1 --> P1
    I2 --> P2
    I3 --> P3
    I4 --> P2
    I5 --> P4
    I6 --> P5
    I7 --> P6
    
    P1 --> P7
    P2 --> P7
    P3 --> P8
    P4 --> P3
    P5 --> P8
    P6 --> P7
    P7 --> P8
    
    P8 --> O1
    P8 --> O2
    P8 --> O3
    P8 --> O4
    P8 --> O5
    P8 --> O6
    P8 --> O7
```

### IPO Analysis

#### **Input Layer - Core Foundation**
- **User Registration Data**: Authentication foundation for all system access
- **Pet Information**: Core data entity driving appointment system
- **Appointment Requests**: Primary business transaction input
- **Service Selection**: Service catalog foundation for pricing and scheduling
- **Time/Date Selection**: Temporal foundation for booking system
- **Medical Notes**: Clinical data foundation for patient care
- **Admin Configuration**: System configuration foundation for business rules

#### **Processing Layer - Core Logic**
- **Authentication & Authorization**: Security foundation for role-based access
- **Data Validation**: Data integrity foundation across all operations
- **Appointment Scheduling**: Core business logic foundation
- **Availability Checking**: Resource management foundation
- **Status Management**: Workflow foundation for appointment lifecycle
- **Role-Based Access Control**: Permission foundation for multi-user system
- **Data Storage & Retrieval**: Persistence foundation for all data
- **Notification Generation**: Communication foundation for user engagement

#### **Output Layer - User Interface**
- **User Dashboard**: Primary interface foundation for all user roles
- **Appointment Confirmations**: Transaction confirmation foundation
- **Schedule Views**: Temporal visualization foundation
- **Analytics Reports**: Business intelligence foundation
- **Status Updates**: Real-time information foundation
- **Pet Profiles**: Patient information foundation
- **Service Catalog**: Service offering foundation

---

## System Architecture

### Core System Architecture

```mermaid
graph TB
    subgraph "Context layer (global state)"
        AUTH[AppContext]
        USER[User State]
        APPT[Appointment State]
        PET[Pet State]
        SERVICE[Service State]
    end
    
    subgraph "React Router"
        ROUTER[React Router 6.26.2]
    end
    
    subgraph "User interfaces"
        subgraph "Public"
            LOGIN[Login]
            SIGNUP[Sign Up]
            LANDING[Landing Page]
        end
        
        subgraph "Client"
            CLIENT_DASH[Client Dashboard]
            BOOK_APPT[Book Appointment]
            MY_PETS[My Pets]
            MY_APPTS[My Appointments]
        end
        
        subgraph "Provider"
            PROVIDER_DASH[Provider Dashboard]
            APPT_DETAIL[Appointment Detail]
            MANAGE_SCHED[Manage Schedule]
        end
        
        subgraph "Admin protected only"
            ADMIN_DASH[Admin Dashboard]
            MGMT_USERS[Manage Users]
            MGMT_SERVICES[Manage Services]
            MGMT_APPTS[Manage Appointments]
            REPORTS[Reports]
        end
    end
    
    subgraph "Shared components"
        LAYOUT[Layout]
        NAVBAR[Navbar]
        FOOTER[Footer]
        PROTECTED[ProtectedRoute]
        CARD[Card Component]
        FORM[Form Component]
        CALENDAR[Custom Calendar]
        TIME_PICKER[Time Picker]
        MODAL[Modal Component]
    end
    
    subgraph "Persistence (localStorage)"
        USERS_DB[users]
        PETS_DB[pets]
        APPOINTMENTS_DB[appointments]
        SERVICES_DB[services]
        VETS_DB[veterinarians]
        CURRENT_USER[currentUser]
    end
    
    subgraph "Technologies"
        VITE[Vite 5.2.0]
        REACT[React 18.3.1]
        TYPESCRIPT[TypeScript 5.5.4]
        TAILWIND[TailwindCSS 3.4.17]
        MOTION[Framer Motion 11.5.4]
        ICONS[Lucide React 0.522.0]
        CHARTS[Recharts 2.12.7]
    end
    
    %% Connections
    AUTH --> USER
    AUTH --> APPT
    AUTH --> PET
    AUTH --> SERVICE
    
    USER --> ROUTER
    APPT --> ROUTER
    PET --> ROUTER
    SERVICE --> ROUTER
    
    ROUTER --> LOGIN
    ROUTER --> SIGNUP
    ROUTER --> LANDING
    ROUTER --> CLIENT_DASH
    ROUTER --> PROVIDER_DASH
    ROUTER --> ADMIN_DASH
    
    CLIENT_DASH --> BOOK_APPT
    CLIENT_DASH --> MY_PETS
    CLIENT_DASH --> MY_APPTS
    
    PROVIDER_DASH --> APPT_DETAIL
    PROVIDER_DASH --> MANAGE_SCHED
    
    ADMIN_DASH --> MGMT_USERS
    ADMIN_DASH --> MGMT_SERVICES
    ADMIN_DASH --> MGMT_APPTS
    ADMIN_DASH --> REPORTS
    
    LOGIN --> LAYOUT
    SIGNUP --> LAYOUT
    LANDING --> LAYOUT
    CLIENT_DASH --> LAYOUT
    PROVIDER_DASH --> LAYOUT
    ADMIN_DASH --> LAYOUT
    
    LAYOUT --> NAVBAR
    LAYOUT --> FOOTER
    LAYOUT --> PROTECTED
    
    BOOK_APPT --> CARD
    BOOK_APPT --> FORM
    BOOK_APPT --> CALENDAR
    BOOK_APPT --> TIME_PICKER
    
    APPT_DETAIL --> CARD
    APPT_DETAIL --> MODAL
    
    MANAGE_SCHED --> CALENDAR
    MANAGE_SCHED --> TIME_PICKER
    
    AUTH --> USERS_DB
    AUTH --> CURRENT_USER
    PET --> PETS_DB
    APPT --> APPOINTMENTS_DB
    SERVICE --> SERVICES_DB
    SERVICE --> VETS_DB
    
    VITE --> REACT
    REACT --> TYPESCRIPT
    TYPESCRIPT --> TAILWIND
    TAILWIND --> MOTION
    MOTION --> ICONS
    ICONS --> CHARTS
```

---

## Data Flow Diagram (DFD)

### Level 0 DFD - System Context

```mermaid
graph TB
    subgraph "External Entities"
        CLIENT[Pet Owner/Client]
        PROVIDER[Veterinarian/Provider]
        ADMIN[Administrator]
        BROWSER[Web Browser]
        SYSTEM_OS[Operating System]
    end
    
    subgraph "PawBook Veterinary Management System"
        SYSTEM[Core System]
    end
    
    CLIENT -.->|1.0 Book Appointment| SYSTEM
    CLIENT <-.->|2.0 Manage Pet Profiles| SYSTEM
    CLIENT <-.->|3.0 View Appointment History| SYSTEM
    CLIENT <-.->|4.0 Receive Notifications| SYSTEM
    
    PROVIDER <-.->|5.0 Manage Schedule| SYSTEM
    PROVIDER <-.->|6.0 View Patient Information| SYSTEM
    PROVIDER <-.->|7.0 Update Appointment Status| SYSTEM
    PROVIDER <-.->|8.0 Add Medical Notes| SYSTEM
    
    ADMIN <-.->|9.0 Manage User Accounts| SYSTEM
    ADMIN <-.->|10.0 Manage Service Catalog| SYSTEM
    ADMIN <-.->|11.0 Generate Reports| SYSTEM
    ADMIN <-.->|12.0 System Configuration| SYSTEM
    
    BROWSER <--->|13.0 Web Interface| SYSTEM
    SYSTEM_OS <--->|14.0 System Resources| SYSTEM
```

### Level 1 DFD - Core System Processes

```mermaid
graph TB
    subgraph "External Entities"
        USER[All Users]
        BROWSER[Web Browser]
    end
    
    subgraph "Core Processes"
        P1[1.0 Authentication Process]
        P2[2.0 Appointment Management Process]
        P3[3.0 Pet Management Process]
        P4[4.0 User Management Process]
        P5[5.0 Service Management Process]
        P6[6.0 Reporting Process]
        P7[7.0 Notification Process]
    end
    
    subgraph "Data Stores"
        D1[User Store]
        D2[Pet Store]
        D3[Appointment Store]
        D4[Service Store]
        D5[Veterinarian Store]
        D6[Session Store]
        D7[Notification Store]
    end
    
    USER --> P1
    USER --> P2
    USER --> P3
    USER --> P4
    USER --> P5
    USER --> P6
    USER --> P7
    
    P1 --> D1
    P1 --> D6
    
    P2 --> D3
    P2 --> D2
    P2 --> D4
    P2 --> D5
    P2 --> D1
    
    P3 --> D2
    P3 --> D1
    
    P4 --> D1
    P4 --> D5
    
    P5 --> D4
    
    P6 --> D3
    P6 --> D2
    P6 --> D1
    P6 --> D4
    
    P7 --> D7
    P7 --> D1
    
    BROWSER --> P1
    BROWSER --> P2
    BROWSER --> P3
    BROWSER --> P4
    BROWSER --> P5
    BROWSER --> P6
    BROWSER --> P7
```

### Level 2 DFD - Appointment Management Process Detail

```mermaid
graph TB
    subgraph "External Entities"
        CLIENT[Client]
        PROVIDER[Provider]
        ADMIN[Admin]
    end
    
    subgraph "Appointment Sub-Processes"
        P1[2.1 Create Appointment]
        P2[2.2 Validate Appointment]
        P3[2.3 Check Availability]
        P4[2.4 Confirm Booking]
        P5[2.5 Update Status]
        P6[2.6 Cancel Appointment]
        P7[2.7 Reschedule Appointment]
        P8[2.8 Generate Appointment Reports]
    end
    
    subgraph "Data Stores"
        D1[Appointment Store]
        D2[User Store]
        D3[Pet Store]
        D4[Service Store]
        D5[Veterinarian Store]
        D6[Schedule Store]
        D7[Audit Log Store]
    end
    
    CLIENT --> P1
    PROVIDER --> P5
    PROVIDER --> P7
    ADMIN --> P6
    ADMIN --> P8
    
    P1 --> P2
    P2 --> P3
    P3 --> P4
    P4 --> D1
    
    P5 --> D1
    P6 --> D1
    P7 --> P3
    P8 --> D1
    
    P1 --> D2
    P1 --> D3
    P1 --> D4
    P3 --> D5
    P3 --> D6
    
    D1 --> P4
    D1 --> P5
    D1 --> P6
    D1 --> P7
    D1 --> P8
    
    D2 --> P1
    D3 --> P1
    D4 --> P1
    D5 --> P3
    D6 --> P3
    
    P1 --> D7
    P5 --> D7
    P6 --> D7
    P7 --> D7
```

### Level 2 DFD - Authentication Process Detail

```mermaid
graph TB
    subgraph "External Entities"
        USER[User]
        BROWSER[Browser]
    end
    
    subgraph "Authentication Sub-Processes"
        P1[1.1 Validate Credentials]
        P2[1.2 Create Session]
        P3[1.3 Role-Based Access]
        P4[1.4 Session Management]
        P5[1.5 Logout Process]
    end
    
    subgraph "Data Stores"
        D1[User Store]
        D2[Session Store]
        D3[Audit Log Store]
    end
    
    USER --> P1
    USER --> P5
    BROWSER --> P1
    BROWSER --> P4
    
    P1 --> D1
    P1 --> P2
    P2 --> P3
    P3 --> D2
    P4 --> D2
    P5 --> D2
    
    D1 --> P1
    D2 --> P3
    D2 --> P4
    
    P1 --> D3
    P2 --> D3
    P5 --> D3
```

### Level 2 DFD - Pet Management Process Detail

```mermaid
graph TB
    subgraph "External Entities"
        CLIENT[Client]
        PROVIDER[Provider]
        ADMIN[Admin]
    end
    
    subgraph "Pet Management Sub-Processes"
        P1[3.1 Add Pet Profile]
        P2[3.2 Update Pet Information]
        P3[3.3 Validate Pet Data]
        P4[3.4 Delete Pet Profile]
        P5[3.5 View Pet History]
        P6[3.6 Link to Appointments]
    end
    
    subgraph "Data Stores"
        D1[Pet Store]
        D2[User Store]
        D3[Appointment Store]
        D4[Audit Log Store]
    end
    
    CLIENT --> P1
    CLIENT --> P2
    CLIENT --> P5
    PROVIDER --> P2
    PROVIDER --> P6
    ADMIN --> P4
    
    P1 --> P3
    P2 --> P3
    P3 --> D1
    P4 --> D1
    P5 --> D1
    P6 --> D1
    
    P1 --> D2
    P6 --> D3
    
    D1 --> P3
    D1 --> P5
    D2 --> P1
    D3 --> P6
    
    P1 --> D4
    P2 --> D4
    P4 --> D4
```

### Data Flow Sequences

#### **Complete Appointment Booking Flow**
```mermaid
sequenceDiagram
    participant C as Client
    participant UI as User Interface
    participant V as Validation Process
    participant A as Availability Check
    participant S as Schedule Store
    participant APPT as Appointment Store
    participant N as Notification Process
    participant P as Provider
    
    C->>UI: Initiate Booking
    UI->>V: Validate User Session
    V->>UI: Session Valid
    UI->>C: Show Booking Form
    C->>UI: Select Pet & Service
    UI->>A: Check Availability
    A->>S: Query Available Slots
    S->>A: Return Available Times
    A->>UI: Show Available Slots
    UI->>C: Display Time Options
    C->>UI: Select Time Slot
    UI->>APPT: Create Appointment
    APPT->>N: Trigger Confirmation
    N->>P: Notify Provider
    N->>C: Send Confirmation
    UI->>C: Show Booking Success
```

#### **Provider Status Update Flow**
```mermaid
sequenceDiagram
    participant P as Provider
    participant UI as Provider Interface
    participant V as Validation Process
    participant APPT as Appointment Store
    participant AUDIT as Audit Log
    participant N as Notification Process
    participant C as Client
    
    P->>UI: Update Appointment Status
    UI->>V: Validate Provider Access
    V->>UI: Access Granted
    UI->>APPT: Update Status
    APPT->>AUDIT: Log Status Change
    APPT->>N: Trigger Status Notification
    N->>C: Send Status Update
    N->>P: Confirm Update
    UI->>P: Display Updated Status
```

#### **Admin User Management Flow**
```mermaid
sequenceDiagram
    participant A as Admin
    participant UI as Admin Interface
    participant V as Validation Process
    participant USER as User Store
    participant AUDIT as Audit Log
    participant N as Notification Process
    participant U as Affected User
    
    A->>UI: Manage User Account
    UI->>V: Validate Admin Access
    V->>UI: Admin Access Confirmed
    UI->>USER: Create/Update User
    USER->>AUDIT: Log User Change
    USER->>N: Trigger User Notification
    N->>U: Notify Account Change
    UI->>A: Confirm User Update
```

### Comprehensive Data Dictionary

#### **Data Elements Definition**

**User-Related Elements:**
- **User_ID**: UUID string (36 chars) - Unique user identifier
- **Email**: String (255 chars) - User email address
- **Password_Hash**: String (255 chars) - Encrypted password
- **Name**: String (100 chars) - Full user name
- **Phone**: String (20 chars) - Contact phone number
- **Role**: Enum ['client', 'provider', 'admin'] - User role
- **Created_At**: DateTime - Account creation timestamp
- **Last_Login**: DateTime - Last login timestamp
- **Status**: Enum ['active', 'inactive', 'suspended'] - Account status

**Pet-Related Elements:**
- **Pet_ID**: UUID string (36 chars) - Unique pet identifier
- **Owner_ID**: UUID string (36 chars) - Reference to owner
- **Name**: String (50 chars) - Pet name
- **Species**: String (50 chars) - Animal species
- **Breed**: String (50 chars) - Animal breed
- **Age**: Integer - Pet age in years
- **Weight**: Decimal (5,2) - Pet weight in kg
- **Medical_Notes**: Text (2000 chars) - Medical history
- **Created_At**: DateTime - Pet profile creation
- **Updated_At**: DateTime - Last profile update

**Appointment-Related Elements:**
- **Appointment_ID**: UUID string (36 chars) - Unique appointment identifier
- **Pet_ID**: UUID string (36 chars) - Reference to pet
- **Owner_ID**: UUID string (36 chars) - Reference to owner
- **Provider_ID**: UUID string (36 chars) - Reference to veterinarian
- **Service_ID**: UUID string (36 chars) - Reference to service
- **Date**: Date - Appointment date (YYYY-MM-DD)
- **Time**: String (8 chars) - Appointment time (HH:MM AM/PM)
- **Status**: Enum ['upcoming', 'completed', 'cancelled', 'checked-in'] - Current status
- **Notes**: Text (1000 chars) - Client notes
- **Visit_Notes**: Text (2000 chars) - Provider visit notes
- **Created_At**: DateTime - Booking timestamp
- **Updated_At**: DateTime - Last status update

**Service-Related Elements:**
- **Service_ID**: UUID string (36 chars) - Unique service identifier
- **Name**: String (100 chars) - Service name
- **Description**: Text (500 chars) - Service description
- **Duration**: Integer - Duration in minutes
- **Price**: Decimal (10,2) - Service price
- **Active**: Boolean - Service availability
- **Category**: String (50 chars) - Service category
- **Created_At**: DateTime - Service creation
- **Updated_At**: DateTime - Last update

#### **Data Flows Definition**

**Authentication Flows:**
- **Login_Request**: {email, password} - User login credentials
- **Login_Response**: {user_data, session_token, role} - Authentication result
- **Logout_Request**: {session_token} - Session termination
- **Session_Validate**: {session_token} - Session validation
- **Role_Check**: {user_id, resource} - Permission verification

**Appointment Flows:**
- **Appointment_Create**: {pet_id, service_id, date, time, notes} - New appointment
- **Appointment_Update**: {appointment_id, status, notes} - Status update
- **Appointment_Query**: {date, provider_id, status} - Appointment search
- **Availability_Check**: {date, service_id} - Time slot availability
- **Appointment_Cancel**: {appointment_id, reason} - Cancellation request

**Pet Management Flows:**
- **Pet_Create**: {owner_id, name, species, breed, age, weight} - New pet
- **Pet_Update**: {pet_id, fields_to_update} - Pet information update
- **Pet_Query**: {owner_id, pet_id} - Pet information request
- **Pet_History**: {pet_id} - Medical history request

**Notification Flows:**
- **Notification_Create**: {recipient_id, type, message, data} - New notification
- **Notification_Send**: {notification_id, channel} - Send notification
- **Notification_Read**: {notification_id, user_id} - Mark as read
- **Notification_Delete**: {notification_id} - Remove notification

#### **Data Stores Definition**

**User Store:**
- **Purpose**: Store all user account information
- **Primary Key**: User_ID
- **Indexes**: Email, Role, Status
- **Data Volume**: Estimated 1000-10000 records
- **Access Patterns**: Read-heavy during login, write during registration

**Pet Store:**
- **Purpose**: Store pet profiles and medical information
- **Primary Key**: Pet_ID
- **Foreign Keys**: Owner_ID
- **Indexes**: Owner_ID, Species, Name
- **Data Volume**: Estimated 2000-20000 records
- **Access Patterns**: Read-heavy for appointments, moderate writes for updates

**Appointment Store:**
- **Purpose**: Store all appointment records
- **Primary Key**: Appointment_ID
- **Foreign Keys**: Pet_ID, Owner_ID, Provider_ID, Service_ID
- **Indexes**: Date, Provider_ID, Status, Owner_ID
- **Data Volume**: Estimated 5000-50000 records annually
- **Access Patterns**: High read/write during business hours

**Service Store:**
- **Purpose**: Store service catalog and pricing
- **Primary Key**: Service_ID
- **Indexes**: Category, Active, Name
- **Data Volume**: Estimated 50-200 records
- **Access Patterns**: Read-heavy, occasional updates

**Session Store:**
- **Purpose**: Store active user sessions
- **Primary Key**: Session_Token
- **Indexes**: User_ID, Expiry_Time
- **Data Volume**: Estimated 100-500 concurrent sessions
- **Access Patterns**: High read/write during login/logout

**Audit Log Store:**
- **Purpose**: Store system audit trail
- **Primary Key**: Log_ID
- **Indexes**: User_ID, Timestamp, Action_Type
- **Data Volume**: Estimated 10000-100000 records annually
- **Access Patterns**: Write-heavy, occasional reads for compliance

#### **Data Quality Rules**

**Validation Rules:**
- **Email**: Must be valid email format
- **Phone**: Must match phone number pattern
- **Date**: Must be future date for appointments
- **Time**: Must be within business hours
- **Age**: Must be reasonable for species
- **Weight**: Must be positive number

**Integrity Rules:**
- **Foreign Keys**: Must reference existing records
- **Uniqueness**: Email addresses must be unique
- **Business Rules**: Cannot double-book same time slot
- **Status Flow**: Must follow valid status transitions

**Security Rules:**
- **Password**: Must meet complexity requirements
- **PII**: Sensitive data must be encrypted
- **Access**: Role-based data access restrictions
- **Audit**: All data changes must be logged

---

## Core Foundation Summary

### **System Pillars**

1. **Authentication Foundation**: Role-based access control securing all system operations
2. **Data Foundation**: Structured data models ensuring consistency and integrity
3. **Process Foundation**: Business logic driving all veterinary clinic operations
4. **Interface Foundation**: User-centric design for all three user roles
5. **Technology Foundation**: Modern web stack ensuring performance and scalability

### **Key Architectural Decisions**

1. **Component-Based Architecture**: Modular design for maintainability
2. **React Context for State**: Centralized state management
3. **Role-Based Access**: Three-tier user permission system
4. **Progressive Enhancement**: Ready for backend integration
5. **Responsive Design**: Mobile-first approach for accessibility

### **Scalability Considerations**

1. **Modular Components**: Easy to extend and modify
2. **Service-Oriented Design**: Clear separation of concerns
3. **State Management**: Efficient data flow patterns
4. **Technology Stack**: Modern and well-supported technologies
5. **Data Architecture**: Structured for future enhancements

---

**Document Version:** 1.0  
**System:** PawBook Veterinary Management System  
**Focus:** Core Foundation Architecture  
**Date:** May 8, 2026
