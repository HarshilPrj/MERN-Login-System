import React, { useEffect, useState } from "react";
import Axios from "axios";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";

export default function Profile() {
    const [store, setStore] = useState([]);
    const [img, setImg] = useState();

    useEffect(() => {
        Axios.get("http://localhost:5000/users")
            .then((res) => {
                let photo = res.data.data[10].fileName;
                let file = photo.slice(7);
                setStore(res.data.data[10]);
                setImg(file);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [img]);

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
                                {/* <img src={img}></img> */}
                                <Avatar
                                    alt="Remy Sharp"
                                    src={img}
                                    sx={{ height: "12vh", width: "7vw" }}
                                />
                                <h4>
                                    <span style={{ color: "black" }}>Name : </span> Deep prajapati
                                </h4>
                                <h4>
                                    <span style={{ color: "black" }}>Email : </span>
                                    {store.user_name}
                                </h4>
                                <h4>
                                    <span style={{ color: "black" }}>Phone : </span> {store.no}
                                </h4>
                                <h4>
                                    <span style={{ color: "black" }}>Location : </span> Ahmedabad
                                    - 380001
                                </h4>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}
