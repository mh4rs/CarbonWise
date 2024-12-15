import React, { useState } from 'react';

const ResourceCard = ({ image_url, name, description, address, website }) => {
    const [isDescriptionVisible, setDescriptionVisible] = useState(false);

    const handleCardClick = () => {
        setDescriptionVisible(prev => !prev);
    };

    const containerStyle = {
        position: 'relative',
        width: '325px',
        height: '400px',
        overflow: 'hidden',
    };

    const cardStyle = {
        backgroundColor: '#ECF4DB',
        textAlign: 'center',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
        position: 'absolute',
        top: 0,
        left: 0,
    };

    const imageStyle = {
        width: '100%',
        height: '325px',
        objectFit: 'cover',
        borderRadius: '8px 8px 0 0',
    };

    const titleStyle = {
        marginTop: '20px',
        fontSize: '1.2rem',
        fontWeight: '600',
    };

    const descriptionStyle = {
        position: 'absolute',
        top: 0,
        left: '100%',
        width: '100%',
        height: '325px',
        padding: '20px',
        backgroundColor: '#FFFAF1',
        borderRadius: '8px 8px 0 0',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box',
        overflowY: 'auto',
        transition: 'transform 0.3s ease-in-out',
        transform: isDescriptionVisible 
            ? 'translateX(-100%)'
            : 'translateX(0)',
        fontSize: '18px',
    };

    return (
        <div style={containerStyle} onClick={handleCardClick}>
            <div style={cardStyle}>
                <img src={image_url} alt={name} style={imageStyle} />
                <h3 style={titleStyle}>{name}</h3>
            </div>
            <div style={descriptionStyle}>
                <p style={{ marginBottom: '12px' }}>{description}</p>
                <p style={{ marginBottom: '12px' }}><strong>Address</strong>: {address}</p>
                <a href={website} style={{ color: '#608A33' }}>Click here for the website!</a>
            </div>
        </div>
    );
};

export default ResourceCard;