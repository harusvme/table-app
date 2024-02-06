import { Link } from "react-router-dom";

const WelcomePage: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the App</h1>
            <p>
                Click <Link to="/table">here</Link> to view the table.
            </p>
        </div>
    );
};

export default WelcomePage;
