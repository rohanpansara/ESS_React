import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster, toast } from "sonner";
import "../styles/dashboard.css";
import "boxicons";
import Base from "../components/Base";
import axios from "axios";
import AddUser from "./AddUser";

const Dashboard = () => {
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        console.log(data)
        localStorage.setItem("employeeName", data.firstname);
      } else {
        toast.error(message || "Couldn't load your data");
      }
    } catch (error) {
      console.error("Error fetching employee data:", error);
      toast.error("Error fetching employee data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <>
      <Base page="dashboard" />
      <div id="content">
        <main>
          <div class="head-title">
            <div class="left">
              {employeeData ? (
                <h1>
                  Hello, <span>{localStorage.getItem("employeeName")}!</span>
                </h1>
              ) : (
                <h1 style={{ fontStyle: "italic", color: "gray" }}>
                  Loading...
                </h1>
              )}
            </div>
          </div>

          <ul class="box-info">
            <li>
            <svg className="bx" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M0-240v-63q0-43 44-70t116-27q13 0 25 .5t23 2.5q-14 21-21 44t-7 48v65H0Zm240 0v-65q0-32 17.5-58.5T307-410q32-20 76.5-30t96.5-10q53 0 97.5 10t76.5 30q32 20 49 46.5t17 58.5v65H240Zm540 0v-65q0-26-6.5-49T754-397q11-2 22.5-2.5t23.5-.5q72 0 116 26.5t44 70.5v63H780Zm-455-80h311q-10-20-55.5-35T480-370q-55 0-100.5 15T325-320ZM160-440q-33 0-56.5-23.5T80-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T160-440Zm640 0q-33 0-56.5-23.5T720-520q0-34 23.5-57t56.5-23q34 0 57 23t23 57q0 33-23 56.5T800-440Zm-320-40q-50 0-85-35t-35-85q0-51 35-85.5t85-34.5q51 0 85.5 34.5T600-600q0 50-34.5 85T480-480Zm0-80q17 0 28.5-11.5T520-600q0-17-11.5-28.5T480-640q-17 0-28.5 11.5T440-600q0 17 11.5 28.5T480-560Zm1 240Zm-1-280Z"/></svg>
              <span class="text">
                <h3>
                  <span class="first">77</span>
                </h3>
                <p>Total Employees</p>
              </span>
            </li>
            <li>
            <svg className="bx" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
              <span class="text">
                <h3>
                  <span class="first">77</span>
                </h3>
                <p>Total Attendance</p>
              </span>
            </li>
            <li>
            <svg className="bx" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m696-440-56-56 83-84-83-83 56-57 84 84 83-84 57 57-84 83 84 84-57 56-83-83-84 83Zm-336-40q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM40-160v-112q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v112H40Zm80-80h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0-80Zm0 400Z"/></svg>
              <span class="text">
                <h3>
                  <span class="first">77</span>
                </h3>
                <p>Leaves Taken</p>
              </span>
            </li>
          </ul>
          <div class="table-data">
            <div class="order">
              <div class="head">
                <h3>Currently Logged In Employee</h3>
                <i class="bx bx-search"></i>
                <i class="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Blood Group</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeData ? (
                    <tr>
                      <td>{employeeData.firstname+" "+employeeData.lastname}</td>
                      <td>{employeeData.email}</td>
                      <td>{employeeData.gender}</td>
                      <td>{employeeData.bloodGroup}</td>
                      <td>{employeeData.roles}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ fontStyle: "italic" }}>
                        Loading employee data...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div class="table-data">
            <div class="order">
              <div class="head">
                <h3>Currently Logged In Employee</h3>
                <i class="bx bx-search"></i>
                <i class="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>Blood Group</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {employeeData ? (
                    <tr>
                      <td>{employeeData.firstname+" "+employeeData.lastname}</td>
                      <td>{employeeData.email}</td>
                      <td>{employeeData.gender}</td>
                      <td>{employeeData.bloodGroup}</td>
                      <td>{employeeData.roles}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ fontStyle: "italic" }}>
                        Loading employee data...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* <AddUser/> */}
          <Toaster richColors />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
