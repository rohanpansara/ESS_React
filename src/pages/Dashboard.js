import React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/dashboard.css";
import Base from "../components/Base";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/auth/holiday/getAll")
      .then((response) => {
        console.log("Fetched holidays:", response.data);
        const mark = response.data.map((holiday) =>
          moment(holiday.from).format("YYYY-MM-DD")
        );
        setHolidays(mark);
      })
      .catch((error) => console.error("Error fetching holidays:", error));
  }, []);

  useEffect(() => {
    const employeeName = localStorage.getItem("employeeName");
    if (!employeeName) {
      document.title = `Dashboard | ESS`;
    } else {
      document.title = `Dashboard | ${employeeName}`;
    }
  }, [employeeData]);

  useEffect(() => {
    const authenticate = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login first");
          navigate("/login", { state: { fromLogout: true } });
        } else {
          await empDetails();
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while authenticating");
      }
      finally{
        setLoading(false)
      }
    };
    authenticate();
  }, []);

  const empDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/auth/user/currentEmployee",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            id: localStorage.getItem("employeeId"),
          },
        }
      );

      const { success, data, message } = response.data;

      if (success) {
        setEmployeeData(data);
        console.log(data);
        localStorage.setItem("employeeName", data.firstname);
      } else {
        toast.error(message || "Couldn't load your data");
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      toast.error("Error fetching employee data. Please try again later.");
    }
  };

  // useEffect(() => {
  //   const currentDate = new Date().toISOString().split('T')[0];
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8080/auth/user/attendance",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //           params: {
  //             employeeId: localStorage.getItem("employeeId"),
  //             date: currentDate
  //           },
  //         }
  //       );
  
  //       console.log(response.data);
  //       const { success, data, message } = response.data;

  //       if (success) {
  //         setAttendanceRecord(data);
  //         toast.success(message);
  //       } else {
  //         toast.error(message || "Couldn't load your attendance");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching attendace data:", error);
  //       toast.error("Error fetching attendance data. Please try again later.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const handleLeave = async () => {
  //   try {
  //     const employeeId = localStorage.getItem('employeeId');
  //     const response = await toast.promise(
  //       () => axios.post('http://localhost:8080/auth/user/applyLeave', { employeeId , leaveReason, leaveFrom, leaveTo, leaveAppliedOn, leaveStatus, leaveType }),
  //       {
  //         loading: 'Applying For Leave...',
  //         success: (responseData) => {
  //           return `Leave Applied Successfully`;
  //         },
  //         error: 'Leave Application Failed!',
  //       }
  //     );
  //   } catch (error) {
  //     console.error('Error:', error);
  //     toast.error("Leave Request Failed!");
  //   }
  // };

  // if(loading){
  //   toast.loading("Please wait your data is loading");
  // }

  return (
    <>
      <Base page="dashboard" />
      <div id="content">
        <main>
          {/* <div>
            {showDiv && <div>You will be logged out any</div>}
          </div> */}
          <ul class="box-info">
            <li className="calendars">
              <Calendar selectRange={true}
                showFixedNumberOfWeeks={true}
                tileClassName={({ date }) => {
                  if (date.getDay() === 0 || date.getDay() === 6) {
                    return "weekend";
                  } else {
                    return "normal";
                  }
                }} />
            </li>
            <li className="calendars">
              <Calendar
                tileClassName={({ date }) => {
                  const formattedDate = moment(date).format("YYYY-MM-DD");
                  if (holidays.includes(formattedDate)) {
                    return "holiday";
                  } else if (date.getDay() === 0 || date.getDay() === 6) {
                    return "weekend";
                  } else {
                    return "normal";
                  }
                }}
                showFixedNumberOfWeeks={true}
              />
              <span>Your Holidays</span>
            </li>
            <li className="calendars">
              <Calendar selectRange={true}
                showFixedNumberOfWeeks={true}
                tileClassName={({ date }) => {
                  if (date.getDay() === 0 || date.getDay() === 6) {
                    return "weekend";
                  } else {
                    return "normal";
                  }
                }} />
            </li>
          </ul>
          <Toaster richColors />
        </main>
      </div>
    </>
  );
};

export default Dashboard;