
// import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { isTokenExpired } from "./auth";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [industry, setIndustry] = useState([]);
//   const [isTitleEmpty, setIsTitleEmpty] = useState(false);
//   const storedUserType = localStorage.getItem("userType");

//   const navigate = useNavigate();
//   const [currentJobRole, setcurrentJobRole] = useState({
//     DatePosted: [],
//     Industry: [],
//     JobRoles: [],
//     Salary: [],
//     Experience: [],
//     Title: [],
//     Location: [],
//     JobType: [],
//     TitleAndCompany: [],
//   });

//   const [jobs, setJobs] = useState([]);
//   useEffect(() => {
//     if (isTokenExpired()) {
//       console.log("Token Expired, Logging out");
//       localStorage.clear();
//       navigate("/");
//     } else {
//       console.log("Token is valid");
//     }

//     fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/jobs/getAll`)
//       .then((response) => response.json())
//       .then((data) => setJobs(data))
//       .catch((error) => console.error("Error fetching jobs:", error));
//   }, []);

//   const [userType, setUserType] = useState(
//     storedUserType ? storedUserType : null
//   );

//   const login = (type) => {
//     setUserType(type);
//     localStorage.setItem("userType", type); // Store userType in localStorage
//     console.log(type);
//   };

//   const logout = () => {
//     navigate("/");
//     // setUserData(null);
//     localStorage.clear();
//     window.location.reload();
//   };

//   useEffect(() => {
//     if (storedUserType) {
//       setUserType(storedUserType);
//     }
//   }, [storedUserType]);

//   const [selectedRadio, setSelectedRadio] = useState({});
//   const [checkedOptions, setCheckedOptions] = useState({});




//   const handleJobRoleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (type === "radio") {
//       setSelectedRadio((prev) => ({
//         ...prev,
//         [name]: value, // Store selected value per category
//       }));

//       setcurrentJobRole((prev) => ({
//         ...prev,
//         [name]: [value], // Ensure only one value for radio button categories
//       }));
//     } else if (type === "checkbox") {
//       setCheckedOptions((prev) => ({
//         ...prev,
//         [value]: checked,
//       }));
//       console.log("checked options-auth : ", value);

//       setcurrentJobRole((prev) => ({
//         ...prev,
//         [name]: checked
//           ? [...(prev[name] || []), value]
//           : (prev[name] || []).filter((v) => v !== value),
//       }));
//     } else {
//       setcurrentJobRole((prev) => ({
//         ...prev,
//         [name]: [value],
//       }));
//     }
//   };
//   useEffect(() => {
//     const industryCountMap = new Map();
//     jobs.forEach((job) => {
//       industryCountMap.set(
//         job.industry,
//         (industryCountMap.get(job.industry) || 0) + 1
//       );
//     });
//     const industryArray = Array.from(industryCountMap, ([industry, count]) => ({
//       industry,
//       count,
//     }));
//     setIndustry(industryArray);
//   }, [jobs]);

//   const [showScroll, setShowScroll] = useState(false);
//   useEffect(() => {
//     const handleScroll = () => {
//       setShowScroll(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);
//   const [jobRole, setJobRole] = useState([]);

//   const [companyRole, setCompanyRole] = useState([]);
//   useEffect(() => {
//     const jobRoles = jobs.map((job) => job.title);
//     const companies = jobs.map((job) => job.company);
//     const uniqueJobRolesSet = new Set(jobRoles);
//     const uniqueCompanySet = new Set(companies);

//     setJobRole(Array.from(uniqueJobRolesSet));
//     setCompanyRole(Array.from(uniqueCompanySet));
//   }, [jobs]);
//   return (
//     <AuthContext.Provider
//       value={{
//         userType,
//         login,
//         logout,
//         handleJobRoleChange,
//         setcurrentJobRole,
//         jobs,
//         currentJobRole,
//         industry,
//         showScroll,
//         jobRole,
//         companyRole,
//         checkedOptions,
//         setCheckedOptions,
//         selectedRadio,
//         setSelectedRadio,
//         setIsTitleEmpty,
//         isTitleEmpty
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };


import { createContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isTokenExpired } from "./auth";

export const AuthContext = createContext();

const publicRoutes = ['/login', '/signup', '/admin/login', '/']; // Added home route '/'

export const AuthProvider = ({ children }) => {
  const [industry, setIndustry] = useState([]);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const storedUserType = localStorage.getItem("userType");
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('adminToken') !== null);

  const navigate = useNavigate();
  const location = useLocation();

  const [currentJobRole, setcurrentJobRole] = useState({
    DatePosted: [],
    Industry: [],
    JobRoles: [],
    Salary: [],
    Experience: [],
    Title: [],
    Location: [],
    JobType: [],
    TitleAndCompany: [],
  });

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const currentPath = location.pathname;
    const adminToken = localStorage.getItem('adminToken');
    
    if (!publicRoutes.includes(currentPath) && !adminToken && isTokenExpired()) {
      console.log("Token Expired, Logging out");
      logout();
    } else {
      console.log("Token is valid or on a public route");
    }

    fetch(`${import.meta.env.VITE_BASE_URL}/api/v1/jobs/getAll`)
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, [navigate, location]);

  const [userType, setUserType] = useState(storedUserType ? storedUserType : null);

  const login = (type, isAdminLogin = false) => {
    setUserType(type);
    localStorage.setItem("userType", type);
    if (isAdminLogin) {
      setIsAdmin(true);
    }
  };

  const logout = () => {
    navigate("/");
    localStorage.clear();
    setIsAdmin(false);
    setUserType(null);
    window.location.reload();
  };

  useEffect(() => {
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, [storedUserType]);

  const [selectedRadio, setSelectedRadio] = useState({});
  const [checkedOptions, setCheckedOptions] = useState({});




  const handleJobRoleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "radio") {
      setSelectedRadio((prev) => ({
        ...prev,
        [name]: value, // Store selected value per category
      }));

      setcurrentJobRole((prev) => ({
        ...prev,
        [name]: [value], // Ensure only one value for radio button categories
      }));
    } else if (type === "checkbox") {
      setCheckedOptions((prev) => ({
        ...prev,
        [value]: checked,
      }));
      console.log("checked options-auth : ", value);

      setcurrentJobRole((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter((v) => v !== value),
      }));
    } else {
      setcurrentJobRole((prev) => ({
        ...prev,
        [name]: [value],
      }));
    }
  };
  useEffect(() => {
    const industryCountMap = new Map();
    jobs.forEach((job) => {
      industryCountMap.set(
        job.industry,
        (industryCountMap.get(job.industry) || 0) + 1
      );
    });
    const industryArray = Array.from(industryCountMap, ([industry, count]) => ({
      industry,
      count,
    }));
    setIndustry(industryArray);
  }, [jobs]);

  const [showScroll, setShowScroll] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [jobRole, setJobRole] = useState([]);
  const [companyRole, setCompanyRole] = useState([]);
  
  useEffect(() => {
    const jobRoles = jobs.map((job) => job.title);
    const companies = jobs.map((job) => job.company);
    const uniqueJobRolesSet = new Set(jobRoles);
    const uniqueCompanySet = new Set(companies);

    setJobRole(Array.from(uniqueJobRolesSet));
    setCompanyRole(Array.from(uniqueCompanySet));
  }, [jobs]);

  return (
    <AuthContext.Provider
      value={{
        userType,
        login,
        logout,
        handleJobRoleChange,
        setcurrentJobRole,
        jobs,
        currentJobRole,
        industry,
        showScroll,
        jobRole,
        companyRole,
        isAdmin,
        checkedOptions,
        setCheckedOptions,
        selectedRadio,
        setSelectedRadio,
        setIsTitleEmpty,
        isTitleEmpty
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};