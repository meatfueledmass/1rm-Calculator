function calculateRepMax() {
    const liftType = document.getElementById('lift-type').value;
    const weight = parseFloat(document.getElementById('weight').value); // Added weight or counterbalance
    const reps = parseInt(document.getElementById('reps').value);
    const bodyweight = parseFloat(document.getElementById('bodyweight').value) || 0;
    const counterbalance = parseFloat(document.getElementById('counterbalance').value) || 0; // Counterbalance for assisted dips

    let oneRepMax = 0;
    let actualMax = 0; // For displaying the added weight for weighted dips/chins and counterbalance for assisted dips

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
        actualMax = oneRepMax - (bodyweight * 0.85);  // Display added weight as the 1RM
        
    } else if (liftType === "assisted-dips") {
        // For assisted dips/chin-ups, subtract the counterbalance from bodyweight
        const totalWeight = bodyweight - counterbalance;
        oneRepMax = totalWeight / repMaxFactor;  // Estimate the 1RM
        actualMax = counterbalance;  // Display the counterbalance as the 1RM

    } else if (liftType === "squat" || liftType === "other") {
        // For squats and other accessory lifts, just calculate the 1RM based on added weight
        oneRepMax = weight / repMaxFactor;
        actualMax = oneRepMax;
    }

    // Display different output formats based on the lift type
    let outputMessage;
    
    if (liftType === "dips" || liftType === "assisted-dips" || liftType === "squat") {
        const weight65 = roundToNearest5(oneRepMax * 0.65);
        const weight70 = roundToNearest5(oneRepMax * 0.70);
        const weight75 = roundToNearest5(oneRepMax * 0.75);

        outputMessage = `
            Your 1 Rep Max is: ${roundToNearest5(actualMax)} lbs
            <br><br>
            8x5@65%: ${weight65} lbs
            <br>
            10x4@70%: ${weight70} lbs
            <br>
            12x3@75%: ${weight75} lbs
        `;
    } else if (liftType === "other") {
        const weight60 = roundToNearest5(oneRepMax * 0.60);
        const weight65 = roundToNearest5(oneRepMax * 0.65);

        // Outputs for other accessory lifts
        outputMessage = `
            Your 1 Rep Max is: ${roundToNearest5(actualMax)} lbs
            <br><br>
            6x8@60%: ${weight60} lbs
            <br>
            6x6@65%: ${weight65} lbs
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
        document.getElementById('weight-section').style.display = 'none';
    } else {
        document.getElementById('counterbalance-section').style.display = 'none';
        document.getElementById('weight-section').style.display = 'block';
    }

    if (liftType === 'squat' || liftType === 'other') {
        document.getElementById('weight-section').querySelector('label').textContent = "Weight Lifted (in lbs):";
    } else {
        document.getElementById('weight-section').querySelector('label').textContent = "Weight Added to Dip Belt (in lbs):";
    }
});
