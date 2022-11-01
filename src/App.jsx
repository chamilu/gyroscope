import "milligram/dist/milligram.css";
import "./App.css";

import React, { useEffect, useState } from "react";

function App() {
    const [hasError, setHasError] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [z, setZ] = useState(0);
    const [rotation, setRotation] = useState(0);

    const [alpha, setAlpha] = useState(0);
    const [beta, setBeta] = useState(0);
    const [gamma, setGamma] = useState(0);
    // const [props, setProps] = useState({
    //     landscape: 0,
    //     rotation: 0,
    //     x: 0,
    //     y: 0,
    //     z: 0,
    // });

    useEffect(() => {}, []);

    const askPermission = () => {
        // feature detect
        if (typeof DeviceOrientationEvent.requestPermission === "function") {
            DeviceOrientationEvent.requestPermission()
                .then((permissionState) => {
                    if (permissionState === "granted") {
                        // window.addEventListener("deviceorientation", () => {
                        //     alert("granted");
                        // });
                        window.addEventListener(
                            "devicemotion",
                            handleAcceleration
                        );
                        window.addEventListener(
                            "deviceorientation",
                            handleOrientation
                        );
                    }
                })
                .catch((e) => {
                    alert("error");
                });
        } else {
            // handle regular non iOS 13+ devices
        }
    };

    const handleOrientation = (event) => {
        var orientation = window.orientation;
        const a = event.alpha;
        const b = event.beta;
        const g = event.gamma;

        setAlpha(a);
        setBeta(b);
        setGamma(g);
    };

    const handleAcceleration = (event) => {
        var acceleration = event.accelerationIncludingGravity;
        var x = acceleration.x;
        var y = acceleration.y;
        var z = acceleration.z;
        setX(x);
        setY(y);
        setZ(z);
    };

    return (
        <div className="App">
            <div style={{ textAlign: "center" }}>
                <button onClick={() => askPermission()}>
                    Request Permission
                </button>
            </div>

            <br />
            <div className="success">
                <div>
                    <h6>
                        <strong>Device Motion - raw</strong>
                    </h6>
                </div>
                <div>x: {x}</div>
                <div>y: {y}</div>
                <div>z: {z}</div>

                <br />
                <div>
                    <h6>
                        <strong>Device Motion - rounded</strong>
                    </h6>
                </div>
                <div>x: {Math.round(x)}</div>
                <div>y: {Math.round(y)}</div>
                <div>z: {Math.round(z)}</div>

                <br />
                <div>
                    <h6>
                        <strong>Device Orientation - raw</strong>
                    </h6>
                </div>
                <div>alpha: {alpha}</div>
                <div>beta: {beta}</div>
                <div>gamma: {gamma}</div>

                <br />
                <div>
                    <h6>
                        <strong>Device Orientation - rounded</strong>
                    </h6>
                </div>
                <div>alpha: {Math.round(alpha)}</div>
                <div>beta: {Math.round(beta)}</div>
                <div>gamma: {Math.round(gamma)}</div>
            </div>
            {hasError && <div className="error">{hasError}</div>}
        </div>
    );
}

export default App;
