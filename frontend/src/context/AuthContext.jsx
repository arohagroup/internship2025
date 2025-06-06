// import { createContext, useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { isTokenExpired } from "./auth";

// export const AuthContext = createContext();

// const publicRoutes = ["/login", "/signup", "/admin/login", "/", "/joblist"]; // Added home route '/'

// export const AuthProvider = ({ children }) => {
//   const [industry, setIndustry] = useState([]);
//   const [isTitleEmpty, setIsTitleEmpty] = useState(false);
//   const storedUserType = localStorage.getItem("userType");
//   const [isAdmin, setIsAdmin] = useState(
//     localStorage.getItem("adminToken") !== null
//   );

//   const navigate = useNavigate();
//   const location = useLocation();

//   const [currentJobRole, setCurrentJobRole] = useState({
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

//   const [jobsInfo, setJobsInfo] = useState([]);

//   useEffect(() => {
//     const currentPath = location.pathname;
//     const adminToken = localStorage.getItem("adminToken");

//     if (
//       !publicRoutes.includes(currentPath) &&
//       !adminToken &&
//       isTokenExpired()
//     ) {
//       console.log("Token Expired, Logging out");
//       logout();
//     } else {
//       console.log("Token is valid or on a public route");
//     }

//     // Fetch jobs info
//     const fetchJobsInfo = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_BASE_URL}/api/v1/jobs/getAll`
//         );
//         const data = await response.json();
//         setJobsInfo(data);
//       } catch (error) {
//         console.error("Error fetching jobsinfo:", error);
//       }
//     };

//     fetchJobsInfo();
//   }, [navigate, location]);

//   const [userType, setUserType] = useState(
//     storedUserType ? storedUserType : null
//   );

//   const login = (type, isAdminLogin = false) => {
//     setUserType(type);
//     localStorage.setItem("userType", type);
//     if (isAdminLogin) {
//       setIsAdmin(true);
//     }
//   };

//   const logout = () => {
//     navigate("/");
//     localStorage.clear();
//     setIsAdmin(false);
//     setUserType(null);
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
//     setCurrentJobRole((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox" 
//           ? checked
//             ? [...(prev[name] || []), value]
//             : (prev[name] || []).filter((v) => v !== value)
//           : [value],
//     }));
//   };
//   useEffect(() => {
//     const industryCountMap = new Map();
//     console.log(jobsInfo);

//     jobsInfo.forEach((jobData) => {
//       const industry = jobData.job.industry; // Now using jobData.job.industry, which is a string

//       if (industry) {
//         industryCountMap.set(
//           industry, // Using industry name directly
//           (industryCountMap.get(industry) || 0) + 1
//         );
//       }
//     });

//     // Convert the Map to an array to set it in state
//     const industryArray = Array.from(industryCountMap, ([industry, count]) => ({
//       industry,
//       count,
//     }));

//     setIndustry(industryArray);
//   }, [jobsInfo]);

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
// const [experienceRole,setExperienceRole]=useState([]);
//   useEffect(() => {
//     const jobRoles = jobsInfo.map((jobData) => jobData.job.title);
//     const companies = jobsInfo.map((jobData) => jobData.job.company);
//     const experience = jobsInfo.map((jobData) => jobData.job.experienceLevel);

//     const uniqueJobRolesSet = new Set(jobRoles);
//     const uniqueCompanySet = new Set(companies);
//     const uniqueExperienceSet = new Set(experience);

//     setJobRole(Array.from(uniqueJobRolesSet));
//     setCompanyRole(Array.from(uniqueCompanySet));
//     setExperienceRole(Array.from(uniqueExperienceSet));
//   }, [jobsInfo]);

//   return (
//     <AuthContext.Provider
//       value={{
//         userType,
//         login,
//         logout,
//         handleJobRoleChange,
//         jobsInfo,
//         currentJobRole,
//         industry,
//         showScroll,
//         jobRole,
//         companyRole,
//         experienceRole,
//         isAdmin,
//         checkedOptions,
//         setCheckedOptions,
//         selectedRadio,
//         setSelectedRadio,
//         setIsTitleEmpty,
//         isTitleEmpty,
//         setCurrentJobRole,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// import { createContext, useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { isTokenExpired } from "./auth";

// export const AuthContext = createContext();

// const publicRoutes = ["/login", "/signup", "/admin/login", "/", "/joblist"]; // Added home route '/'

// export const AuthProvider = ({ children }) => {
//   const [industry, setIndustry] = useState([]);
//   const [isTitleEmpty, setIsTitleEmpty] = useState(false);
//   const storedUserType = localStorage.getItem("userType");
//   const [isAdmin, setIsAdmin] = useState(
//     localStorage.getItem("adminToken") !== null
//   );

//   const navigate = useNavigate();
//   const location = useLocation();

//   const [currentJobRole, setCurrentJobRole] = useState({
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

//   const [jobsInfo, setJobsInfo] = useState([]);

  
//   useEffect(() => {
//     const currentPath = location.pathname;
//     const adminToken = localStorage.getItem("adminToken");

//     if (
//       !publicRoutes.includes(currentPath) &&
//       !adminToken &&
//       isTokenExpired()
//     ) {
//       console.log("Token Expired, Logging out");
//       logout();
//     } else {
//       console.log("Token is valid or on a public route");
//     }

//     // Fetch jobs info
//     const fetchJobsInfo = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_BASE_URL}/api/v1/jobs/getAll`
//         );
//         const data = await response.json();
//         setJobsInfo(data);
//       } catch (error) {
//         console.error("Error fetching jobsinfo:", error);
//       }
//     };

//     fetchJobsInfo();
//   }, [navigate, location]);

//   const [userType, setUserType] = useState(
//     storedUserType ? storedUserType : null
//   );

//   const login = (type, isAdminLogin = false) => {
//     setUserType(type);
//     localStorage.setItem("userType", type);
//     if (isAdminLogin) {
//       setIsAdmin(true);
//     }
//   };

//   const logout = () => {
//     navigate("/");
//     localStorage.clear();
//     setIsAdmin(false);
//     setUserType(null);
//     window.location.reload();
//   };

//   useEffect(() => {
//     if (storedUserType) {
//       setUserType(storedUserType);
//     }
//   }, [storedUserType]);

//   const [selectedRadio, setSelectedRadio] = useState({});
//   const [checkedOptions, setCheckedOptions] = useState({});

//   useEffect(() => {
//     console.log("selectedRadio in AuthProvider:", selectedRadio);
//   }, [selectedRadio]);
  
//   const handleJobRoleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     console.log("Input values ",e.target)
    
//     if (type === "radio") {
//       setSelectedRadio((prev) => ({
//         ...prev,
//         [name]: value,
//       }));

//       setCurrentJobRole((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//       console.log("current job : ", value);
//     } else if (type === "checkbox") {
//       setCheckedOptions((prev) => ({
//         ...prev,
//         [value]: checked,
//       }));

//       console.log("checked options-auth : ", value);

//       setCurrentJobRole((prev) => ({
//         ...prev,
//         [name]: checked
//           ? [...(prev[name] || []), value]
//           : (prev[name] || []).filter((v) => v !== value),
//       }));
//     } else {
//       setCurrentJobRole((prev) => ({
//         ...prev,
//         [name]: [value],
//       }));
//     }
//   };
  
//   useEffect(() => {
//     const industryCountMap = new Map();
//     console.log(jobsInfo);

//     jobsInfo.forEach((jobData) => {
//       const industry = jobData.job.industry; // Now using jobData.job.industry, which is a string

//       if (industry) {
//         industryCountMap.set(
//           industry, // Using industry name directly
//           (industryCountMap.get(industry) || 0) + 1
//         );
//       }
//     });

//     // Convert the Map to an array to set it in state
//     const industryArray = Array.from(industryCountMap, ([industry, count]) => ({
//       industry,
//       count,
//     }));

//     setIndustry(industryArray);
//   }, [jobsInfo]);

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
// const [experienceRole,setExperienceRole]=useState([]);
//   useEffect(() => {
//     const jobRoles = jobsInfo.map((jobData) => jobData.job.title);
//     const companies = jobsInfo.map((jobData) => jobData.job.company);
//     const experience = jobsInfo.map((jobData) => jobData.job.experienceLevel);

//     const uniqueJobRolesSet = new Set(jobRoles);
//     const uniqueCompanySet = new Set(companies);
//     const uniqueExperienceSet = new Set(experience);

//     setJobRole(Array.from(uniqueJobRolesSet));
//     setCompanyRole(Array.from(uniqueCompanySet));
//     setExperienceRole(Array.from(uniqueExperienceSet));
//   }, [jobsInfo]);

//   return (
//     <AuthContext.Provider
//       value={{
//         userType,
//         login,
//         logout,
//         handleJobRoleChange,
//         jobsInfo,
//         currentJobRole,
//         industry,
//         showScroll,
//         jobRole,
//         companyRole,
//         experienceRole,
//         isAdmin,
//         checkedOptions,
//         setCheckedOptions,
//         selectedRadio,
//         setSelectedRadio,
//         setIsTitleEmpty,
//         isTitleEmpty,
//         setCurrentJobRole,
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

const publicRoutes = ["/login", "/signup", "/admin/login", "/", "/joblist"]; // Added home route '/'

export const AuthProvider = ({ children }) => {
  const [industry, setIndustry] = useState([]);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const storedUserType = localStorage.getItem("userType");
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem("adminToken") !== null
  );

  const navigate = useNavigate();
  const location = useLocation();

  const [currentJobRole, setCurrentJobRole] = useState({
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

  const [jobsInfo, setJobsInfo] = useState([]);

  
  useEffect(() => {
    const currentPath = location.pathname;
    const adminToken = localStorage.getItem("adminToken");

    if (
      !publicRoutes.includes(currentPath) &&
      !adminToken &&
      isTokenExpired()
    ) {
      console.log("Token Expired, Logging out");
      logout();
    } else {
      console.log("Token is valid or on a public route");
    }

    // Fetch jobs info
    const fetchJobsInfo = async () => {
      try {   
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/api/v1/jobs/getAll`
        );
        const data = await response.json();
        setJobsInfo(data);
      } catch (error) {
        console.error("Error fetching jobsinfo:", error);
      }
    };

    fetchJobsInfo();
  }, [navigate, location]);

  const [userType, setUserType] = useState(
    storedUserType ? storedUserType : null
  );

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

  useEffect(() => {
    console.log("selectedRadio in AuthProvider:", selectedRadio);
  }, [selectedRadio]);
  
  const handleJobRoleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log("Input values ",e.target)
    
    if (type === "radio") {
      setSelectedRadio((prev) => ({
        ...prev,
        [name]: value,
      }));

      setCurrentJobRole((prev) => ({
        ...prev,
        [name]: value,
      }));
      console.log("current job : ", value);
    } else if (type === "checkbox") {
      setCheckedOptions((prev) => ({
        ...prev,
        [value]: checked,
      }));

      console.log("checked options-auth : ", value);

      setCurrentJobRole((prev) => ({
        ...prev,
        [name]: checked
          ? [...(prev[name] || []), value]
          : (prev[name] || []).filter((v) => v !== value),
      }));
    } else {
      setCurrentJobRole((prev) => ({
        ...prev,
        [name]: [value],
      }));
    }
  };
  
  useEffect(() => {
    const industryCountMap = new Map();
    console.log(jobsInfo);

    jobsInfo.forEach((jobData) => {
      const industry = jobData.job.industry; // Now using jobData.job.industry, which is a string

      if (industry) {
        industryCountMap.set(
          industry, // Using industry name directly
          (industryCountMap.get(industry) || 0) + 1
        );
      }
    });

    // Convert the Map to an array to set it in state
    const industryArray = Array.from(industryCountMap, ([industry, count]) => ({
      industry,
      count,
    }));

    setIndustry(industryArray);
  }, [jobsInfo]);

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
const [experienceRole,setExperienceRole]=useState([]);
  useEffect(() => {
    const jobRoles = jobsInfo.map((jobData) => jobData.job.title);
    const companies = jobsInfo.map((jobData) => jobData.job.company);
    const experience = jobsInfo.map((jobData) => jobData.job.experienceLevel);

    const uniqueJobRolesSet = new Set(jobRoles);
    const uniqueCompanySet = new Set(companies);
    const uniqueExperienceSet = new Set(experience);

    setJobRole(Array.from(uniqueJobRolesSet));
    setCompanyRole(Array.from(uniqueCompanySet));
    setExperienceRole(Array.from(uniqueExperienceSet));
  }, [jobsInfo]);

  return (
    <AuthContext.Provider
      value={{
        userType,
        login,
        logout,
        handleJobRoleChange,
        jobsInfo,
        currentJobRole,
        industry,
        showScroll,
        jobRole,
        companyRole,
        experienceRole,
        isAdmin,
        checkedOptions,
        setCheckedOptions,
        selectedRadio,
        setSelectedRadio,
        setIsTitleEmpty,
        isTitleEmpty,
        setCurrentJobRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};