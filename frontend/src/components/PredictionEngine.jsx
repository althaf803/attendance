// In frontend/src/components/PredictionEngine.jsx
const PredictionEngine = ({ prediction }) => {
    // Using dangerouslySetInnerHTML to render the bold tags from the backend message.
    // This is safe here because we control the message content.
    return (
        <div>
            <h2>Prediction</h2>
            <p dangerouslySetInnerHTML={{ __html: prediction.message }}></p>
        </div>
    );
};
export default PredictionEngine;