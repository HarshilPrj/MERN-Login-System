import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";

export default function Profile() {
    const [store, setStore] = useState([]);
    const [img, setImg] = useState();

    useEffect(() => {
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            },
        };
        let url = "http://localhost:5000/users";

        const fetchData = async () => {
            let data = await fetch(url, options);
            let parsdata = await data.json();
            let fileURL = parsdata.data[11].fileName;
            setStore(parsdata.data[11]);
            setImg(fileURL);
            console.log(img);
        };
        fetchData();
    },[]);

    return (
        <>
            <Grid
                container
                sx={{ height: "89vh", justifyContent: "center", alignItems: "center" }}
            >
                <Grid item xs={4}>
                    <Card sx={{ height: "60vh", width: "30vw" }}>
                        <CardContent>
                            <div id="d1">
                            <Avatar alt="Remy Sharp" src={img} sx={{height:'5rem', width:'5rem'}}/>
                                <h4><span style={{ color: "black" }}>Name : </span> Deep prajapati </h4>
                                <h4><span style={{ color: "black" }}>Email : </span> {store.user_name}</h4>
                                <h4><span style={{ color: "black" }}>Phone : </span> {store.no}</h4>
                                <h4><span style={{ color: "black" }}>Location : </span> Ahmedabad - 380001</h4>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}