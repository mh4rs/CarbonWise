import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Calculator.css";
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import TextInput from '../../components/Forms/TextInput';
import Radio from '../../components/Forms/Radio';
import Dropdown from '../../components/Forms/Dropdown';
import Checkbox from '../../components/Forms/Checkbox';
import {
    calculateHouseholdEmissions,
    calculateTransportationEmissions,
    calculateFoodAndDietEmissions,
    calculateLifestyleEmissions,
} from './Calculations';


const Calculator = () => {
    const navigate = useNavigate();
    const [answers, setAnswers] = useState({});
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [totalEmissions, setTotalEmissions] = useState(null);

    const getToken = () => localStorage.getItem('authToken');

    useEffect(() => {
        const checkQuizCompletion = async () => {
            const token = getToken();

            try {
                const response = await axios.get("http://localhost:5001/api/quiz/completed", {
                    headers: {Authorization: `Bearer ${token}`}
                });

                setQuizCompleted(response.data.completed);
            } catch (err) {
                console.error("Error checking quiz completion")
            }
        };

        checkQuizCompletion();
    }, []);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setAnswers((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        const predefinedQuestions = [
            'address1', 'address2', 'city', 'state', 'zipcode',
            'householdSize', 'electricity', 'naturalGas', 'fuelOil', 
            'Propane', 'water', 'trash', 'recycle', 'vehicles', 
            'publicTransport', 'shortFlights', 'longFlights', 
            'diet', 'groceries', 'eatOut', 'clothes', 'electronics', 
            'homeGoods', 'gym', 'carbonOffset', 'renewableEnergy'
        ];

        event.preventDefault();
        console.log(answers);

        const incompleteAnswers = predefinedQuestions.some(
            (question) => !answers[question] || answers[question] === 'Select value'
        );
    
        if (incompleteAnswers) {
            alert("Please complete all fields before submitting the form.");
            return; // Stop execution if the form is incomplete
        }

        const token = getToken();

        const household = calculateHouseholdEmissions(answers);
        const transportation = calculateTransportationEmissions(answers);
        const foodAndDiet = calculateFoodAndDietEmissions(answers);
        const lifestyle = calculateLifestyleEmissions(answers);
      
        const total = household + transportation + foodAndDiet + lifestyle
      
        // total emissions score
        setTotalEmissions(total);
      
        console.log("Total Carbon Footprint:", total);

        // pass score to dashboard page for display
        navigate('/dashboard', { state: { totalEmissions: total } });


        const responses = predefinedQuestions.map((question_id) => ({
            question_id,
            selected_option: answers[question_id] || null
        }));

        try {
            const response = await axios.post(
                "http://localhost:5001/api/quiz",
                {responses, quiz_completed: true},
                {
                    headers: {Authorization: `Bearer ${token}`}
                }
            );
            alert(response.data.message);
            setQuizCompleted(true);  
        } catch (err){
            alert("Failed to submit the quiz. Please try again.")
        }
    };

    const handleRetake = async () => {
        const token = getToken();
    
        try {
          const response = await axios.post(
            "http://localhost:5001/api/quiz/retake",
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
    
          alert(response.data.message);
          setQuizCompleted(false);
          setAnswers({});
        } catch (err) {
          console.error("Error retaking quiz:", err.response?.data || err.message);
          alert("Failed to reset the quiz. Please try again.");
        }
  
              // for calculating emissions
              const household = calculateHouseholdEmissions(answers);
              const transportation = calculateTransportationEmissions(answers);
              const foodAndDiet = calculateFoodAndDietEmissions(answers);
              const lifestyle = calculateLifestyleEmissions(answers);
      
              const total = household + transportation + foodAndDiet + lifestyle
      
              // total emissions score
              setTotalEmissions(total);
      
              console.log("Total Carbon Footprint:", total);

              // pass score to dashboard page for display
              navigate('/dashboard', { state: { totalEmissions: total } });
    };

    const sections= [
        {
            header: "General",
            questions: [
                { id: 'address1', label: 'Address Line 1', type: 'text'},
                { id: 'address2', label: 'Address Line 2', type: 'text'},
                { id: 'city', label: 'City', type: 'text' },
                { id: 'state', label: 'State', type: 'text' },
                { id: 'zipcode', label: 'Zip Code', type: 'text' },
            ],
        },
        {
            header: "Household",
            questions: [
                { id: 'householdSize', label: 'How many people live in your household?', type: 'dropdown', options: [1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'] },
                { id: 'electricity', label: 'How much electricity does your household consume per month?', type: 'dropdown', options: ['Below Average (<667 kWh)', 'Average (667 - 1,000 kWh)', 'Above Average (>1,000 kWh)'] },
                { id: 'naturalGas', label: 'How much natural gas does your household consume per month?', type: 'dropdown', options: ['Below Average (<42 Therms)', 'Average (42 - 75 Therms)', 'Above Average (>75 Therms)'] },
                { id: 'fuelOil', label: 'How much fuel oil does your household consume per month?', type: 'dropdown', options: ['Below Average (<33 Gallons)', 'Average (33 - 67 Gallons)', 'Above Average (>67 Gallons)'] },
                { id: 'Propane', label: 'How much propane does your household consume per month?', type: 'dropdown', options: ['Below Average (<25 Gallons)', 'Average (25 - 83 Gallons)', 'Above Average (>83 Gallons)'] },
                { id: 'water', label: 'How much water does your household consume monthly?', type: 'dropdown', options: ['Below Average (<8,000 Gallons)', 'Average (8.000 - 12,000 Gallons)', 'Above Average (>12,000 Gallons)'] },
                { id: 'trash', label: 'How many bags of trash does your household produce weekly?', type: 'dropdown', options: [1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'] },
                { id: 'recycle', label: 'Select any of the following items that you recycle.', type: 'checkbox', options: ['Plastic', 'Paper', 'Glass', 'Metal'] },
            ],
        },
        {
            header: "Transportation",
            questions: [
                { id: 'vehicles', label: 'How many vehicles are in your house?', type: 'dropdown', options: [1, 2, 3, 4, '5+'] },
                { id: 'publicTransport', label: 'How often do you use public transport?', type: 'dropdown', options: ['Daily', 'Weekly', 'Rarely', 'Never'] },
                { id: 'travelDistance', label: 'How far do you travel via public transportation weekly?', type: 'dropdown', options: ['Below Average (<20 Miles)', 'Average (20 - 60 Miles)', 'Above Average (<60 Miles)'] },
                { id: 'shortFlights', label: 'How many short flights (less than 3 hours) do you take annually?', type: 'dropdown', options: ['Below Average (0-2 Short Flights)', 'Average (3-6 Short Flights)', 'Above Average (7+ Short Flights)'] },
                { id: 'longFlights', label: 'How many long flights (more than 3 hours) do you take annually?', type: 'dropdown', options: ['Below Average (0-1 Long Flights)', 'Average (2-4 Long Flights)', 'Above Average (5+ Short Flights)'] },
            ],
        },
        {
            header: "Food and Diet",
            questions: [
                { id: 'diet', label: 'What is your primary diet?' , type: 'dropdown', options: ['Vegan', 'Vegetarian', 'Pescatarian', 'Omnivore', 'High Meat']},
                { id: 'groceries', label: 'Select the location where you buy your groceries.', type: 'checkbox', options: ['Retail Stores', 'Supermarkets', 'Local Farmers Markets', 'Organic Stores', 'Convenience Stores', 'Warehouse Clubs'] },
                { id: 'eatOut', label: 'How many times do you eat out per week?', type: 'dropdown', options: ['Below Average (0-1 Meals)', 'Average (2-4 Meals)', 'Above Average (5+ Meals)'] },
            ],
        },
        {
            header: "Lifestyle",
            questions: [
                { id: 'clothes', label: 'How often do you purchase new clothes?', type: 'dropdown', options: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly', 'Rarely', 'Never'] },
                { id: 'electronics', label: 'How often do you purchase new electronics?', type:'dropdown', options: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly', 'Rarely', 'Never'] },
                { id: 'homeGoods', label: 'How often do you purchase new home goods?', type: 'dropdown', options: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly', 'Rarely', 'Never'] },
                { id: 'secondHand', label: 'How often do you buy secondhand items?', type: 'dropdown', options: ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly', 'Rarely', 'Never'] },
                { id: 'gym', label: 'How often do you go to the gym per week?', type: 'dropdown', options: ['Below Average (0-1 Times)', 'Average (2-3 Times)', 'Above Average (4+ Times)'] },
                { id: 'carbonOffset', label: 'Do you participate in any carbon offset programs?', type: 'radio', options: ['Yes', 'No', 'Sometimes'] },
                { id: 'renewableEnergy', label: 'Do you use renewable energy sources in your daily life?', type: 'radio', options: ['Yes', 'No', 'Sometimes'] },
            ]
        }
    ]

    return (
        <div className='centered-container'>
            <h1>Carbon Footprint Calculator</h1>
            <div className='calculator-container'>

            <div className='description-container'>
                <p>Start reducing your carbon footprint by understanding your overall carbon footprint score.
                Answer a few quick questions about your daily habits, and the calculator will provide resources and recommendations based on your score!</p>

                <p>In order to get the most accurate score, you must provide an answer for every question.</p>
            </div>

            <form className="form-group" onSubmit={handleSubmit}>
                {sections.map((section) => (
                <div className="section" key={section.header}>
                <h2>{section.header}</h2>
                {section.questions.map((q) => {
                    return (
                    <div className="question-wrapper" key={q.id}>
                        {(() => {
                        switch (q.type) {
                            case 'text':
                            return (
                                <TextInput
                                label={q.label}
                                name={q.id}
                                value={answers[q.id] || ''}
                                onChange={handleChange}
                                />
                            );
                            case 'radio':
                            return (
                                <Radio
                                label={q.label}
                                name={q.id}
                                value={answers[q.id] || ''}
                                options={q.options}
                                onChange={handleChange}
                                />
                            );
                            case 'dropdown':
                            return (
                                <Dropdown
                                label={q.label}
                                name={q.id}
                                value={answers[q.id] || ''}
                                options={['Select value', ...q.options]}
                                onChange={handleChange}
                                />
                            );
                            case 'checkbox':
                            return (
                                <Checkbox
                                label={q.label}
                                name={q.id}
                                values={answers[q.id] || []}
                                options={q.options}
                                onChange={handleChange}
                                />
                            );
                            default:
                            return null;
                        }
                        })()}
                    </div>
                    );
                })}
                </div>
                ))}


                <Button
                    label="Submit"
                    onClick={handleSubmit}
                    variant="primary"
                    style={{ fontSize: '20px', width: '200px', fontWeight: '200' }}
                />

                    {totalEmissions !== null && (
                        <div className="total-emissions">
                            <p>Your Total Carbon Footprint: {totalEmissions.toFixed(2)} CO2 tons/year</p>
                        </div>
                    )}
            </form>

            </div>
        </div>
    );
};

export default Calculator;