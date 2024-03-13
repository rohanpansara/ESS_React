import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'
import Base from '../components/Base'
import '../styles/dashboard.css'


const Holidays = () => {

    const [allHolidays, setAllHolidays] = useState([])

    useEffect(() => {
        if (localStorage.getItem("employeeName") === null || localStorage.getItem("employeeName") === undefined) {
            document.title = `Holiday | ESS`;
        } else {
            document.title = `Holiday | ${localStorage.getItem("employeeName")}`;
        }
        axios
            .get("http://localhost:8080/auth/user/holiday/getAll", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
            .then((response) => {
                setAllHolidays(response.data);
            })
            .catch((error) => {
                toast.error("Couldn't load the holiday list");
                console.log(error);
            });
    }, []);

    return (
        <>
            <Base page="holidays" />
            <div id="content">
                <main>
                    <div class="table-data">
                        <div class="order">
                            <div class="head">
                                <h3>Holidays</h3>
                                <i class="bx bx-search"></i>
                                <i class="bx bx-filter"></i>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Name</th>
                                        <th>From</th>
                                        <th>To</th>
                                        <th>Day/s</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allHolidays.length > 0 ? (
                                        allHolidays.map((holiday) => (
                                            <tr key={holiday.id}>
                                                <td>{holiday.id}</td>
                                                <td>{holiday.name}</td>
                                                <td>{new Date(holiday.from).toLocaleDateString("en-GB")}</td>
                                                <td>{holiday.to ? new Date(holiday.to).toLocaleDateString("en-GB") : "-"}</td>
                                                <td>{holiday.days}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" style={{ fontStyle: 'italic' }}>No holidays found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
            <Toaster richColors />
        </>
    )
}

export default Holidays