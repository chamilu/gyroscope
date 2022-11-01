import "./App.css";

import React, { useEffect, useState } from "react";

function App() {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {}, []);

    return (
        <div className="App">
            <div className="success">Chamil</div>
            {hasError && <div className="error">{hasError}</div>}
        </div>
    );
}

export default App;
