import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import footprints from './footprints.png';
import "./Dashboard.css";

const Dashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { totalEmissions } = location.state || {};
    const averageUSEmissions = 16;
    const averageGlobalEmissions = 4;

    const userEmissionsArray = totalEmissions ? Array(Math.round(totalEmissions)).fill(null) : [];
    const averageUSEmissionsArray = Array(averageUSEmissions).fill(null);
    const averageGlobalEmissionsArray = Array(averageGlobalEmissions).fill(null);

    return (
        <div className="centered-container">
            <h1>Your Carbon Footprint Score</h1>
            {totalEmissions !== undefined ? (
                <div className="results-container">
                    <p>The following carbon footprint score has been calculated based on your quiz answers. The American and Global averages can be used to see how your score compares to individuals around the world.</p>
                    
                    {/* One footprint = one ton CO2 */}
                    <div className="footprint-equivalent">
                        <p>
                            One 
                            <img 
                                src={footprints} 
                                alt="Green Footprint" 
                                className="inline-footprint-image" 
                            /> 
                            = One Ton CO₂
                        </p>
                    </div>


                    <div className="image-row">
                        <h3>Your Footprint:</h3>
                        <p>Your total carbon footprint is <strong>{totalEmissions.toFixed(2)}</strong> tons CO₂/year.</p>
                        <div className="image-container">
                            {userEmissionsArray.map((_, index) => (
                                <img
                                    key={`user-footprint-${index}`}
                                    src={footprints}
                                    alt="Green Footprint"
                                    className="footprint-image"
                                />
                            ))}
                        </div>
                        
                        <h3>Average American's Footprint:</h3>
                        <p>The average American's carbon footprint is <strong>16</strong> tons CO₂/year.</p>
                        <div className="image-container">
                            {averageUSEmissionsArray.map((_, index) => (
                                <img
                                    key={`average-footprint-${index}`}
                                    src={footprints}
                                    alt="Green Footprint"
                                    className="footprint-image"
                                />
                            ))}
                        </div>

                        <h3>Average Global Footprint:</h3>
                        <p>The average global carbon footprint is <strong>4</strong> tons CO₂/year.</p>
                        <div className="image-container">
                            {averageGlobalEmissionsArray.map((_, index) => (
                                <img
                                    key={`average-footprint-${index}`}
                                    src={footprints}
                                    alt="Green Footprint"
                                    className="footprint-image"
                                />
                            ))}
                        </div>
                    </div>

                    <h1>Sustainability Recommendations</h1>
                    <p>Here are some recommendations to offset your carbon footprint based on your results.</p>
                </div>
            ) : (
                <div>
                    <p>Please complete the calculator quiz in order to understand your carbon footprint!</p>
                    
                    <Button
                        label="Take Carbon Footprint Calculator Quiz"
                        onClick={() => navigate('/calculator')}
                        variant="accent"
                        style={{ fontSize: '24px', width: '600px', fontWeight: '200' }}
                    />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
