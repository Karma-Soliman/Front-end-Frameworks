import { useNavigate } from "react-router-dom";

function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <main className="main-container">
            <h1> 404</h1>
            <p>Page not Found</p>
            <button onClick={() => navigate("/")}> Back to Home</button>
        </main>);
}

export default NotFoundPage;