function calculateRepMax() {
    const liftType = document.getElementById('lift-type').value;
    const weight = parseFloat(document.getElementById('weight').value); // Added weight or counterbalance
    const reps = parseInt(document.getElementById('reps').value);
    const bodyweight = parseFloat(document.getElementById('bodyweight').value) || 0;
    const counterbalance = parseFloat(document.getElementById('counterbalance').value) || 0; // Counterbalance for assisted dips

    let oneRepMax = 0;
    let adjustedWeight = 0;

    // Percentage table based on reps performed
    const percentageTable = {
        1: 1.00,  // 100% of 1RM
        2: 0.95,  // 95% of 1RM
        3: 0.93,  // 93% of 1RM
        4: 0.90,  // 90% of 1RM
        5: 0.87,  // 87% of 1RM
        6: 0.85,  // 85% of 1RM
        7: 0.83,  // 83% of 1RM
        8: 0.80,  // 80% of 1RM
        9: 0.77,  // 77% of 1RM
        10: 0.75, // 75% of 1RM
        12: 0.70  // 70% of 1RM
    };

    const repMaxFactor = percentageTable[reps] || 1.00;

    if (liftType === "dips") {
        // For weighted dips/chin-ups, calculate 1RM with bodyweight adjustments
        const totalWeight = (bodyweight * 0.85) + weight;  // 85% of body weight + added weight
        oneRepMax = totalWeight / repMaxFactor;  // Estimate the 1RM
        
    } else if (liftType === "assisted-dips") {
        // For assisted dips/chin-ups, subtract the counterbalance from bodyweight
        const totalWeight = bodyweight - counterbalance;
        oneRepMax = totalWeight / repMaxFactor;  // Estimate the 1RM

    } else if (liftType === "squat" || liftType === "other") {
        // For squats and other accessory lifts, just calculate the 1RM based on added weight
        oneRepMax = weight / repMaxFactor;
    }

    // Display different output formats based on the lift type
    let outputMessage;
    
    if (liftType === "dips" || liftType === "assisted-dips" || liftType === "squat") {
        // Outputs for dips, chin-ups, and squats
        outputMessage = `
            Your 1 Rep Max is: ${roundToNearest5(oneRepMax)} lbs
            <br><br>
            8x5@65%
            <br>
            10x4@70%
            <br>
            12x3@75%
        `;
    } else if (liftType === "other") {
        // Outputs for other accessory lifts
        outputMessage = `
            Your 1 Rep Max is: ${roundToNearest5(oneRepMax)} lbs
            <br><br>
            6x6@65%
            <br>
            6x8@60%
        `;
    }

    document.getElementById('result').innerHTML = outputMessage;
}

// Function to round to the nearest 5 lbs
function roundToNearest5(weight) {
    return Math.round(weight / 5) * 5;
}

// Show bodyweight and counterbalance fields based on the selected lift type
document.getElementById('lift-type').addEventListener('change', function() {
    const liftType = document.getElementById('lift-type').value;
    
    if (liftType === 'dips' || liftType === 'assisted-dips') {
        document.getElementById('bodyweight-section').style.display = 'block';
    } else {
        document.getElementById('bodyweight-section').style.display = 'none';
    }

    if (liftType === 'assisted-dips') {
        document.getElementById('counterbalance-section').style.display = 'block';
    } else {
        document.getElementById('counterbalance-section').style.display = 'none';
    }

    if (liftType === 'squat' || liftType === 'other') {
        document.getElementById('weight-section').querySelector('label').textContent = "Weight Lifted (in lbs):";
    } else {
        document.getElementById('weight-section').querySelector('label').textContent = "Weight Added to Dip Belt (in lbs):";
    }
});
