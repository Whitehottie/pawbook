# PawBook System Architecture Diagrams

## 🏗️ Overall System Architecture

```mermaid
graph TB
    subgraph "Frontend Layer"
        UI[React Components]
        Router[React Router]
        State[Context Store]
    end
    
    subgraph "User Interfaces"
        Client[Client Dashboard]
        Provider[Provider Dashboard]
        Admin[Admin Dashboard]
        Public[Public Pages]
    end
    
    subgraph "Data Layer"
        Store[Global State]
        Models[Data Models]
        Actions[State Actions]
    end
    
    subgraph "External Services"
        Supabase[(Supabase)]
        Icons[Lucide Icons]
        Charts[Recharts]
    end
    
    Public --> Router
    Client --> Router
    Provider --> Router
    Admin --> Router
    
    Router --> UI
    UI --> State
    State --> Store
    Store --> Models
    Store --> Actions
    
    State -.-> Supabase
    UI -.-> Icons
    UI -.-> Charts
```

## 🎭 User Role Architecture

```mermaid
graph LR
    subgraph "Authentication Layer"
        Auth[SignIn/SignUp]
        Protected[ProtectedRoute]
    end
    
    subgraph "Client Role"
        CDash[Client Dashboard]
        Book[Book Appointment]
        MyAppointments[My Appointments]
        MyPets[My Pets]
    end
    
    subgraph "Provider Role"
        PDash[Provider Dashboard]
        ApptDetail[Appointment Details]
        Schedule[Manage Schedule]
    end
    
    subgraph "Admin Role"
        ADash[Admin Dashboard]
        MgmtClients[Manage Clients]
        MgmtPets[Manage Pets]
        MgmtServices[Manage Services]
        MgmtStaff[Manage Staff]
        Reports[Reports]
    end
    
    Auth --> Protected
    Protected --> CDash
    Protected --> PDash
    Protected --> ADash
    
    CDash --> Book
    CDash --> MyAppointments
    CDash --> MyPets
    
    PDash --> ApptDetail
    PDash --> Schedule
    
    ADash --> MgmtClients
    ADash --> MgmtPets
    ADash --> MgmtServices
    ADash --> MgmtStaff
    ADash --> Reports
```

## 📊 Data Flow Architecture

```mermaid
sequenceDiagram
    participant U as User
    participant C as Component
    participant S as Store
    participant M as Data Models
    
    U->>C: User Action (Click/Form)
    C->>S: Dispatch Action
    S->>M: Update State
    M->>S: Return New State
    S->>C: Notify Subscribers
    C->>U: Re-render UI
```

## 🗂️ Component Architecture

```mermaid
graph TD
    App[App.tsx]
    
    subgraph "Layout Components"
        Navbar[Navbar.tsx]
        Footer[Footer.tsx]
    end
    
    subgraph "Auth Components"
        SignIn[SignIn.tsx]
        SignUp[SignUp.tsx]
        Protected[ProtectedRoute.tsx]
    end
    
    subgraph "Page Components"
        Landing[LandingPage.tsx]
        
        subgraph "Client Pages"
            ClientDash[ClientDashboard.tsx]
            BookAppt[BookAppointment.tsx]
            ClientAppts[MyAppointments.tsx]
            ClientPets[MyPets.tsx]
        end
        
        subgraph "Provider Pages"
            ProviderDash[ProviderDashboard.tsx]
            ApptDetail[AppointmentDetail.tsx]
            MgmtSchedule[ManageSchedule.tsx]
        end
        
        subgraph "Admin Pages"
            AdminDash[AdminDashboard.tsx]
            CreateProv[CreateProvider.tsx]
            MgmtAppts[ManageAppointments.tsx]
            MgmtClients[ManageClients.tsx]
            MgmtPets[ManagePets.tsx]
            MgmtServices[ManageServices.tsx]
            MgmtStaff[ManageStaff.tsx]
            AdminReports[Reports.tsx]
        end
    end
    
    App --> Navbar
    App --> Footer
    App --> SignIn
    App --> SignUp
    App --> Landing
    App --> Protected
    
    Protected --> ClientDash
    Protected --> ProviderDash
    Protected --> AdminDash
    
    ClientDash --> BookAppt
    ClientDash --> ClientAppts
    ClientDash --> ClientPets
    
    ProviderDash --> ApptDetail
    ProviderDash --> MgmtSchedule
    
    AdminDash --> CreateProv
    AdminDash --> MgmtAppts
    AdminDash --> MgmtClients
    AdminDash --> MgmtPets
    AdminDash --> MgmtServices
    AdminDash --> MgmtStaff
    AdminDash --> AdminReports
```

## 🔄 State Management Architecture

```mermaid
graph TB
    subgraph "React Context"
        AppProvider[AppProvider]
        AppContext[AppContext]
        useApp[useApp Hook]
    end
    
    subgraph "State Data"
        CurrentUser[currentUser]
        Users[users]
        Pets[pets]
        Services[services]
        Vets[veterinarians]
        Appointments[appointments]
    end
    
    subgraph "State Actions"
        SignIn[signIn]
        SignUp[signUp]
        SignOut[signOut]
        AddPet[addPet]
        UpdatePet[updatePet]
        DeletePet[deletePet]
        AddAppt[addAppointment]
        UpdateAppt[updateAppointment]
        CancelAppt[cancelAppointment]
        AddUser[addUser]
        UpdateUser[updateUser]
        DeleteUser[deleteUser]
        UpdateService[updateService]
        AddService[addService]
        DeleteService[deleteService]
        AddVet[addVeterinarian]
        DeleteVet[deleteVeterinarian]
    end
    
    AppProvider --> AppContext
    AppContext --> useApp
    
    useApp --> CurrentUser
    useApp --> Users
    useApp --> Pets
    useApp --> Services
    useApp --> Vets
    useApp --> Appointments
    
    useApp --> SignIn
    useApp --> SignUp
    useApp --> SignOut
    useApp --> AddPet
    useApp --> UpdatePet
    useApp --> DeletePet
    useApp --> AddAppt
    useApp --> UpdateAppt
    useApp --> CancelAppt
    useApp --> AddUser
    useApp --> UpdateUser
    useApp --> DeleteUser
    useApp --> UpdateService
    useApp --> AddService
    useApp --> DeleteService
    useApp --> AddVet
    useApp --> DeleteVet
```

## 🎨 UI Component Hierarchy

```mermaid
graph TD
    App[App]
    
    App --> Layout[Layout Container]
    Layout --> Navbar[Navbar]
    Layout --> Main[Main Content]
    Layout --> Footer[Footer]
    
    Main --> Routes[Router Outlet]
    
    subgraph "Common UI Patterns"
        Card[Card Component]
        Form[Form Component]
        Button[Button Component]
        Modal[Modal Component]
        Table[Table Component]
    end
    
    subgraph "Business Components"
        ApptCard[Appointment Card]
        PetCard[Pet Card]
        ServiceCard[Service Card]
        UserCard[User Card]
        Calendar[Calendar View]
        TimeSlot[Time Slot Selector]
    end
    
    Card --> ApptCard
    Card --> PetCard
    Card --> ServiceCard
    Card --> UserCard
    
    Form --> TimeSlot
```

## 🔐 Security Architecture

```mermaid
graph LR
    subgraph "Authentication Flow"
        Login[Login Form]
        Validate[Validate Credentials]
        SetSession[Set Session]
        Redirect[Redirect to Dashboard]
    end
    
    subgraph "Authorization Flow"
        CheckRole[Check User Role]
        ProtectedRoute[Protected Route]
        Access[Grant Access]
        Deny[Deny Access]
    end
    
    Login --> Validate
    Validate --> SetSession
    SetSession --> Redirect
    
    CheckRole --> ProtectedRoute
    ProtectedRoute --> Access
    ProtectedRoute --> Deny
```

## 📈 Business Logic Flow

```mermaid
flowchart TD
    Start([Start])
    
    subgraph "Appointment Booking Flow"
        SelectPet[Select Pet]
        SelectService[Select Service]
        SelectDate[Select Date]
        SelectVet[Select Veterinarian]
        SelectTime[Select Time Slot]
        Confirm[Confirm Booking]
        CreateAppt[Create Appointment]
    end
    
    subgraph "Appointment Management Flow"
        CheckStatus[Check Status]
        UpdateStatus[Update Status]
        Notify[Notify Parties]
        Complete[Complete Appointment]
    end
    
    Start --> SelectPet
    SelectPet --> SelectService
    SelectService --> SelectDate
    SelectDate --> SelectVet
    SelectVet --> SelectTime
    SelectTime --> Confirm
    Confirm --> CreateAppt
    
    CreateAppt --> CheckStatus
    CheckStatus --> UpdateStatus
    UpdateStatus --> Notify
    Notify --> Complete
```

## 🚀 Deployment Architecture

```mermaid
graph TB
    subgraph "Development Environment"
        DevServer[Vite Dev Server]
        HMR[Hot Module Reload]
        DevTools[React DevTools]
    end
    
    subgraph "Build Process"
        Vite[Vite Build]
        Bundle[Bundle Optimization]
        Minify[Code Minification]
        Assets[Asset Optimization]
    end
    
    subgraph "Production Environment"
        StaticFiles[Static Files]
        CDN[CDN Distribution]
        Browser[User Browser]
    end
    
    DevServer --> Vite
    Vite --> Bundle
    Bundle --> Minify
    Minify --> Assets
    Assets --> StaticFiles
    StaticFiles --> CDN
    CDN --> Browser
    
    DevServer -.-> HMR
    DevServer -.-> DevTools
```

## 🔮 Future Architecture Enhancements

```mermaid
graph TB
    subgraph "Current Architecture"
        CurrentUI[React Frontend]
        CurrentState[Context Store]
        CurrentAuth[Local Auth]
    end
    
    subgraph "Enhanced Architecture"
        EnhancedUI[React Frontend]
        EnhancedState[Redux/Zustand]
        EnhancedAuth[JWT Auth]
        API[REST/GraphQL API]
        Database[(PostgreSQL)]
        RealTime[WebSocket]
        Mobile[React Native]
    end
    
    CurrentUI --> EnhancedUI
    CurrentState --> EnhancedState
    CurrentAuth --> EnhancedAuth
    
    EnhancedState --> API
    API --> Database
    API --> RealTime
    EnhancedUI --> Mobile
```
